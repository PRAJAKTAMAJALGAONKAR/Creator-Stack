import React from "react";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { SiGooglepay, SiRazorpay, SiPaytm } from "react-icons/si";

import SubscribeImg from "/images/subscribe.png";
import PaymentImg from "/images/payement.png";

const Subscription = () => {
  const features = [
    "Only 3% platform fee per transaction",
    "Unlimited products",
    "Advanced analytics & insights",
    "Custom branding options",
    "Priority support",
    "Enhanced file hosting (1GB per file)",
    "Customer management tools",
    "Discount & coupon codes",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center px-6 py-12">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">

        
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="navfam text-4xl font-bold text-indigo-600">
            Upgrade to Pro 🚀
          </h1>

          <p className="text-gray-600 max-w-md">
            Unlock advanced tools, analytics, and premium features
            to grow your creator business faster.
          </p>

          <img
            src={SubscribeImg}
            alt="Subscription"
            className="w-full max-w-sm rounded-2xl shadow-lg"
          />
        </motion.div>

       
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-xl p-8 space-y-6"
        >
          
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Pro</h2>
            <p className="text-gray-500 mt-1">For serious creators</p>

            <div className="mt-4">
              <span className="text-4xl font-extrabold text-indigo-600">
                ₹29
              </span>
              <span className="text-gray-500"> / month</span>
            </div>
          </div>

       
          <div className="space-y-3">
            {features.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-gray-700"
              >
                <FiCheckCircle className="text-green-500 w-5 h-5" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <button
              disabled
              className="w-full py-3 rounded-xl bg-gray-300 text-gray-600 font-semibold cursor-not-allowed"
            >
              🚧 Under Development
            </button>

            <p className="text-center text-sm text-gray-500 mt-2">
              Payments coming soon
            </p>
          </div>

     
          <div className="border-t pt-5">
            <p className="text-sm text-gray-500 mb-3 text-center">
              Supported Payments (Coming Soon)
            </p>

            <div className="flex justify-center gap-6 text-3xl text-gray-500">
              <SiGooglepay />
              <SiRazorpay />
              <SiPaytm />
            </div>

            <img
              src={PaymentImg}
              alt="Payment"
              className="w-full max-w-xs mx-auto mt-5 rounded-xl"
            />
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Subscription;
