import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

export default function DownloadPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState("verifying");
  const [fileInfo, setFileInfo] = useState(null);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setError("Missing session ID");
      return;
    }

    const verifyPayment = async () => {
  try {
    const res = await axios.get(
      `http://localhost:7777/api/payment/verify?sessionId=${sessionId}`
    );

   
    await axios.get(
      `http://localhost:7777/api/stripe/verify?session_id=${sessionId}`
    );

    setFileInfo(res.data);
    setStatus("ready");
  } catch (err) {
    console.error("Verification failed", err);
    setError(err.response?.data?.error || "Payment verification failed");
    setStatus("error");
  }
};


    verifyPayment();
  }, [sessionId]);


  const handleDownload = () => {
    window.location.href = `http://localhost:5187/api/download/file?session_id=${sessionId}`;
  };

  
  if (status === "verifying") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-3 border-gray-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-900 font-medium">Verifying payment...</p>
        <p className="text-sm text-gray-500 mt-1">This will only take a moment</p>
      </div>
    );
  }


  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center"
        >
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Verification Failed
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "Unable to verify your payment"}
          </p>
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
        className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center"
      >
       
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">✅</span>
        </div>

       
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-8">
          Your content is ready to download
        </p>

        
        {fileInfo && (
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📄</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{fileInfo.fileName}</p>
                <p className="text-xs text-gray-500 mt-0.5">{fileInfo.mimeType}</p>
              </div>
            </div>
          </div>
        )}

       
        <button
          onClick={handleDownload}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-lg font-semibold transition mb-6"
        >
          Download Now
        </button>

    
        <div className="pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Need help? Contact <strong>support@creatorstack.com</strong>
          </p>
        </div>
      </motion.div>
    </div>
  );
}