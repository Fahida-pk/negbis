import { useState } from "react";

function Login() {

const [username,setUsername] = useState("");
const [password,setPassword] = useState("");

const handleLogin = async () => {

const response = await fetch("https://negbis.codezyntax.com/login.php",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
username:username,
password:password
})
});

const data = await response.json();
console.log(data);

}

return (

<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6a7df2] to-[#8a8be9] relative overflow-hidden">

{/* background bubbles */}
<div className="absolute w-[350px] h-[350px] bg-white/20 rounded-full left-[-120px] bottom-[-120px]"></div>
<div className="absolute w-[260px] h-[260px] bg-white/20 rounded-full right-[-80px] top-[120px]"></div>

{/* white card */}
<div className="relative w-[850px] bg-white rounded-[30px] shadow-2xl p-12 flex items-center gap-12 overflow-hidden">

{/* card bubbles */}
<div className="absolute w-[250px] h-[250px] bg-[#6a7df2]/10 rounded-full left-[-80px] bottom-[-80px]"></div>
<div className="absolute w-[200px] h-[200px] bg-[#6a7df2]/10 rounded-full right-[-60px] top-[40px]"></div>

{/* avatar */}
<div className="w-[220px] relative z-10">
<img
src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
className="w-full"
/>
</div>

{/* login form */}
<div className="w-[420px] relative z-10">

<h2 className="text-2xl font-bold text-[#6a7df2] mb-6">
Welcome To neGbis ERP v8.0.7
</h2>

{/* username */}
<div className="mb-5">
<label className="text-gray-600 text-sm">Login Name</label>
<input
type="text"
onChange={(e)=>setUsername(e.target.value)}
className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 outline-none"
/>
</div>

{/* password */}
<div className="mb-5">
<label className="text-gray-600 text-sm">Password</label>
<input
type="password"
onChange={(e)=>setPassword(e.target.value)}
className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 outline-none"
/>
</div>

{/* financial year */}
<div className="mb-5">
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
onClick={handleLogin}
className="w-full py-3 rounded-full bg-gradient-to-r from-[#6a7df2] to-[#8a8be9] text-white font-semibold shadow-md"
>
Login
</button>

</div>

</div>

</div>

);

}

export default Login;