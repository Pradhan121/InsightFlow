"use client";

import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import {
  Add,
  Delete,
  Edit,
  Search,
} from "@mui/icons-material";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  deleteUser,
  getUsers,
} from "@/services/userService";


export default function UsersPage() {

  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);


  // Fetch Users
  const fetchUsers = async () => {
    try {

      setLoading(true);

      const res = await getUsers();

      if (res.success) {
        setUsers(res.users);
      } else {
        toast.error(res.message);
      }

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to fetch users"
      );

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);


  // Delete User
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {

      const res = await deleteUser(id);

      if (res.success) {

        toast.success(res.message);

        setUsers((prev) =>
          prev.filter((user) => user._id !== id)
        );

      } else {
        toast.error(res.message);
      }

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to delete user"
      );
    }
  };


  // Search
  const filteredUsers = users.filter((user) => {

    const value = search.toLowerCase();

    return (
      user.username?.toLowerCase().includes(value) ||
      user.email?.toLowerCase().includes(value) ||
      user.role?.toLowerCase().includes(value)
    );

  });


  // Date format
  const formatDate = (date) => {

    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };


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
          justifyContent: "space-between",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          gap: 2,
          mb: 3,
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >

        <Box>

          <Typography
            sx={{
              fontSize: {
                xs: "22px",
                md: "26px",
              },
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            Users
          </Typography>

          <Typography
            sx={{
              fontSize: "13px",
              color: "#64748b",
              mt: 0.5,
            }}
          >
            Manage all registered users
          </Typography>

        </Box>


        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => router.push("/users/create")}
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            px: 2,
            py: 1,
            boxShadow: "none",
          }}
        >
          Add User
        </Button>

      </Box>


      {/* Main Card */}

      <Paper
        elevation={0}
        sx={{
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
        }}
      >

        {/* Search */}

        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >

          <TextField
            size="small"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <Search
                    sx={{
                      mr: 1,
                      color: "#94a3b8",
                    }}
                  />
                ),
              },
            }}
            sx={{
              width: {
                xs: "100%",
                sm: "320px",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                background: "#fff",
              },
            }}
          />

        </Box>


        {/* Loading */}

        {loading ? (

          <Box
            sx={{
              height: 300,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress size={30} />
          </Box>

        ) : filteredUsers.length === 0 ? (

          <Alert
            severity="info"
            sx={{
              m: 2,
            }}
          >
            No users found.
          </Alert>

        ) : (

          <TableContainer
            sx={{
              overflowX: "auto",
            }}
          >

            <Table
              sx={{
                minWidth: 750,
              }}
            >

              <TableHead>

                <TableRow
                  sx={{
                    background: "#f8fafc",
                  }}
                >

                  <TableCell sx={headStyle}>
                    User
                  </TableCell>

                  <TableCell sx={headStyle}>
                    Email
                  </TableCell>

                  <TableCell sx={headStyle}>
                    Role
                  </TableCell>

                  <TableCell sx={headStyle}>
                    Joined
                  </TableCell>

                  <TableCell
                    sx={{
                      ...headStyle,
                      textAlign: "right",
                    }}
                  >
                    Actions
                  </TableCell>

                </TableRow>

              </TableHead>


              <TableBody>

                {filteredUsers.map((user) => (

                  <TableRow
                    key={user._id}
                    hover
                  >

                    {/* User */}

                    <TableCell sx={bodyStyle}>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                        }}
                      >

                        <Avatar
                          sx={{
                            width: 36,
                            height: 36,
                            background: "#e5edff",
                            color: "#3155f5",
                            fontSize: "12px",
                            fontWeight: 600,
                          }}
                        >
                          {user.username
                            ?.slice(0, 2)
                            .toUpperCase()}
                        </Avatar>

                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#0f172a",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {user.username}
                        </Typography>

                      </Box>

                    </TableCell>


                    {/* Email */}

                    <TableCell
                      sx={{
                        ...bodyStyle,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {user.email}
                    </TableCell>


                    {/* Role */}

                    <TableCell sx={bodyStyle}>

                      <Box
                        sx={{
                          display: "inline-flex",
                          px: 1.2,
                          py: 0.5,
                          borderRadius: "5px",
                          background:
                            user.role === "admin"
                              ? "#ede9fe"
                              : "#e0f2fe",
                          color:
                            user.role === "admin"
                              ? "#7c3aed"
                              : "#0284c7",
                          fontSize: "11px",
                          fontWeight: 600,
                          textTransform: "capitalize",
                        }}
                      >
                        {user.role}
                      </Box>

                    </TableCell>


                    {/* Joined */}

                    <TableCell
                      sx={{
                        ...bodyStyle,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatDate(user.createdAt)}
                    </TableCell>


                    {/* Actions */}

                    <TableCell
                      sx={{
                        ...bodyStyle,
                        textAlign: "right",
                        whiteSpace: "nowrap",
                      }}
                    >

                      <IconButton
                        size="small"
                        onClick={() =>
                          router.push(
                            `/users/${user._id}`
                          )
                        }
                        sx={{
                          color: "#2563eb",
                          mr: 0.5,
                        }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>


                      <IconButton
                        size="small"
                        onClick={() =>
                          handleDelete(user._id)
                        }
                        sx={{
                          color: "#ef4444",
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>

                    </TableCell>

                  </TableRow>

                ))}

              </TableBody>

            </Table>

          </TableContainer>

        )}

      </Paper>

    </Box>
  );
}


const headStyle = {
  fontSize: "12px",
  fontWeight: 600,
  color: "#64748b",
  whiteSpace: "nowrap",
};

const bodyStyle = {
  fontSize: "12px",
  color: "#334155",
  borderBottom: "1px solid #f1f5f9",
};