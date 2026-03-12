import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){

const [username,setUsername] = useState("");
const [password,setPassword] = useState("");
const [error,setError] = useState("");
const [loading,setLoading] = useState(false);

const navigate = useNavigate();

const handleLogin = async(e)=>{
e.preventDefault();

setLoading(true);
setError("");

try{

const res = await fetch("/api/login",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({username,password})
});

const data = await res.json();

if(data.status==="success"){
localStorage.setItem("user",data.user);
navigate("/dashboard");
}else{
setError(data.message || "Invalid login");
}

}catch(err){
setError("Server error");
}

setLoading(false);
};

return(

<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 relative overflow-hidden px-4">

{/* moving circles */}

<div className="absolute w-80 h-80 bg-white/20 rounded-full top-10 left-10 animate-pulse"></div>

<div className="absolute w-96 h-96 bg-white/20 rounded-full bottom-10 right-10 animate-bounce"></div>

<div className="absolute w-40 h-40 bg-white/20 rounded-full bottom-32 left-32 animate-ping"></div>


<div className="w-full max-w-[900px] flex rounded-[30px] overflow-hidden shadow-2xl backdrop-blur-lg bg-white/20">

{/* LEFT SIDE */}

<div className="hidden md:flex flex-col justify-center p-12 text-white w-1/2">

<h2 className="text-xl mb-6 flex items-center gap-2">

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
className="w-52"
/>

</div>


{/* RIGHT SIDE LOGIN */}

<div className="w-full md:w-1/2 bg-white/70 backdrop-blur-xl p-10">

<h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">

Welcome to neGbis ERP

</h2>


{/* avatar */}

<div className="flex justify-center mb-6">

<img
src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
className="w-28 h-28 rounded-full shadow-lg"
/>

</div>


<form onSubmit={handleLogin} className="space-y-5">

<div>

<label className="text-sm text-gray-600">
Login Name
</label>

<input
type="text"
value={username}
onChange={(e)=>setUsername(e.target.value)}
className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
required
/>

</div>


<div>

<label className="text-sm text-gray-600">
Password
</label>

<input
type="password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
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


{error &&(

<p className="text-red-500 text-center">

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