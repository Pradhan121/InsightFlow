'use client'

import { registerUser } from "@/services/authService"
import { useFormik } from "formik"
import * as Yup from 'yup'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IconButton, InputAdornment, TextField } from "@mui/material"
import { toast } from "react-toastify"
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react"

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    }
    const router = useRouter()

    const formik = useFormik({
        initialValues: { username: "", email: "", password: "" },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(3, "must be 3 characters")
                .max(30, "must be 30 characters or less")
                .required("Please Enter name"),
            email: Yup.string().email("Invalid Email").required("Please Enter Email"),
            password: Yup.string()
                .matches(
                    /[!@#$%^&*]/,
                    "You must be Enter atleast one special character"
                )
                .required("Enter Password"),
        }),
        onSubmit: async (values) => {
            const res = await registerUser(values)
            if (res.success) {
                toast.success('Account Created Successfully!')
                router.push('/login')
            } else {
                toast.error(res.message)
            }
        }
    })
    return (
        <>
            <div className="flex items-center justify-center bg-slate-100 px-4 py-10">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10">

                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        Create Account  <span className="animate-bounce">🚀</span>
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">
                        Create your account to get started.
                    </p>

                    <form className="mt-8 space-y-5" onSubmit={formik.handleSubmit}>
                        {/* UserName Field */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                                UserName
                            </label>
                            <TextField
                                type="text"
                                placeholder="Enter your username"
                                autoComplete="username"
                                name='username'
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm placeholder:text-slate-300 text-slate-700"
                            />
                        </div>

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
                                fullWidth
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                name="password"
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

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
                        >
                            Register
                        </button>
                    </form>

                    <p className="text-center mt-6 text-sm text-slate-400 font-medium">
                        Already have an account?
                        <Link href="/login" className="text-blue-600 hover:underline ml-2 font-semibold">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}