import api from "@/lib/axios";


// GET ALL USERS
export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};


// GET SINGLE USER
export const getUserById = async (id) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};


// UPDATE USER
export const updateUser = async (id, data) => {
  const res = await api.put(`/users/${id}`, data);
  return res.data;
};


// DELETE USER
export const deleteUser = async (id) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};