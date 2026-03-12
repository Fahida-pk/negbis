import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {

const [username,setUsername] = useState("");
const [password,setPassword] = useState("");
const [error,setError] = useState("");
const [loading,setLoading] = useState(false);

const navigate = useNavigate();

const handleLogin = async(e)=>{
e.preventDefault();

setError("");
setLoading(true);

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

<div className="login-bg">

{/* animated circles */}

<div className="circle c1"></div>
<div className="circle c2"></div>
<div className="circle c3"></div>

<div className="login-container">


{/* LEFT SIDE */}

<div className="login-left">

<h1 className="title">
  {"Welcome to neGbis ERP".split("").map((char, index) => (
    <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>
      {char}
    </span>
  ))}
</h1>

<p className="subtitle animate-subtitle">
  Business ERP system for Sales, Accounts,
  Stock and Reports management.
</p>

</div>


{/* RIGHT SIDE LOGIN */}

<div className="login-right glass">

<div className="avatar">

<img
src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
alt="avatar"
/>

</div>

<h2 className="login-title">
Login
</h2>

<form onSubmit={handleLogin}>

<div className="input-group">

<label>Username</label>

<input
type="text"
value={username}
onChange={(e)=>setUsername(e.target.value)}
required
/>

</div>

<div className="input-group">

<label>Password</label>

<input
type="password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

</div>

<button
type="submit"
className="login-btn"
disabled={loading}
>

{loading ? "Logging in..." : "Login"}

</button>

{error && <p className="error">{error}</p>}

</form>

</div>

</div>

</div>

);
}

export default Login;