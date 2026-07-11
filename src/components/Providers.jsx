"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Providers() {
    return (
        <ToastContainer
            position="bottom-right"
            autoClose={2000}
        />
    );
}