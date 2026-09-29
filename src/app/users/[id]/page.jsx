"use client";

import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { ArrowBack } from "@mui/icons-material";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { toast } from "react-toastify";

import {
  getUserById,
  updateUser,
} from "@/services/userService";


export default function UserDetailsPage() {

  const router = useRouter();
  const params = useParams();

  const id = params.id;


  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    role: "user",
  });


  // Get User
  const fetchUser = async () => {

    try {

      setLoading(true);

      const res = await getUserById(id);

      if (res.success) {

        setForm({
          username: res.user.username || "",
          email: res.user.email || "",
          role: res.user.role || "user",
        });

      } else {

        toast.error(res.message);

        router.push("/users");
      }

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to fetch user"
      );

      router.push("/users");

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    if (id) {
      fetchUser();
    }

  }, [id]);


  // Input change
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };


  // Update User
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);

      const res = await updateUser(
        id,
        form
      );

      if (res.success) {

        toast.success(
          "User updated successfully"
        );

        router.push("/users");

      } else {

        toast.error(res.message);

      }

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to update user"
      );

    } finally {

      setSaving(false);

    }

  };


  if (loading) {

    return (

      <Box
        sx={{
          minHeight: "100vh",
          background: "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>

    );

  }


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
          Edit User
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

        <form onSubmit={handleSubmit}>

          {/* Username */}

          <TextField
            fullWidth
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            margin="normal"
          />


          {/* Email */}

          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            margin="normal"
          />


          {/* Role */}

          <TextField
            fullWidth
            select
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            margin="normal"
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
              disabled={saving}
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                px: 3,
                boxShadow: "none",
              }}
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </Button>

          </Box>

        </form>

      </Paper>

    </Box>
  );
}