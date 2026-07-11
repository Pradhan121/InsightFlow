import { forgotPassword } from "@/services/authService";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup"


export default function ForgotPassword(){
const router = useRouter()

  const formik = useFormik({
    initialValues: {
        email: ''
    },
    validationSchema: Yup.object({
        email: Yup.string().email("Enter Valid Email").required()
    }),
    onSubmit: async(values)=>{
        const res = await forgotPassword(values.email) 
        if(res.success){
            toast.success("OTP Send Successfully!")
            router.push(`/verify-otp?email=${email}`);
        }
        else{
            toast.error(res.message)
        }
    }
  })
    return(
        <>
          <form action="" onSubmit={formik.handleSubmit}>
              <TextField
                type="email"
                placeholder="Enter Your Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm placeholder:text-slate-300 text-slate-700"
              />
              <Button type="submit">Send OTP</Button>
            </form>         
        </>
    )
}