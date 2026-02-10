import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Body";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Blog from "./pages/Blog";

import DashboardLayout from "./pages/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import UploadContent from "./pages/UploadContent";
import UpdateProfile from "./pages/UpdateProfile";
import Sales from "./pages/Sales";
import Help from "./pages/Help";

import AddAccount from "./pages/AddAccount";
import Login from "./pages/Login";
import Subscription from "./pages/Subscription";

import BuyPage from "./pages/BuyPage";
import DownloadPage from "./pages/DownloadPage";
import NotFound from "./pages/NotFound";

function AppContent() {
  const location = useLocation();

  
  const hideNavbar =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/buy") ||
    location.pathname.startsWith("/download");

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
      {!hideNavbar && <Navbar />}

      <Routes>
    
        <Route path="/buy/:slug" element={<BuyPage />} />
        <Route path="/download" element={<DownloadPage />} />

        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/addaccount" element={<AddAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/subscription" element={<Subscription />} />

      
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<UpdateProfile />} />
          <Route path="upload" element={<UploadContent />} />
          <Route path="sales" element={<Sales />} />
          <Route path="help" element={<Help />} />
          <Route path="*" element={<NotFound />} />
        </Route>

      
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
