import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();
const handleLogin = async (e) => {
e.preventDefault();
try {
await signInWithEmailAndPassword(auth, email, password);
navigate("/admin");
} catch (err) {
alert("Login failed: " + err.message);
}
};
return (
<div  className="container">
<h2>Admin Login</h2>
<form onSubmit={handleLogin}>
<input
type="email"
placeholder="Admin Email"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
/><br /><br />
<input
type="password"
placeholder="Admin Password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
/><br /><br />
<button type="submit">Login</button>
</form>
</div>
);
};
export default AdminLogin;
