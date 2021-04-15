import React, { useState } from "react";

const StudentForm = (props) => {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        age: 0,
        present: false,
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
            const resp = await fetch("http://localhost:8080/students/", {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    first_name: values.firstName,
                    last_name: values.lastName,
                    age: values.age,
                    present: values.present,
                }),
            });

            if (resp.status !== 201) {
                alert("Invalid information, enter all student details!");
            } else {
                const newStudent = await resp.json();
                props.setStudents((prevStudents) => [
                    ...prevStudents,
                    newStudent,
                ]);
                setValues([]); // Reset form for new input
            }
        };

        fetchStudents();
    };

    return (
        <div>
            <div className="student-form-container">
                <div className="form-style-div">
                    <h2 className="student-form-title">New Student</h2>
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
                                value={values.present}
                                onChange={(e) => handleChange("present", e)}
                            />
                            &emsp;Present
                        </label>

                        <input type="submit" value="Create" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StudentForm;
