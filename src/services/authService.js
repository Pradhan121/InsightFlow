import api from "@/lib/axios"

export const loginUser = async (data) => {
    const res = await api.post("auth/login", data);
    return res.data;
}

export const registerUser = async (data) => {
    const res = await api.post("auth/register", data);
    return res.data;
}

export const forgotPassword = async(data) => {
    const res = await api.post("/auth/forgot-password", data);
    return res.data;
}

export const verifyOtp = async(data) => {
    const res = await api.post("/auth/verifyOtp", data);
    return res.data;
}

export const resetPassword = async(email,otp,newPassword,confirmPassword) => {
    const res = await api.post("/auth/reset-password",{
        email,
        otp,
        newPassword,
        confirmPassword});
    return res.data;
}