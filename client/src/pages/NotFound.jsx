import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import NotFoundImage from "/images/404notfound.png";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-indigo-50
        via-white
        to-purple-50
        p-4
        overflow-hidden
       
      "
    >
      <div className="absolute w-[350px] h-[350px] bg-indigo-300/20 rounded-full blur-3xl top-[-120px] left-[-120px]" />
      <div className="absolute w-[300px] h-[300px] bg-purple-300/20 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          relative
          bg-white/80
          backdrop-blur-xl
          rounded-2xl
          shadow-xl
          p-6
          md:p-8
          max-w-lg
          w-full
          text-center
          border-hidden
        "
      >
       
        <motion.img
          src={NotFoundImage}
          alt="404 Not Found"
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            mx-auto
            max-w-xs
            w-full
            object-contain
            drop-shadow-lg
          "
        />

    
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="
            text-2xl
            md:text-3xl
            font-bold
            text-slate-900
            mt-5
          "
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="
            text-slate-500
            text-sm
            mt-2
            max-w-sm
            mx-auto
          "
        >
          The page you’re looking for doesn’t exist.
        </motion.p>

     
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6"
        >
          <button
            onClick={() => navigate("/")}
            className="
              px-6
              py-2.5
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              text-sm
              font-medium
              rounded-lg
              shadow-md
              hover:shadow-lg
              transition-all
              active:scale-95
            "
          >
            Go Back Home
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
