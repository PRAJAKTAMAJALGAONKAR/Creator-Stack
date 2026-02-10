import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import Login1 from "/images/login1.png";
import Login2 from "/images/login2.png";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      alert("Please fill all fields ❗");
      return;
    }

    try {
      setLoading(true);

      
      const res = await axios.post(
        "http://localhost:7777/api/creator/login",
        form
      );

      
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }
      
     
      if (res.data?.id) {
        localStorage.setItem("username", res.data.id);
      }
      if (res.data?.username) {
        localStorage.setItem("name", res.data.username);
      }


      alert("Login Successful ✅");

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Invalid Credentials ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 relative overflow-hidden">

    
      <div className="absolute w-[400px] h-[400px] bg-indigo-300/30 rounded-full blur-3xl top-[-150px] left-[-150px]" />
      <div className="absolute w-[350px] h-[350px] bg-purple-300/30 rounded-full blur-3xl bottom-[-120px] right-[-120px]" />

     
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          relative
          bg-white/80
          backdrop-blur-xl
          rounded-3xl
          shadow-2xl
          max-w-4xl
          w-full
          grid
          grid-cols-1
          md:grid-cols-2
          overflow-hidden
        "
      >

       
        <div className="p-8 md:p-10 flex flex-col justify-center">

        
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="navfam text-3xl font-extrabold text-slate-900"
          >
            Welcome Back 👋
          </motion.h1>

          <p className="text-slate-500 mt-2 mb-6 text-sm">
            Login to manage your content
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            
            <div>
              <label className="text-xs font-medium text-slate-600">
                Username
              </label>

              <input
                type="text"
                name="username"
                placeholder="username123"
                value={form.username}
                onChange={handleChange}
                className="
                  mt-1
                  w-full
                  px-4
                  py-2.5
                  border
                  rounded-xl
                  focus:ring-2
                  focus:ring-indigo-500
                  outline-none
                  text-sm
                "
              />
            </div>

          
            <div className="relative">
              <label className="text-xs font-medium text-slate-600">
                Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="
                  mt-1
                  w-full
                  px-4
                  py-2.5
                  pr-12
                  border
                  rounded-xl
                  focus:ring-2
                  focus:ring-indigo-500
                  outline-none
                  text-sm
                "
              />

            
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute
                  right-4
                  top-[38px]
                  text-slate-500
                  hover:text-indigo-600
                  transition
                  text-lg
                "
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

           
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              disabled={loading}
              type="submit"
              className="
                w-full
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                py-2.5
                rounded-xl
                font-semibold
                shadow-md
                hover:shadow-lg
                transition
                text-sm
                disabled:opacity-60
              "
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>

          </form>

         
          <p className="text-xs text-slate-500 mt-5 text-center">
            Don't have an account?{" "}
            <Link
              to="/addaccount"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>


        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 p-8 relative">

         
          <motion.img
            src={Login2}
            alt="login"
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="max-w-[200px] mb-6 drop-shadow-xl"
          />

          <img
            src={Login1}
            alt="login"
            className="max-w-[220px] drop-shadow-xl"
          />

          <h2 className="mt-5 text-lg font-bold text-slate-700 text-center">
            Let's Get You Back 🚀
          </h2>

          <p className="text-slate-500 text-xs mt-2 text-center max-w-xs">
            Continue your creator journey with us.
          </p>

        </div>

      </motion.div>

    </div>
  );
};

export default Login;