import { verifyOtp } from "@/services/authService";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import * as Yup from 'yup'


export default function VerifyOtp(){
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get("email")

    const formik = useFormik({
        initialValues: {
            otp: ""
        },
        validationSchema: Yup.object({
            otp: Yup.number().required("Enter OTP")
        }),
        onSubmit: async(values)=>{
            const res = await verifyOtp(email, values.otp)
            if(res.success){
                toast.success(res.message)
                router.push(`/reset-password?email=${email}&otp=${otp}`);
            }
            else{
                toast.error(res.message)
            }
        }
    })
    return(
        <>
           <form onSubmit={formik.handleSubmit}>
              <TextField
                type='number'
                placeholder="Enter OTP"
                name="otp"
                value={formik.values.otp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.otp && Boolean(formik.errors.otp)}
                helperText={formik.touched.otp && formik.errors.otp}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm placeholder:text-slate-300 text-slate-700"
              />
              <Button type="submit">Verify OTP</Button>
           </form>
        </>
    )
}