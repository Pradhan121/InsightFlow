'use client'

import { Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";

export default function Login() {
  return (
    <Box className="min-h-screen flex bg-gray-100">

      {/* Left Section */}
      <Box className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 items-center justify-center">
        <Box className="text-center text-white px-10">
          <Typography className="text-5xl font-bold mb-6">
            AdminPro
          </Typography>

          <Typography className="text-lg opacity-90">
            Manage your business with a modern dashboard.
          </Typography>

          <img
            src="/dashboard-preview.png"
            alt=""
            className="mt-10 w-[500px] rounded-xl shadow-2xl"
          />
        </Box>
      </Box>

      {/* Right Section */}

      <Box className="flex-1 flex justify-center items-center">

        <Box className="bg-white p-10 rounded-3xl shadow-xl w-[420px]">

          <Typography className="text-3xl font-bold">
            Welcome Back 👋
          </Typography>

          <Typography className="text-gray-500 mt-2">
            Login to continue
          </Typography>

          <Box className="mt-8">

            <label>Email</label>

            <TextField
              type="email"
              placeholder="Enter email"
              className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </Box>

          <Box className="mt-5">

            <label>Password</label>

            <TextField
              type="password"
              placeholder="Enter password"
              className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </Box>

          <Box className="flex justify-between mt-4 text-sm">

            <label className="flex gap-2">
              <input type="checkbox" />
              Remember me
            </label>

            <Link href="#" className="text-blue-600">
              Forgot Password?
            </Link>

          </Box>

          <Button className="w-full bg-blue-600 text-white py-3 rounded-xl mt-6 hover:bg-blue-700 transition">
            Login
          </Button>

          <Box className="flex items-center my-6">

            <hr className="flex-1"/>

            <span className="mx-4 text-gray-500">
              OR
            </span>

            <hr className="flex-1"/>

          </Box>

          <Button className="w-full border py-3 rounded-xl hover:bg-gray-50">
            Continue with Google
          </Button>

          <Typography className="text-center mt-6 text-gray-500">
            Don't have an account?
            <span className="text-blue-600 cursor-pointer ml-2">
              Sign Up
            </span>
          </Typography>

        </Box>

      </Box>

    </Box>
  );
}