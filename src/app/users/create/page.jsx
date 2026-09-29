"use client";

import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { ArrowBack } from "@mui/icons-material";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";

import api from "@/lib/axios";


export default function CreateUserPage() {

  const router = useRouter();


  const formik = useFormik({

    initialValues: {
      username: "",
      email: "",
      password: "",
      role: "user",
    },


    validationSchema: Yup.object({

      username: Yup.string()
        .required("Username is required"),

      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),

      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),

      role: Yup.string()
        .oneOf(["user", "admin"])
        .required("Role is required"),

    }),


    onSubmit: async (values, { resetForm }) => {

      try {

        const res = await api.post(
          "/auth/register",
          values
        );

        if (res.data.success) {

          toast.success(
            "User created successfully"
          );

          resetForm();

          router.push("/users");

        } else {

          toast.error(
            res.data.message
          );

        }

      } catch (error) {

        console.error(error);

        toast.error(
          error.response?.data?.message ||
          "Failed to create user"
        );

      }

    },

  });


  return (

    <Box
      sx={{
        minHeight: "100vh",
        background: "#f8fafc",
        p: {
          xs: 2,
          md: 3,
        },
      }}
    >

      {/* Header */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 3,
        }}
      >

        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.push("/users")}
          sx={{
            textTransform: "none",
            color: "#475569",
          }}
        >
          Back
        </Button>

        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#0f172a",
          }}
        >
          Create User
        </Typography>

      </Box>


      {/* Form */}

      <Paper
        elevation={0}
        sx={{
          maxWidth: "650px",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          p: {
            xs: 2,
            md: 3,
          },
        }}
      >

        <form
          onSubmit={formik.handleSubmit}
        >

          {/* Username */}

          <TextField
            fullWidth
            label="Username"
            name="username"
            margin="normal"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.username &&
              Boolean(formik.errors.username)
            }
            helperText={
              formik.touched.username &&
              formik.errors.username
            }
          />


          {/* Email */}

          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.email &&
              Boolean(formik.errors.email)
            }
            helperText={
              formik.touched.email &&
              formik.errors.email
            }
          />


          {/* Password */}

          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.password &&
              Boolean(formik.errors.password)
            }
            helperText={
              formik.touched.password &&
              formik.errors.password
            }
          />


          {/* Role */}

          <TextField
            fullWidth
            select
            label="Role"
            name="role"
            margin="normal"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.role &&
              Boolean(formik.errors.role)
            }
            helperText={
              formik.touched.role &&
              formik.errors.role
            }
          >

            <MenuItem value="user">
              User
            </MenuItem>

            <MenuItem value="admin">
              Admin
            </MenuItem>

          </TextField>


          {/* Buttons */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 1.5,
              mt: 3,
            }}
          >

            <Button
              variant="outlined"
              onClick={() =>
                router.push("/users")
              }
              sx={{
                textTransform: "none",
                borderRadius: "8px",
              }}
            >
              Cancel
            </Button>


            <Button
              type="submit"
              variant="contained"
              disabled={formik.isSubmitting}
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                px: 3,
                boxShadow: "none",
              }}
            >
              {formik.isSubmitting
                ? "Creating..."
                : "Create User"}
            </Button>

          </Box>

        </form>

      </Paper>

    </Box>
  );
}