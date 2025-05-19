import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import questions from "../data/questions";
const TestPage = () => {
const { state } = useLocation();
const navigate = useNavigate();
const { testType, duration } = state || {};
const testQuestions = questions[testType.toLowerCase()] || [];
const [timeLeft, setTimeLeft] = useState(duration);
const [currentIndex, setCurrentIndex] = useState(0);
const [selected, setSelected] = useState(null);
const [answers, setAnswers] = useState({}); // locked
const [skipped, setSkipped] = useState([]);
const [reviewingSkipped, setReviewingSkipped] = useState(false);
// Timer
const [questions, setQuestions] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    if (!state?.testType) {
    navigate("/"); // Redirect if accessed directly
    }
    }, [state, navigate]);
useEffect(() => {
const fetchQuestions = async () => {
try {
const snapshot = await getDocs(collection(db, testType.toLowerCase()));
const data = snapshot.docs.map(doc => doc.data());
setQuestions(data);
setLoading(false);
} catch (err) {
console.error("Error fetching questions:", err);
}
};
fetchQuestions();
}, [testType]);
if (loading) return <p>Loading questions...</p>;const formatTime = (s) => {
const h = Math.floor(s / 3600);
const m = Math.floor((s % 3600) / 60);
const sec = s % 60;
return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${sec
.toString()
.padStart(2, "0")}`;
};
const handleNext = () => {
if (selected) {
setAnswers({ ...answers, [currentIndex]: selected });
}
setSelected(null);
if (currentIndex + 1 < testQuestions.length) {
setCurrentIndex(currentIndex + 1);
} else {
setReviewingSkipped(true);
}
};
const handleSkip = () => {
if (!skipped.includes(currentIndex)) {
setSkipped([...skipped, currentIndex]);
}
setSelected(null);
if (currentIndex + 1 < testQuestions.length) {
setCurrentIndex(currentIndex + 1);
} else {
setReviewingSkipped(true);
}
};
const goToSkipped = (index) => {
setCurrentIndex(index);
setReviewingSkipped(false);
setSelected(null);
};
const handleSubmit = () => {
    const confirm = window.confirm("Are you sure you want to submit the test? You won't be able to change your answers.");
        if (confirm) {
        
navigate("/test/score", {
    state: {
        answers,
        total: testQuestions.length,
        testType,
        },        
});
};}
if (reviewingSkipped && skipped.length > 0) {
return (
<div  className="container">
<h2>Review Skipped Questions</h2>
<p>Select a question to return and answer:</p>
{skipped.map((qIndex) => (
<button key={qIndex} onClick={() => goToSkipped(qIndex)} style={{ margin: 5 }}>
Question {qIndex + 1}
</button>
))}
<div style={{ marginTop: 20 }}>
<button onClick={handleSubmit}>Submit Test</button>
</div>
</div>
);
}
const q = testQuestions[currentIndex];
const alreadyAnswered = answers.hasOwnProperty(currentIndex);
return (
<div  className="container">
<div>
<strong>Time Left:</strong> {formatTime(timeLeft)}
</div>
<h3>
Q{currentIndex + 1}: {q?.question}
</h3>
{q?.options.map((opt, i) => (
<div key={i}>
<label>
<input
type="radio"
name="option"
disabled={alreadyAnswered}
checked={selected === opt}
onChange={() => setSelected(opt)}
/>
{opt}
</label>
</div>
))}
<div style={{ marginTop: 20 }}>
{!alreadyAnswered && (
<>
<button onClick={handleSkip} style={{ marginRight: 10 }}>
Skip
</button>
<button onClick={handleNext}>Next</button>
</>
)}
{alreadyAnswered && (
<div style={{ color: "gray", marginTop: 10 }}>Answer locked for this question.</div>
)}
</div>
</div>
);
};
export default TestPage;