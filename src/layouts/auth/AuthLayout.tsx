import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Bg from "../../assets/images/auth-image.jpg"; // ảnh nền gym
import { Dumbbell } from "lucide-react";

const AuthLayout: React.FC = () => {
  const location = useLocation();

  const isLogin = location.pathname.includes("/auth/login");
  const isRegister = location.pathname.includes("/auth/register");

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col gap-4 ">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${Bg})` }}
      />
      <div className="absolute inset-0 bg-black/60 z-0" />

      <header className="relative z-10 py-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white rounded-full">
              <Dumbbell className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">FitGym</h1>
          <p className="text-gray-300 mt-2">Đặt gói tập gym của bạn</p>
        </div>
      </header>
    </div>
  );
};

export default AuthLayout;
