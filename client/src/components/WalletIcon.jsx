import { useEffect, useState } from "react";
import api from "../api/axios";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export default function WalletIcon({ variant = "light" }) {
  const [amount, setAmount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const creatorId = parseInt(localStorage.getItem("username"));
    if (!creatorId) {
      setLoading(false);
      return;
    }

    api
      .get(`/api/creator/wallet?creatorId=${creatorId}`)
      .then((res) => {
        // Show available balance, fallback to pending if available is 0
        const displayAmount =
          res.data.available > 0 ? res.data.available : res.data.pending;

        setAmount(displayAmount);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Wallet fetch failed", err);
        setAmount(null);
        setLoading(false);
      });
  }, []);

  const isDark = variant === "dark";

  if (loading) {
    return (
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
        isDark 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-gray-100 border-gray-200'
      }`}>
        <div className={`w-4 h-4 rounded-full border-2 ${
          isDark 
            ? 'border-gray-600 border-t-indigo-400' 
            : 'border-gray-300 border-t-indigo-600'
        } animate-spin`}></div>
        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Loading...
        </span>
      </div>
    );
  }

  if (amount === null) return null;

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors ${
      isDark 
        ? 'bg-gray-800 border-gray-700 hover:border-indigo-500' 
        : 'bg-white border-gray-200 hover:border-indigo-300'
    }`}>
      <AccountBalanceWalletIcon 
        className={isDark ? "text-indigo-400" : "text-indigo-600"}
        sx={{ fontSize: 18 }}
      />
      <span className={`font-semibold text-sm ${
        isDark ? 'text-gray-200' : 'text-gray-800'
      }`}>
        ₹{amount.toLocaleString('en-IN')}
      </span>
    </div>
  );
}