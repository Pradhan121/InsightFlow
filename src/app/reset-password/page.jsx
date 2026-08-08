'use client'

import { resetPassword } from "@/services/authService";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from 'react-toastify'
import * as Yup from 'yup'

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState(false)
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const router = useRouter()
    

    const formik = useFormik({
        initialValues: { newPassword: "", confirmPassword: "" },
        validationSchema: Yup.object({
            newPassword: Yup.string().required("Enter New Password"),
            confirmPassword: Yup.string().required("Enter Confirm Password")
        }),
        onSubmit: async (values, { resetForm }) => {
            const res = await resetPassword(email, otp, values.newPassword, values.confirmPassword)
            if (res.status) {
                toast.success("Password Reset Successfully!")
                sessionStorage.removeItem('resetOtp')
                sessionStorage.removeItem('userEmail')
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
    useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    const storedOtp = sessionStorage.getItem("resetOtp");

    setEmail(storedEmail);
    setOtp(storedOtp);
}, []);

    return (
        <Dialog
            open={true}
            maxWidth="xs"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 3,
                    },
                },
            }}
        >
            <DialogTitle
                sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "28px",
                    pb: 1,
                }}
            >
                Reset Password
            </DialogTitle>

            <DialogContent sx={{ pt: 2 }}>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    mb={3}
                >
                    Create a new password for your account.
                </Typography>

                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        label="New Password"
                        name="newPassword"
                        type={newPassword ? "text" : "password"}
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.newPassword &&
                            Boolean(formik.errors.newPassword)
                        }
                        helperText={
                            formik.touched.newPassword &&
                            formik.errors.newPassword
                        }
                        margin="normal"
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleClickNewPassword}>
                                            {newPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type={confirmPassword ? "text" : "password"}
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.confirmPassword &&
                            Boolean(formik.errors.confirmPassword)
                        }
                        helperText={
                            formik.touched.confirmPassword &&
                            formik.errors.confirmPassword
                        }
                        margin="normal"
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleClickConfirmPassword}>
                                            {confirmPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disableRipple
                        sx={{
                            mt: 3,
                            py: 1.3,
                            borderRadius: 2,
                            textTransform: "none",
                            fontSize: "16px",
                            fontWeight: 600,
                        }}
                    >
                        Reset Password
                    </Button>
                </form>
            </DialogContent>

            <DialogActions
                sx={{
                    justifyContent: "center",
                    pb: 2,
                }}
            >
                <Button
                    variant="outlined"
                    onClick={() => router.push("/login")}
                    sx={{
                        textTransform: "none",
                        borderRadius: 2,
                    }}
                >
                    Back to Login
                </Button>
            </DialogActions>
        </Dialog>
    );
}