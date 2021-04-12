import StudentList from "./Components/StudentList";
import "./style.css";

const App = () => {
    return (
        <>
            <h1 id="title">
                <b>Student Attendance</b>
            </h1>
            <div className="wrapper">
                <StudentList />
            </div>
        </>
    );
};

export default App;
