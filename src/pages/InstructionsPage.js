import { useLocation, useNavigate } from "react-router-dom";
const InstructionsPage = () => {
const navigate = useNavigate();
const { state } = useLocation();
if (!state?.testType) {
navigate("/");
return null;
}
const handleStart = () => {
navigate("/test", { state: { testType: state.testType } });
};
return (
<div className="container">
<h2>{state.testType} Test Instructions</h2>
<ul>
<li>Total Duration: {state.testType === "NET" || state.testType === "ECAT" ? "3 hours" : "2 hours"}</li>
<li>Once an answer is selected, it is locked.</li>
<li>You can skip a question and return to skipped ones.</li>
<li>Cannot go back to locked questions.</li>
<li>System will auto-submit when time is up.</li>
</ul>
<button onClick={handleStart}>Start Test</button>
</div>
);
};
export default InstructionsPage;
