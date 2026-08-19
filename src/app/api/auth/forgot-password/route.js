import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/mongodb";
import Auth from "@/models/Auth";
import { transporter } from "@/lib/nodemailer";

export async function POST(req) {
  try {

    await ConnectDB();

    const { email } = await req.json();

    const user = await Auth.findOne({ email });


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
      <div style = 'font-family: Arial, padding:20px'>
       <h2>Hello ${user.username}</h2>
       <h3>Your OTP is <strong> ${otp}</strong></h3>
       <h4>This OTP is valid for 5 minutes.</h4>
       <p><strong>Please don't share this OTP with anyone</strong></p>
       <h3>Team</h3>
       <h2>InsightFlow</h2>
      </div>
        
    `,
    });

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