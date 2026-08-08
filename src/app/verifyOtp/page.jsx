'use client'

import { verifyOtp } from "@/services/authService";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from 'yup'


export default function VerifyOtp() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get("email")

    const formik = useFormik({
        initialValues: {
            otp: ""
        },
        validationSchema: Yup.object({
            otp: Yup.string()
                .length(6, "OTP must be 6 digits")
                .required("Enter OTP")
        }),
        onSubmit: async (values) => {
    const res = await verifyOtp({
        email: email,
        otp: values.otp
    });

    if (res.status) {
        toast.success(res.message);
        sessionStorage.setItem('resetOtp', values.otp)
        sessionStorage.setItem('userEmail', email)
        router.push(
            `/reset-password`
        );
    } else {
        toast.error(res.message);
    }
}
    })
    return (
        <Dialog
            open={true}
            maxWidth="xs"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 3,
                        p: 1,
                    },
                },
            }}
        >
            <DialogTitle
                sx={{
                    textAlign: "center",
                    fontWeight: 700,
                    fontSize: "28px",
                    pb: 1,
                }}
            >
                Verify OTP
            </DialogTitle>

            <DialogContent sx={{ pt: 2 }}>
                <Typography
                    align="center"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                >
                    Enter the OTP sent to
                </Typography>

                <Typography
                    align="center"
                    sx={{
                        color: "#2563EB",
                        fontWeight: 600,
                        mb: 3,
                        wordBreak: "break-all",
                    }}
                >
                    {email}
                </Typography>

                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        label="Enter OTP"
                        name="otp"
                        value={formik.values.otp}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.otp && Boolean(formik.errors.otp)}
                        helperText={formik.touched.otp && formik.errors.otp}
                        slotProps={{
                            htmlInput: {
                                maxLength: 6,
                                inputMode: "numeric",
                            },
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                            },
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            py: 1.4,
                            borderRadius: 2,
                            fontSize: "16px",
                            textTransform: "none",
                            fontWeight: 600,
                        }}
                    >
                        Verify OTP
                    </Button>

                    <Typography
                        align="center"
                        sx={{
                            mt: 3,
                            color: "text.secondary",
                            fontSize: "14px",
                        }}
                    >
                        Didn't receive the OTP?
                    </Typography>

                    <Button
                        fullWidth
                        variant="text"
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                        }}
                    >
                        Resend OTP
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
                    onClick={() => router.push("/forgot-password")}
                    sx={{
                        textTransform: "none",
                        borderRadius: 2,
                    }}
                >
                    Back
                </Button>
            </DialogActions>
        </Dialog>
    );
}