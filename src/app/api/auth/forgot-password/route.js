import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { resend } from "@/lib/resend";

export async function POST(req) {
  try {

    await ConnectDB();

    const { email } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User Not Found" },
        { status: 404 }
      );
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;

    await user.save();

    // Send Email
    await resend.emails.send({
      from: "noreply@yourdomain.com",
      to: user.email,
      subject: "Password Reset OTP",
      html: `
        <h2>Hello ${user.name}</h2>
        <p>Your OTP is</p>

        <h1>${otp}</h1>

        <p>This OTP is valid for 5 minutes.</p>
      `,
    });

    return NextResponse.json({
      status: "Success",
      message: "OTP Sent Successfully",
    });

  } catch (err) {
    return NextResponse.json(
      {
        status: "Fail",
        message: err.message,
      },
      { status: 500 }
    );
  }
}