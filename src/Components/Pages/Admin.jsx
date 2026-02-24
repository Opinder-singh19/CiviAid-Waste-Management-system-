import { Mail, Lock, Shield, ArrowLeft } from "lucide-react";

export default function Admin() {
  return (
    <div className="min-h-screen flex items-center justify-center  from-green-900 via-green-800 to-green-900 p-4">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 border-4 border-green-400">

        {/* Back Button */}
        <div className="flex items-center gap-2 text-gray-600 text-sm mb-6 cursor-pointer">
          <ArrowLeft size={18} />
          <span>Back to User Login</span>
        </div>

        {/* Icon Circle */}
        <div className="relative flex justify-center mb-6">
          <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
            <Shield size={40} className="text-white" />
          </div>

          <div className="absolute top-0  bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center text-xs">
            ♻
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-green-700 text-center">
          Admin Portal
        </h1>

        <p className="text-gray-500 text-center mt-2">
          Secure EcoWaste Management
        </p>

        {/* Access Badge */}
        <div className="mt-4 flex items-center justify-center gap-2 border border-green-300 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
          <Shield size={16} />
          Administrative Access
        </div>

        {/* Email */}
        <div className="mt-6">
          <label className="block text-gray-700 font-medium mb-2">
            Admin Email
          </label>
          <div className="flex items-center border border-green-400 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-green-400">
            <Mail size={18} className="text-green-600 mr-2" />
            <input
              type="email"
              placeholder="admin@ecowaste.com"
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mt-4">
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <div className="flex items-center border border-green-400 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-green-400">
            <Lock size={18} className="text-green-600 mr-2" />
            <input
              type="password"
              placeholder="Enter admin password"
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* Access Key */}
        <div className="mt-4">
          <label className="block text-gray-700 font-medium mb-2">
            Admin Access Key
          </label>
          <div className="flex items-center border border-green-400 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-green-400">
            <Shield size={18} className="text-green-600 mr-2" />
            <input
              type="text"
              placeholder="Enter security key"
              className="w-full outline-none"
            />
          </div>

          <p className="text-sm text-gray-500 mt-2">
            Contact system administrator for access key
          </p>
        </div>

        {/* Button */}
        <button className="mt-6 w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-xl shadow-md transition duration-300">
          Access Admin Dashboard
        </button>

        {/* Security Notice */}
        <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
          <div className="flex items-center gap-2 font-semibold mb-2">
            <Shield size={16} />
            Security Notice
          </div>
          <p>
            This is a secure administrative portal. All login attempts are
            monitored and logged for security purposes.
          </p>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          ♻ EcoWaste Admin Portal v2.0 • Secured
        </p>
      </div>
    </div>
  );
}