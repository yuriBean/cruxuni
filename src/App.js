import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
onAuthStateChanged,
signOut,
} from "firebase/auth";
import TestSelectPage from "./pages/TestSelectPage.js"; 
import TestPage from "./pages/TestPage";
import ScorePage from "./pages/ScorePage.js";
import AdminPage from "./pages/AdminPage.js";
import AdminLogin from "./pages/AdminLogin.js";
import NotFound from "./pages/NotFound.js";
import InstructionsPage from "./pages/InstructionsPage.js";
function LoginSignup() {
const [isLogin, setIsLogin] = useState(true);
const [form, setForm] = useState({ name: "", email: "", password: "" });
const [message, setMessage] = useState("");
const navigate = useNavigate();
const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
};
const handleSubmit = async (e) => {
e.preventDefault();
setMessage("");
try {
if (isLogin) {
await signInWithEmailAndPassword(auth, form.email, form.password);
navigate("/dashboard");
} else {
await createUserWithEmailAndPassword(auth, form.email, form.password);
setMessage("Signup successful! You can now log in.");
setIsLogin(true);
}
} catch (error) {
setMessage(error.message);
}
};
return (
<div style={{ maxWidth: 400, margin: "auto", paddingTop: "10vh" }}>
<h2 style={{ textAlign: "center" }}>Cruxuni {isLogin ? "Login" : "Signup"}</h2>
<form onSubmit={handleSubmit}>
{!isLogin && (
<input
type="text"
name="name"
placeholder="Name"
value={form.name}
onChange={handleChange}
required
style={{ width: "100%", marginBottom: 10, padding: 8 }}
/>
)}
<input
type="email"
name="email"
placeholder="Email"
value={form.email}
onChange={handleChange}
required
style={{ width: "100%", marginBottom: 10, padding: 8 }}
/>
<input
type="password"
name="password"
placeholder="Password"
value={form.password}
onChange={handleChange}
required
style={{ width: "100%", marginBottom: 10, padding: 8 }}
/>
<button type="submit" style={{ width: "100%", padding: 10 }}>
{isLogin ? "Login" : "Signup"}
</button>
</form>
<p style={{ textAlign: "center", marginTop: 10 }}>
{isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
<span
style={{ color: "blue", cursor: "pointer" }}
onClick={() => setIsLogin(!isLogin)}
>
{isLogin ? "Signup" : "Login"}
</span>
</p>
{message && (
<p style={{ marginTop: 15, color: message.includes("success") ? "green" : "red" }}>
{message}
</p>
)}
</div>
);
}
function Dashboard() {
const [user, setUser] = useState(null);
const navigate = useNavigate();
useEffect(() => {
const unsub = onAuthStateChanged(auth, (currentUser) => {
if (currentUser) {
setUser(currentUser);
} else {
navigate("/");
}
});
return () => unsub();
}, [navigate]);
const handleLogout = async () => {
await signOut(auth);
navigate("/");
};
return (
<div style={{ textAlign: "center", marginTop: "10vh" }}>
<h1>Welcome to Cruxuni, {user?.email}</h1>
<button onClick={handleLogout} style={{ marginTop: 20, padding: 10 }}>
Logout
</button>
</div>
);
}
function App() {
return (
<Router>
<Routes>
<Route path="/" element={<LoginSignup />} />
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/test/subject" element={<TestSelectPage />} />
<Route path="/test/start" element={<TestPage />} />
<Route path="/test/score" element={<ScorePage />} />
<Route path="/admin-login" element={<AdminLogin />} />
<Route path="/admin" element={<AdminPage />} />
<Route path="*" element={<NotFound />} />
<Route path="/instructions" element={<InstructionsPage />} />
</Routes>
</Router>
);
}
export default App