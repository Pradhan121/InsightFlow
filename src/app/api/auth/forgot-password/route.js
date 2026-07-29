import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { transporter } from "@/lib/nodemailer";

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
    await transporter.sendMail({
    from: `"InsightFlow" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: "Password Reset OTP",
    html: `
        
    `,
});

    if (error) {
        return NextResponse.json({
            status: "Fail",
            message: error.message
        }, { status: 500 });
    }

    return NextResponse.json({
        status: true,
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