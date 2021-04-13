import React, { useState } from "react";
import StudentForm from "./StudentForm";
import Student from "./Student";

const StudentList = () => {
    const [students, setStudents] = useState([]);

    return (
        <div>
            <div>
                Student List Div
                <br /> <br />
                {students.map((student, index) => (
                    <Student key={index} StudentData={student} />
                ))}
            </div>

            <StudentForm setStudents={setStudents} />
        </div>
    );
};

export default StudentList;
