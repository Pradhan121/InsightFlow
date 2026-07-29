'use client'

import { forgotPassword } from "@/services/authService";
import { Button, Dialog, DialogActions, 
    DialogContent, DialogTitle, TextField, 
    Typography} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup"


export default function ForgotPassword() {
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Enter Valid Email").required()
    }),
    onSubmit: async (values, {resetForm}) => {
      const res = await forgotPassword(values)
      if (res.status === true) {
        toast.success(res.message);
        resetForm();
        router.push(`/verify-otp?email=${values.email}`);
      }
      else {
        toast.error(res.message)
      }
    }
  })

  const handleClose = () => {
    router.push('/')
  }
  return (
    <>
      <Dialog
        open={true}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "24px",
            pb: 1,
          }}
        >
          Forgot Password
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            mb={3}
          >
            Enter your registered email address. We'll send you an OTP to reset your password.
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              margin="normal"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.3,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "16px",
              }}
            >
              Send OTP
            </Button>
          </form>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            onClick={handleClose}
            color="primary"
            variant="outlined"
            size="medium"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}