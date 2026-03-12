import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e)=>{
    e.preventDefault();

    setError("");
    setLoading(true);

    try{

      const res = await fetch("/api/login",{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({username,password})
      });

      const data = await res.json();

      if(data.status==="success"){
        localStorage.setItem("user",data.user);
        navigate("/dashboard");
      }else{
        setError(data.message || "Invalid username or password");
      }

    }catch(err){
      setError("Server error. Try again");
    }

    setLoading(false);
  };

return(

<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 relative overflow-hidden px-4">

{/* circles */}

<div className="absolute w-72 h-72 bg-white/20 rounded-full top-10 left-10 blur-xl"></div>
<div className="absolute w-96 h-96 bg-white/20 rounded-full bottom-10 right-10 blur-xl"></div>
<div className="absolute w-40 h-40 bg-white/20 rounded-full bottom-20 left-20 blur-xl"></div>


<div className="w-full max-w-[900px] flex bg-white/20 backdrop-blur-lg rounded-[30px] shadow-2xl overflow-hidden">


{/* LEFT SIDE */}

<div className="hidden md:flex flex-col justify-center p-12 text-white w-1/2">

<h2 className="text-2xl font-semibold mb-8 flex items-center gap-2">
<span className="w-4 h-4 bg-white rounded-full"></span>
Storage
</h2>

<h1 className="text-3xl font-bold leading-snug mb-4">
Manage your files <br/> the best way
</h1>

<p className="text-white/80 text-sm mb-8">
Awesome, we've created the perfect place for you
to store all your documents.
</p>

<img
src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
className="w-48"
/>

</div>


{/* RIGHT SIDE LOGIN */}

<div className="w-full md:w-1/2 bg-white rounded-l-[30px] p-10">

<h2 className="text-3xl font-bold text-gray-700 mb-8">
Login
</h2>

<form onSubmit={handleLogin} className="space-y-5">

<div>
<label className="text-sm text-gray-500">
Username
</label>

<input
type="text"
value={username}
onChange={(e)=>setUsername(e.target.value)}
className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
required
/>
</div>


<div>
<label className="text-sm text-gray-500">
Password
</label>

<input
type="password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
required
/>
</div>


<button
type="submit"
disabled={loading}
className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-105 transition"
>
{loading ? "Logging in..." : "Login"}
</button>


{error && (
<p className="text-red-500 text-sm">
{error}
</p>
)}

</form>

</div>

</div>

</div>

);
}

export default Login;