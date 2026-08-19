import { NextResponse } from "next/server";
import Auth from "@/models/Auth";
import { ConnectDB } from "@/lib/mongodb";

export async function POST(req) {
  await ConnectDB();

  const { email, otp } = await req.json();

  const user = await Auth.findOne({ email });

  if (!user) {
    return NextResponse.json(
      {
        message: "User Not Found"
      },
      {
        status: 404
      }
    );
  }

  if (user.otp !== otp) {
    return NextResponse.json(
      {
        status: false,
        message: "Invalid OTP"
      },
      {
        status: 400
      }
    );
  }

  if (user.otpExpiry < Date.now()) {
    return NextResponse.json(
      {
        message: "OTP Expired"
      },
      {
        status: 400
      }
    );
  }

  return NextResponse.json({
    status: true,
    message: "OTP Verified",
  });
}
