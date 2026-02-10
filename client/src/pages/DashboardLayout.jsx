import React, { useState } from "react";
import { Link, Outlet, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import WalletIcon from "../components/WalletIcon";

import Search from "/images/moneyys.png";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Upload Content", path: "/dashboard/upload" },
    { name: "Sales", path: "/dashboard/sales" },
    { name: "Help & Support", path: "/dashboard/help" },
  ];

  return (
    <div className="flex min-h-screen overflow-hidden font-sans relative bg-gray-900 text-gray-200">

      <motion.div
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className="
          md:hidden
          fixed top-0 left-0 right-0
          h-16
          bg-gray-800/95
          backdrop-blur-sm
          border-b border-gray-700
          flex items-center justify-between
          px-5
          z-50
          shadow-md
        "
      >
        <h2 className="navfam font-bold text-lg text-indigo-400 tracking-wide">
          CreatorStack
        </h2>

        <div className="flex items-center gap-3">
          
          <WalletIcon variant="dark" />
          
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <Menu size={26} className="text-gray-200" />
          </button>
        </div>
      </motion.div>


      <motion.aside
        initial={{ x: -260, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="
          hidden md:flex
          w-72
          bg-gradient-to-b from-gray-800 to-gray-900
          text-gray-200
          flex-col
          justify-between
          p-6
          shadow-2xl
          z-40
        "
      >

        
        <div>
          <h2 className="navfam text-3xl font-extrabold mb-8 text-indigo-400 tracking-wide">
            CreatorStack
          </h2>
          
         
          <div className="mb-8">
            <WalletIcon variant="dark" />
          </div>

          <nav className="flex flex-col gap-2">
            {menuItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                className={({ isActive }) =>
                  `
                  group
                  p-3
                  rounded-xl
                  transition-all
                  font-medium
                  text-sm
                  flex
                  items-center
                  gap-3
                  ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }
                `
                }
              >
                <span className="h-2 w-2 rounded-full bg-current opacity-70 group-hover:scale-110 transition" />
                {item.name}
              </NavLink>
            ))}

            <div className="mt-8 border-t border-gray-700 pt-4">
              <Link
                to="/"
                className="text-gray-400 hover:text-indigo-400 text-sm transition"
              >
                ← Back to Home
              </Link>
            </div>
          </nav>
        </div>

      
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          <img
            src={Search}
            alt="dashboard preview"
            className="w-full rounded-2xl opacity-80 shadow-md hover:shadow-xl transition"
          />
        </motion.div>
      </motion.aside>


      
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="
                fixed top-0 left-0 bottom-0
                w-72
                bg-gray-900
                text-gray-200
                p-6
                flex
                flex-col
                justify-between
                z-50
                shadow-2xl
              "
            >
              
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="navfam text-xl font-bold text-indigo-400">
                    CreatorStack
                  </h2>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-800 transition"
                  >
                    <X size={24} />
                  </button>
                </div>

               
                <div className="mb-6">
                  <WalletIcon variant="dark" />
                </div>

                <nav className="flex flex-col gap-2">
                  {menuItems.map((item, idx) => (
                    <NavLink
                      key={idx}
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `
                        p-3
                        rounded-xl
                        transition-all
                        font-medium
                        text-sm
                        ${
                          isActive
                            ? "bg-indigo-600 text-white shadow"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }
                      `
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}

                  <div className="mt-6 border-t border-gray-700 pt-4">
                    <Link
                      to="/"
                      onClick={() => setOpen(false)}
                      className="text-gray-400 hover:text-indigo-400 text-sm"
                    >
                      ← Back to Home
                    </Link>
                  </div>
                </nav>
              </div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={Search}
                  alt="preview"
                  className="w-full rounded-2xl shadow-md opacity-80 hover:shadow-xl transition"
                />
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      
      <main className="flex-1 bg-gray-800 overflow-y-auto pt-16 md:pt-0">
        <Outlet />
      </main>

    </div>
  );
};

export default DashboardLayout;