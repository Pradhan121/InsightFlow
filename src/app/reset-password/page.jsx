import { resetPassword } from "@/services/authService";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from 'react-toastify'
import * as Yup from 'yup'

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get("email")
    const otp = searchParams.get("otp")

    const formik = useFormik({
        initialValues: { newPassword: "", confirmPassword: "" },
        validationSchema: Yup.object({
            newPassword: Yup.string().required("Enter New Password"),
            confirmPassword: Yup.string().required("Enter Confirm Password")
        }),
        onSubmit: async (values, {resetForm}) => {
            const res = await resetPassword(email, otp, values.newPassword, values.confirmPassword)
            if (res.success) {
                toast.success("Password Reset Successfully!")
                router.push('/login')
                resetForm()
            }
            else {
                toast.error(res.message)
            }
        }
    })

    const handleClickNewPassword = () => {
        setNewPassword((prev) => !prev)
    }

    const handleClickConfirmPassword = () => {
        setConfirmPassword((prev) => !prev)
    }

    return (
        <>
            <form action="" onSubmit={formik.handleSubmit}>
                <TextField
                    type={newPassword ? 'text' : 'password'}
                    placeholder="New Password"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                    helperText={formik.touched.newPassword && formik.errors.newPassword}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm placeholder:text-slate-300 text-slate-700"
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickNewPassword}
                                        edge="end"
                                    >
                                        {newPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <TextField
                    type={confirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm placeholder:text-slate-300 text-slate-700"
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickConfirmPassword}
                                        edge="end"
                                    >
                                        {confirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <Button type="submit">Reset Password</Button>
            </form>
        </>
    )
}