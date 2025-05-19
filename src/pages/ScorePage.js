import { useLocation, useNavigate } from "react-router-dom";
import questions from "../data/questions";
const ScorePage = () => {
const { state } = useLocation();
const navigate = useNavigate();
const { answers = {}, total = 0, testType } = state || {};
const attempted = Object.keys(answers).length;
const correct = Object.entries(answers).reduce((count, [index, ans]) => {
const q = questions[testType.toLowerCase()][index];
return q?.correctAnswer === ans ? count + 1 : count;
}, 0);
return (
<div  className="container">
<h2>Test Completed!</h2>
<p><strong>Total Questions:</strong> {total}</p>
<p><strong>Attempted:</strong> {attempted}</p>
<p><strong>Correct Answers:</strong> {correct}</p>
<div style={{ marginTop: 30 }}>
<button onClick={() => navigate("/")}>Return to Home</button>
<button onClick={() => navigate("/test/start")}>Retake Test</button>
</div>
</div>
);
};
export default ScorePage;