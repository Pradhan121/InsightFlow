import { ConnectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await ConnectDB();

    const { username, password } = await req.json();

    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json(
        {
          status: false,
          message: "Invalid Credentials",
        },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        {
          status: false,
          message: "Invalid Credentials",
        },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
         process.env.SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );

    return NextResponse.json(
      {
        status: true,
        message: "Login Successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        status: false,
        message: err.message,
      },
      { status: 500 }
    );
  }
}