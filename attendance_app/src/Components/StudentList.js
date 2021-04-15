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
                            onClick={() => {
                                props.linkHandler(student);
                            }}
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
                                defaultChecked={student.present}
                                onClick={props.presentHandler}
                            />
                            &emsp;Present
                        </label>
                        <button
                            onClick={() => {
                                props.removeHandler(student)
                            }}
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
    const [studentDetails, setStudentDetails] = useState({});

    /* // Använd till  presentHandler uppdatera på indexet
    const studentDetailsIndex = students.findIndex(function (el) {
        return el === studentDetails;
    });*/

    useEffect(() => {
        const fetchStudents = async () => {
            const resp = await fetch("http://localhost:8080/students/");
            const studentList = await resp.json();
            setStudents(studentList);
        };

        fetchStudents();
    }, []);

    const linkHandler = (studentDetails) => {
        setStudentDetails(studentDetails);
        setView("studentview");
    };

    const presentHandler = () => {
        // Change True / False
        console.log("Present change");
    };

    const removeHandler = (student) => {
        const fetchStudents = async () => {
            console.log(student);
        const resp = await fetch(
            `http://localhost:8080/students/${student.student_id}`, {
                method: "DELETE",
                mode: "cors",
                headers: { "Content-Type": "application/json" }, 
            })
            if (resp.ok) {
                setStudents(prevStudents => {
                    return prevStudents.filter(prevStudent => prevStudent.student_id !== student.student_id)
                })
            }
        }
        fetchStudents();
    };

    switch (view) {
        case "studentview":
            return (
                <>
                    <StudentView
                        studentDetails={studentDetails}
                        setView={setView}
                        removeHandler={removeHandler}
                    />
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
