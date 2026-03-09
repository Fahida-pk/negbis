import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

const navigate = useNavigate();

const handleLogin = async (e) => {

  e.preventDefault();

  try {

    const API_URL =
  import.meta.env.DEV
    ? "/api/login.php"
    : "https://erp.codezyntax.com/login.php";
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    console.log("API RESPONSE:", data);

    if (data.status === "success") {

      navigate("/dashboard");

    } else {

      alert(data.message || "Invalid login");

    }

  } catch (error) {

    console.log("ERROR:", error);
    alert("Server error");

  }

};
return (

<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6a7df2] to-[#8a8be9] relative overflow-hidden px-4">

{/* background bubbles */}
<div className="absolute w-[300px] h-[300px] bg-white/20 rounded-full left-[-120px] bottom-[-120px]"></div>
<div className="absolute w-[220px] h-[220px] bg-white/20 rounded-full right-[-80px] top-[120px]"></div>

{/* white card */}
<div className="relative w-full max-w-[850px] bg-white rounded-[30px] shadow-2xl p-6 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 overflow-hidden">

{/* card bubbles */}
<div className="absolute w-[200px] h-[200px] bg-[#6a7df2]/10 rounded-full left-[-80px] bottom-[-80px]"></div>
<div className="absolute w-[180px] h-[180px] bg-[#6a7df2]/10 rounded-full right-[-60px] top-[40px]"></div>

{/* avatar */}
<div className="w-[120px] md:w-[220px] relative z-10">
<img
src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
className="w-full"
/>
</div>

{/* login form */}
<form
onSubmit={handleLogin}
className="w-full md:w-[420px] relative z-10"
>

<h2 className="text-xl md:text-2xl font-bold text-[#6a7df2] mb-6 text-center md:text-left">
Welcome To  ERP v8.0.7
</h2>

{/* username */}
<div className="mb-4">
<label className="text-gray-600 text-sm">Login Name</label>
<input
type="text"
value={username}
onChange={(e)=>setUsername(e.target.value)}
className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 outline-none"
/>
</div>

{/* password */}
<div className="mb-4">
<label className="text-gray-600 text-sm">Password</label>
<input
type="password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 outline-none"
/>
</div>

{/* financial year */}
<div className="mb-4">
<label className="text-gray-600 text-sm">Fin. Year</label>
<select className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 outline-none">
<option>25-26</option>
<option>26-27</option>
</select>
</div>

{/* remember login */}
<div className="flex items-center mb-6">
<input type="checkbox" className="mr-2"/>
<span className="text-gray-600 text-sm">
Remember my Login
</span>
</div>

{/* login button */}
<button
type="submit"
className="w-full py-3 rounded-full bg-gradient-to-r from-[#6a7df2] to-[#8a8be9] text-white font-semibold shadow-md"
>
Login
</button>

</form>

</div>

</div>

);

}

export default Login;