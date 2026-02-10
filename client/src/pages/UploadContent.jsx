import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, CircularProgress, Box } from "@mui/material";
import { motion } from "framer-motion";

import Upload1 from "/images/upload1.png";
import Upload2 from "/images/upload2.png";
import Upload3 from "/images/upload3.png";

const UploadContent = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  
  const creatorId = localStorage.getItem("username"); 
  const creatorName = localStorage.getItem("name");

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const createContent = async () => {
    console.log("Creator ID from localStorage:", creatorId);
    console.log("Creator Name from localStorage:", creatorName);

    const data = {
      prompt: title,
      price: parseFloat(price),
      creator: { 
        id: parseInt(creatorId) 
      },
    };

    console.log("Sending data:", data);

    const res = await axios.post("http://localhost:7777/api/contents", data);
    return res.data;
  };

  const uploadFile = async (contentId, file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(
      `http://localhost:7777/api/contents/${contentId}/files`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return res.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || files.length === 0) {
      alert("Please fill all fields and select at least one file");
      return;
    }

    if (!creatorId) {
      alert("You must be logged in to upload content");
      return;
    }

    try {
      setLoading(true);

      
      const content = await createContent();
      console.log("✅ Content created:", content);

      for (const f of files) {
        const uploadedFile = await uploadFile(content.id, f);
        console.log("✅ File uploaded:", uploadedFile);
      }

      alert("Content and files uploaded successfully ✅");
      setTitle("");
      setPrice("");
      setFiles([]);
    } catch (err) {
      console.error("❌ Error:", err.response?.data || err);
      alert(`File upload failed ❌\n${err.response?.data || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-10 bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 min-h-screen relative overflow-hidden">
      
   
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

     
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
          Upload Content
        </h1>
        <p className="text-slate-600 text-lg font-medium">
          Share your knowledge with the world
        </p>
      </motion.div>

     
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="relative mb-8 p-5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl">
            👤
          </div>
          <div>
            <p className="text-white font-bold text-lg">
              Logged in as: <span className="font-extrabold">{creatorName}</span>
            </p>
            <p className="text-white/80 text-sm">
              Creator ID: <span className="font-semibold">{creatorId}</span>
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
        
       
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20"
        >
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <span className="text-3xl">📤</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Upload New Content
            </h2>
            <p className="text-sm text-slate-600">
              Add title, price and files to start selling
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <TextField
                label="Content Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    backgroundColor: "white",
                    "&:hover fieldset": {
                      borderColor: "#6366f1",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#6366f1",
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#6366f1",
                  },
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <TextField
                label="Price (₹)"
                type="number"
                variant="outlined"
                fullWidth
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                inputProps={{ min: "0", step: "0.01" }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    backgroundColor: "white",
                    "&:hover fieldset": {
                      borderColor: "#6366f1",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#6366f1",
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#6366f1",
                  },
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Box>
                <label className="block mb-3 text-sm font-bold text-slate-700">
                  Upload Files
                </label>

                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  sx={{
                    py: 4,
                    borderStyle: "dashed",
                    borderWidth: "2px",
                    borderRadius: "16px",
                    textTransform: "none",
                    color: "#334155",
                    borderColor: "#cbd5e1",
                    backgroundColor: "white",
                    "&:hover": {
                      borderColor: "#6366f1",
                      backgroundColor: "#eef2ff",
                      borderWidth: "2px",
                    },
                  }}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">📁</span>
                    </div>
                    <span className="text-base font-bold">
                      {files.length > 0
                        ? `${files.length} file(s) selected`
                        : "Click to Upload"}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      PDF, Image, Video, Audio supported
                    </span>
                  </div>

                  <input
                    type="file"
                    multiple
                    hidden
                    onChange={handleFileChange}
                  />
                </Button>

                {files.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 space-y-2 bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100"
                  >
                    <p className="text-xs font-bold text-slate-600 mb-2">
                      Selected Files:
                    </p>
                    {files.map((f, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-2 bg-white p-2 rounded-lg"
                      >
                        <span className="text-lg">📎</span>
                        <p className="text-sm text-indigo-700 font-semibold truncate">
                          {f.name}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                type="submit"
                fullWidth
                disabled={loading}
                sx={{
                  py: 2,
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, #6366f1, #a855f7)",
                  color: "white",
                  textTransform: "none",
                  boxShadow: "0 8px 25px rgba(99, 102, 241, 0.3)",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    background: "linear-gradient(135deg, #4f46e5, #9333ea)",
                    boxShadow: "0 10px 35px rgba(99, 102, 241, 0.4)",
                    transform: "translateY(-2px)",
                  },
                  "&:disabled": {
                    background: "linear-gradient(135deg, #cbd5e1, #94a3b8)",
                    boxShadow: "none",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <CircularProgress size={24} sx={{ color: "white" }} />
                    <span>Uploading...</span>
                  </div>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span>Upload Content</span>
                    <span className="text-xl">🚀</span>
                  </span>
                )}
              </Button>
            </motion.div>
          </form>
        </motion.div>

       
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="relative flex justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-300 to-purple-300 blur-3xl opacity-20 rounded-full"></div>
          
          <div className="relative grid grid-cols-2 gap-5 max-w-md">
            <motion.img
              src={Upload1}
              alt="upload"
              className="rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border-4 border-white"
              whileHover={{ scale: 1.05, rotate: -2 }}
            />
            <motion.img
              src={Upload2}
              alt="upload"
              className="rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border-4 border-white"
              whileHover={{ scale: 1.05, rotate: 2 }}
            />
            <motion.img
              src={Upload3}
              alt="upload"
              className="rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 col-span-2 border-4 border-white"
              whileHover={{ scale: 1.05 }}
            />
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default UploadContent;