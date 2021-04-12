import React, { useState } from "react";
import StudentForm from "./StudentForm";
import Student from "./Student";

const StudentList = () => {
    const [students, setStudents] = useState([]);

    const addStudent = (newStudent) => {
        console.log(newStudent);
        // setStudents((prevStudents) => [...prevStudents, newStudent]);
    };

    return (
        <div>
            <div>
                Student List Div
                <br /> <br />
                {students.map((student, index) => (
                    <Student key={index} StudentData={student} />
                ))}
            </div>

            <StudentForm addStudent={addStudent} />
        </div>
    );
};

export default StudentList;
