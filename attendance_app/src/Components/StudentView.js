import React, { useState } from "react";

const StudentView = (props) => {
    const student = props.studentDetails;

    const [values, setValues] = useState({
        firstName: student.first_name,
        lastName: student.last_name,
        age: student.age,
        present: student.present,
    });

    const handleChange = (title, event) => {
        const value =
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value;

        setValues({
            ...values,
            [title]: value,
        });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const fetchStudents = async () => {
            const resp = await fetch(
                `http://localhost:8080/students/${student.student_id}`,
                {
                    method: "PUT",
                    mode: "cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        first_name: values.firstName,
                        last_name: values.lastName,
                        age: values.age,
                        present: values.present,
                    }),
                }
            );

            if (resp.ok) {
                window.location.reload();
            } else {
                alert("Invalid information, enter correct student details!");
            }
        };

        fetchStudents();
    };

    return (
        <div className="student-form-container view">
            <div className="form-style-div">
                <h2 className="student-form-title">Edit Student</h2>
                <form onSubmit={submitHandler}>
                    <label htmlFor="firstName">
                        <span>First Name</span>
                        <input
                            type="text"
                            id="firstName"
                            pattern=".{2,}"
                            required
                            className="input-field"
                            name="firstName"
                            value={values.firstName || ""}
                            onChange={(e) => handleChange("firstName", e)}
                        />
                    </label>
                    <label htmlFor="lastName">
                        <span>Last Name</span>
                        <input
                            type="text"
                            id="lastName"
                            pattern=".{2,}"
                            required
                            className="input-field"
                            name="lastName"
                            value={values.lastName || ""}
                            onChange={(e) => handleChange("lastName", e)}
                        />
                    </label>
                    <label htmlFor="age">
                        <span>Age</span>
                        <input
                            type="number"
                            id="age"
                            min="1"
                            required
                            className="input-field"
                            name="age"
                            value={values.age || ""}
                            onChange={(e) => handleChange("age", e)}
                        />
                    </label>
                    <label htmlFor="present" style={{ fontWeight: "bold" }}>
                        <input
                            type="checkbox"
                            id="present"
                            name="present"
                            className="input-field-checkbox"
                            defaultChecked={values.present}
                            onChange={(e) => handleChange("present", e)}
                        />
                        &emsp;Present
                    </label>
                    <div>
                        <input
                            type="submit"
                            value="Edit"
                            className="edit-input"
                        />
                        <button
                            onClick={() => {
                                props.setView("");
                                props.removeHandler(student)
                            }}
                            className="removeBtn deleteBtn"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => {
                                props.setView("");
                            }}
                            className="cancelBtn"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentView;
