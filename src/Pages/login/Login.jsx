import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

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
        setError(data.message || "Invalid login");
      }

    }catch(err){
      setError("Server error");
    }

    setLoading(false);
  };

  return(

<div className="login-bg">

{/* circles */}

<div className="circle c1"></div>
<div className="circle c2"></div>
<div className="circle c3"></div>

<div className="login-container">

{/* LEFT PANEL */}

<div className="login-left">

<h2 className="brand">Storage</h2>

<h1 className="title">
Manage your files <br/> the best way
</h1>

<p className="subtitle">
Awesome, we've created the perfect place for you
to store all your documents.
</p>

<img
src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
className="folder-img"
/>

</div>


{/* RIGHT PANEL */}

<div className="login-right glass">

<h2 className="login-title">Login</h2>

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