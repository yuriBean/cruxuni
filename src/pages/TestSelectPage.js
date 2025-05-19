import { useNavigate } from "react-router-dom";
const TestSelectPage = () => {
const navigate = useNavigate();
const handleStartTest = (testType) => {
let duration = 0;
if (testType === "NET") duration = 3 * 60 * 60; // 3 hours
if (testType === "NTS") duration = 2 * 60 * 60; // 2 hours
if (testType === "ECAT") duration = 3 * 60 * 60;
navigate("/test/start", { state: { testType, duration } });
};
return (
<div style={{ textAlign: "center", paddingTop: "10vh" }}>
<h2>Select a Test</h2>
<button onClick={() => handleStartTest("NET")} style={btnStyle}>
NET (3 hours)
</button>
<button onClick={() => handleStartTest("NTS")} style={btnStyle}>
NTS (2 hours)
</button>
<button onClick={() => handleStartTest("ECAT")} style={btnStyle}>
ECAT (3 hours)
</button>
<div style={{ marginTop: 40 }}>
<button style={{ ...btnStyle, background: "#ccc", cursor: "not-allowed" }} disabled>
More Tests Incoming...
</button>
</div>
</div>
);
};
const btnStyle = {
margin: 10,
padding: "12px 20px",
fontSize: "16px",
cursor: "pointer",
};
export default TestSelectPage;
