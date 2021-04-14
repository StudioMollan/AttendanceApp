import React, { useState, useEffect } from "react";
import StudentForm from "./StudentForm";

const Student = (props) => {
    const students = props.studentData;
    return (
        <ul>
            {students.map((student, index) => {
                return (
                    <li key={index} className="student-li">
                        <a
                            href="#"
                            onClick={props.linkHandler}
                            className="student-name"
                            style={{ fontWeight: "bold" }}
                        >
                            {student.first_name} {student.last_name}
                        </a>
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

    useEffect(() => {
        const fetchStudents = async () => {
            const resp = await fetch("http://localhost:8080/students/");
            const studentList = await resp.json();
            setStudents(studentList);
        };

        fetchStudents();
    }, []);

    const linkHandler = () => {
        // Go to student edit form
        console.log("Go to student edit form");
    };

    const presentHandler = () => {
        // Change True / False
        console.log("Present change");
    };

    const removeHandler = () => {
        // Delete student
        console.log("Delete");
    };

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
};

export default StudentList;
