import bcrypt from "bcrypt";
import User from "@/models/User";
import { ConnectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  await ConnectDB();

  const { email, otp, newPassword, confirmPassword } = await req.json();

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({
      message: "User Not Found",
    });
  }

  if (user.otp !== otp) {
    return NextResponse.json({
      message: "Invalid OTP",
    });
  }

  if (newPassword !== confirmPassword) {
    return NextResponse.json({
      message: "Password Not Match",
    });
  }

  const hashPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashPassword;

  user.otp = null;
  user.otpExpiry = null;

  await user.save();

  return NextResponse.json({
    message: "Password Updated Successfully",
  });
}
