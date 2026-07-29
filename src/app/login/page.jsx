'use client'

import { loginUser } from "@/services/authService";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as Yup from 'yup';
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  }
  const router = useRouter()

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required')
    }),
    onSubmit: async (values) => {
      const res = await loginUser(values)
      if (res.success) {
        toast.success(res.message)
        router.push('/dashboard')
      } else {
        toast.error(res.message)
      }

    }
  })
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* 🟣 Left Section (Hidden on Mobile) */}
      <div className="lg:flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-12 relative [text-align:-webkit-center]">

        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-120px] right-[-80px] w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 text-center text-white max-w-md w-full">

          <div className="drop-shadow-2xl transition-transform duration-300 hover:scale-105">
            <Image
              src="/dashboard-illustration.png"
              alt="AdminPro Dashboard"
              width={500}
              height={400}
              priority
              className="mx-auto object-contain"
            />
          </div>

          {/* Title */}
          <h1 className="mt-8 text-4xl font-extrabold tracking-tight">
            AdminPro
          </h1>

          {/* Subtitle */}
          <p className="mt-3 text-sm text-blue-100 opacity-90 leading-relaxed">
            Modern Admin Dashboard for managing your business, products, orders and analytics in one place.
          </p>

          {/* Features */}
          <div className="mt-8 space-y-3 text-left inline-block w-fit mx-auto text-sm text-blue-50 font-medium">
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
              <span className="text-lg">👥</span>
              <span>User Management</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
              <span className="text-lg">📊</span>
              <span>Real-time Analytics</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
              <span className="text-lg">🛒</span>
              <span>Orders & Products</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
              <span className="text-lg">🔒</span>
              <span>Secure Authentication</span>
            </div>
          </div>

        </div>
      </div>

      {/* ⚪ Right Section (Form) */}
      <div className="flex items-center justify-center bg-slate-100 px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10">

          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            Welcome Back <span className="animate-bounce">👋</span>
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Login to continue
          </p>

          <form className="mt-8 space-y-5" onSubmit={formik.handleSubmit}>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Email
              </label>
              <TextField
                type="email"
                placeholder="name@company.com"
                autoComplete="email"
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm placeholder:text-slate-300 text-slate-700"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Password
              </label>
              <TextField
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm placeholder:text-slate-300 text-slate-700"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>

            <div className="flex justify-between items-center text-xs font-medium">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                Remember me
              </label>
              <Link href="/forgot-password" className="text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
            >
              Login
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-slate-100"></div>
            <span className="mx-4 text-xs font-bold text-slate-400 tracking-wider">OR</span>
            <div className="flex-1 border-t border-slate-100"></div>
          </div>

          <Link
            href="/api/auth/google"
            className="w-full flex items-center justify-center gap-3 border border-indigo-400 bg-white hover:bg-slate-50 text-slate-600 font-medium py-3 px-4 rounded-xl transition-all active:scale-[0.98] text-sm"
          >
            <FcGoogle size={22} />
            Continue with Google
          </Link>
          <p className="text-center mt-6 text-sm text-slate-400 font-medium">
            Don't have an account?
            <Link href="/register" className="text-blue-600 hover:underline ml-2 font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

    </div>

  );
}