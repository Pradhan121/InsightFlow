import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/mongodb";
import Auth from "@/models/Auth";
import mongoose from "mongoose";


// GET SINGLE USER
export async function GET(req, { params }) {
  try {
    await ConnectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid User ID",
        },
        { status: 400 }
      );
    }

    const user = await Auth.findById(id).select(
      "-password -otp -otpExpiry"
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User fetched successfully",
        user,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("GET SINGLE USER ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 }
    );
  }
}


// UPDATE USER
export async function PUT(req, { params }) {
  try {
    await ConnectDB();

    const { id } = await params;
    const body = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid User ID",
        },
        { status: 400 }
      );
    }

    const user = await Auth.findById(id);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Update only allowed fields
    if (body.username !== undefined) {
      user.username = body.username;
    }

    if (body.email !== undefined) {
      user.email = body.email;
    }

    if (body.role !== undefined) {
      user.role = body.role;
    }

    await user.save();

    const updatedUser = await Auth.findById(id).select(
      "-password -otp -otpExpiry"
    );

    return NextResponse.json(
      {
        success: true,
        message: "User updated successfully",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("UPDATE USER ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 }
    );
  }
}


// DELETE USER
export async function DELETE(req, { params }) {
  try {
    await ConnectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid User ID",
        },
        { status: 400 }
      );
    }

    const user = await Auth.findByIdAndDelete(id);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User deleted successfully",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE USER ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 }
    );
  }
}