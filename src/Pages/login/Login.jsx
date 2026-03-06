import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

const [username,setUsername] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();

const handleLogin = async (e) => {

e.preventDefault();

console.log("LOGIN CLICKED");

if(!username || !password){
alert("Enter username and password");
return;
}

try{

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

console.log("Response status:",response.status);

const data = await response.json();

console.log("Server response:",data);

if(data.status === "success"){
navigate("/dashboard");
}else{
alert("Invalid username or password");
}

}catch(error){

console.log("ERROR:",error);
alert("Server error");

}

};

return (

<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6a7df2] to-[#8a8be9]">

<div className="bg-white p-8 rounded-2xl shadow-xl w-[350px]">

<h2 className="text-xl font-bold text-center text-[#6a7df2] mb-6">
Welcome To neGbis ERP v8.0.7
</h2>

<form onSubmit={handleLogin}>

<div className="mb-4">
<label className="text-sm text-gray-600">Login Name</label>
<input
type="text"
value={username}
onChange={(e)=>setUsername(e.target.value)}
className="w-full border px-3 py-2 rounded mt-1"
/>
</div>

<div className="mb-4">
<label className="text-sm text-gray-600">Password</label>
<input
type="password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full border px-3 py-2 rounded mt-1"
/>
</div>

<div className="mb-4">
<label className="text-sm text-gray-600">Fin. Year</label>
<select className="w-full border px-3 py-2 rounded mt-1">
<option>25-26</option>
<option>26-27</option>
</select>
</div>

<button
type="submit"
className="w-full bg-[#6a7df2] text-white py-2 rounded-lg"
>
Login
</button>

</form>

</div>

</div>

);

}

export default Login;