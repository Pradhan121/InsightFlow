import bcrypt from "bcrypt";
import Auth from "@/models/Auth";
import { ConnectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await ConnectDB();

    const body = await req.json();
    console.log("BODY:", body);

    const { email, otp, newPassword, confirmPassword } = body;

    const user = await Auth.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User Not Found" },
        { status: 404 }
      );
    }

    if (user.otp !== otp) {
      return NextResponse.json({
        message: "Invalid OTP",
      });
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { message: "Password Not Match" },
        { status: 400 }
      );
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashPassword;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    return NextResponse.json({
      status: true,
      message: "Password Updated Successfully",
    });
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}