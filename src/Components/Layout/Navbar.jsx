import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />  {/* 🔥 This makes it appear on all pages */}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/waste-guidance" element={<WasteGuide />} />
        <Route path="/dustbin-location" element={<DustbinMap />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;