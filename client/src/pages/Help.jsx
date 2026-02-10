import React from "react";
import { motion } from "framer-motion";
import { FiMail } from "react-icons/fi";

import HelpImg from "/images/help1.png"; 

const Help = () => {
  const emails = [
    "abcd@gmail.com",
    
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-slate-50 flex items-center justify-center p-10">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-10">
        
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex flex-col gap-6"
        >
          <h1 className="navfam text-4xl font-extrabold text-indigo-600 mb-3">
            Help & Support
          </h1>
          <p className="text-slate-600 mb-6">
            Having trouble or need assistance? Reach out to any of our support team members below.  
            Click an email to contact them directly.
          </p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {emails.map((email, idx) => (
              <motion.a
                key={idx}
                href={`mailto:${email}`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                }}
                className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-3 cursor-pointer hover:bg-indigo-50 transition"
              >
               
                <div className="w-6 flex justify-center items-center">
                  <FiMail className="text-indigo-600 w-5 h-5" />
                </div>
                
                
                <span className="text-slate-700 text-sm break-all">
                  {email}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

       
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex justify-center"
        >
          <img
            src={HelpImg}
            alt="help"
            className="w-full max-w-md rounded-2xl shadow-xl"
          />
        </motion.div>

      </div>
    </div>
  );
};

export default Help;
