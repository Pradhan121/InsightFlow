import { ConnectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        await ConnectDB();
        const user = await req.json();

        const existingUser = await User.findOne({ email: user.email });

        if (existingUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email already exists"
                },
                { status: 409 }
            );
        }
        user.password = await bcrypt.hash(user.password, 10);

        const createUser = await User.create(user);
        const newUser = await User.findById(createUser._id).select("-password");

        return NextResponse.json(
            {
                success: true,
                message: "User created successfully",
                user: newUser
            },
            { status: 201 }
        )
    }
    catch (err) {
        return NextResponse.json(
            {
                success: false,
                message: err.message
            },
            { status: 500 }
        )
    }
}