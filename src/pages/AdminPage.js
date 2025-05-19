import { useState } from "react";
import { db } from "../firebase"; // assuming firebase is set up
import { collection, addDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const AdminPage = () => {
const [testType, setTestType] = useState("");
const [question, setQuestion] = useState("");
const [options, setOptions] = useState(["", "", "", ""]);
const [correctAnswer, setCorrectAnswer] = useState("");
const navigate = useNavigate();
useEffect(() => {
const unsub = auth.onAuthStateChanged((user) => {
if (!user) navigate("/admin-login");
});
return () => unsub();
}, [navigate]);

const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin-login");
    };
    

const handleSubmit = async (e) => {
e.preventDefault();
try {
await addDoc(collection(db, testType.toLowerCase()), {
question,
options,
correctAnswer,
});
alert("Question added!");
setQuestion("");
setOptions(["", "", "", ""]);
setCorrectAnswer("");
} catch (err) {
alert("Error adding question");
console.error(err);
}
};
return (
<div  className="container">
<button onClick={handleLogout} style={{ float: "right" }}>
Logout
</button>
<h2>Admin Panel: Add Question</h2>
<form onSubmit={handleSubmit}>
<label>Test Type:
<input value={testType} onChange={(e) => setTestType(e.target.value)} required />
</label><br /><br />
<label>Question:
<input value={question} onChange={(e) => setQuestion(e.target.value)} required />
</label><br /><br />
{options.map((opt, i) => (
<div key={i}>
<label>Option {i + 1}:
<input
value={opt}
onChange={(e) =>
setOptions((prev) => {
const newOpts = [...prev];
newOpts[i] = e.target.value;
return newOpts;
})
}
required
/>
</label>
</div>
))}
<br />
<label>Correct Answer:
<input
value={correctAnswer}
onChange={(e) => setCorrectAnswer(e.target.value)}
required
/>
</label><br /><br />
<button type="submit">Add Question</button>
</form>
</div>
);
};
export default AdminPage;