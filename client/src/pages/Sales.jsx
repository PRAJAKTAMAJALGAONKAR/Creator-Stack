import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import ShareImg from "/images/shares.png";
import LoginFail from "/images/loginfail.png";

function Sales() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creatorId, setCreatorId] = useState(null);
  const [creatorName, setCreatorName] = useState("");
  const [sharingId, setSharingId] = useState(null);

  const navigate = useNavigate();

  
  useEffect(() => {
    const storedId = parseInt(localStorage.getItem("username"));
    const storedName = localStorage.getItem("name");

    if (storedId) setCreatorId(storedId);
    if (storedName) setCreatorName(storedName);

    setLoading(false);
  }, []);

  
  useEffect(() => {
    if (!creatorId) return;

    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `http://localhost:7777/api/contents/creator/id/${creatorId}`
        );
        setCourses(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setCourses([]);
      }
    };

    fetchCourses();
  }, [creatorId]);

  
  const handleShare = async (contentId) => {
    try {
      setSharingId(contentId);

      const res = await axios.post(
        `http://localhost:7777/api/sell-links?contentId=${contentId}&creatorId=${creatorId}`
      );

      const sellLink = res.data.url;
      await navigator.clipboard.writeText(sellLink);
      
      alert("🎉 Buy link copied to clipboard!");
      
    } catch (err) {
      console.error("Error generating link:", err);
      alert("❌ Failed to generate link");
    } finally {
      setSharingId(null);
    }
  };

  
  if (!creatorId && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-10 max-w-md text-center"
        >
          <img
            src={LoginFail}
            alt="login"
            className="w-40 mx-auto mb-6"
          />

          <h1 className="text-xl font-bold text-gray-900 mb-2">
            You're Not Logged In
          </h1>

          <p className="text-gray-600 mb-6">
            Please login to access your dashboard
          </p>

          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition"
          >
            Go To Login
          </button>
        </motion.div>
      </div>
    );
  }

  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-3 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

 
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">


      <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Sales Dashboard
          </h1>

          <p className="text-gray-600 mt-1">
            Manage and share your courses
          </p>

          {creatorName && (
            <div className="flex items-center gap-2 mt-3">
              <span className="text-sm text-gray-700 font-medium">
                @{creatorName}
              </span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                ID: {creatorId}
              </span>
            </div>
          )}
        </div>

        <img
          src={ShareImg}
          alt="share"
          className="w-32"
        />
      </div>

   
      {courses.length === 0 ? (
        <div className="flex justify-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-lg"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📭</span>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              No Content Found
            </h2>

            <p className="text-gray-600 mb-6">
              Upload your first course to get started
            </p>

            <button
              onClick={() => navigate("/upload")}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition"
            >
              Upload Now
            </button>
          </motion.div>
        </div>
      ) : (

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {course.prompt}
              </h3>

       
              <p className="text-sm text-gray-500 mb-4">
                Course ID: {course.id}
              </p>

             
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-xs text-gray-600 mb-1">Price</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{course.price}
                </p>
              </div>

              
              <button
                onClick={() => handleShare(course.id)}
                disabled={sharingId === course.id}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {sharingId === course.id ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span>Share Link</span>
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Sales;