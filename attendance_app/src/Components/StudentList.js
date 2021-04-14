import React, { useState, useEffect } from "react";
import StudentForm from "./StudentForm";
import StudentView from "./StudentView";

const Student = (props) => {
    const students = props.studentData;
    return (
        <ul>
            {students.map((student, index) => {
                return (
                    <li key={index} className="student-li">
                        <button
                            type="button"
                            onClick={props.linkHandler}
                            className="link-button student-name"
                            style={{ fontWeight: "bold" }}
                        >
                            {student.first_name} {student.last_name}
                        </button>
                        <label htmlFor="present">
                            <input
                                type="checkbox"
                                id="present"
                                name="present"
                                className="student-checkbox"
                                value={student.present}
                                onClick={props.presentHandler}
                            />
                            &emsp;Present
                        </label>
                        <button
                            onClick={props.removeHandler}
                            className="removeBtn"
                        >
                            X
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [view, setView] = useState("");

    useEffect(() => {
        const fetchStudents = async () => {
            const resp = await fetch("http://localhost:8080/students/");
            const studentList = await resp.json();
            setStudents(studentList);
        };

        fetchStudents();
    }, []);

    const linkHandler = () => {
        setView("studentview");
    };

    const presentHandler = () => {
        // Change True / False
        console.log("Present change");
    };

    const removeHandler = () => {
        // Delete student
        console.log("Delete");
    };

    switch (view) {
        case "studentview":
            return (
                <>
                    <StudentView setView={setView} />
                </>
            );
        default:
            return (
                <div>
                    <Student
                        studentData={students}
                        linkHandler={linkHandler}
                        presentHandler={presentHandler}
                        removeHandler={removeHandler}
                    />
                    <StudentForm setStudents={setStudents} />
                </div>
            );
    }
};

export default StudentList;
