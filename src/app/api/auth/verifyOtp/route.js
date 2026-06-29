import { NextResponse } from "next/server";
import User from "@/models/User";
import { ConnectDB } from "@/lib/mongodb";

export async function POST(req) {
  await ConnectDB();

  const { email, otp } = await req.json();

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

  if (user.otpExpiry < Date.now()) {
    return NextResponse.json({
      message: "OTP Expired",
    });
  }

  return NextResponse.json({
    message: "OTP Verified",
  });
}
