import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";

export default function BuyPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug || !token) {
      setError("Invalid link");
      setLoading(false);
      return;
    }

    const fetchContent = async () => {
      try {
        const res = await api.get(`/api/buy/${slug}?token=${token}`);
        setContent(res.data.content);
      } catch (err) {
        console.error(err);
        setError("Unable to load content");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [slug, token]);

  const handleBuy = async () => {
    try {
      setLoading(true);
      
      const res = await api.get(`/api/buy/${slug}?token=${token}`);
      
      window.location.href = res.data.checkoutUrl;
      
    } catch (err) {
      console.error(err);
      alert("Payment failed ❌");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-3 border-gray-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }


  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center"
        >
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <a
            href="/"
            className="inline-block px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition"
          >
            Return Home
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md"
      >
       
        <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">🎯</span>
        </div>

       
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          {content.prompt}
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Get instant access to premium content
        </p>

       
        <div className="bg-gray-50 rounded-xl p-6 mb-6 text-center">
          <p className="text-sm text-gray-600 mb-1">One-time payment</p>
          <p className="text-4xl font-bold text-gray-900">₹{content.price}</p>
          <p className="text-xs text-gray-500 mt-2">Lifetime access</p>
        </div>


        <div className="space-y-3 mb-8">
          {[
            "Instant download after payment",
            "Secure checkout with Stripe",
            "Access anytime, anywhere"
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-5 h-5 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <p className="text-sm text-gray-700">{feature}</p>
            </div>
          ))}
        </div>


        <button
          onClick={handleBuy}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Buy Now"}
        </button>

      
        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500">🔒 Secure payment powered by Stripe</p>
        </div>
      </motion.div>
    </div>
  );
}