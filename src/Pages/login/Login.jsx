import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const API_URL = import.meta.env.VITE_API_URL;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const res = await fetch("/api/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ username, password })
});

      if (!res.ok) {
        throw new Error("Network error");
      }

      const data = await res.json();

      if (data.status === "success") {

        localStorage.setItem("user", data.user);
        navigate("/dashboard");

      } else {

        setError(data.message || "Invalid username or password");

      }

    } catch (err) {

      console.error("Login error:", err);
      setError("Server error. Try again");

    }

    setLoading(false);
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6a7df2] to-[#8a8be9] px-4">

      <div className="w-full max-w-[850px] bg-white rounded-[30px] shadow-2xl p-6 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">

        <div className="w-[120px] md:w-[220px]">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            className="w-full"
            alt="avatar"
          />
        </div>

        <form onSubmit={handleLogin} className="w-full md:w-[420px]">

          <h2 className="text-xl md:text-2xl font-bold text-[#6a7df2] mb-6">
            Welcome To ERP v8.0.7
          </h2>

          <div className="mb-4">
            <label className="text-gray-600 text-sm">Login Name</label>
            <input
              type="text"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-600 text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#6a7df2] to-[#8a8be9] text-white font-semibold shadow-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && (
            <p className="text-red-500 mt-4">{error}</p>
          )}

        </form>

      </div>

    </div>
  );
}

export default Login;