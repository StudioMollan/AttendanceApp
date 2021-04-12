import React, { useState } from "react";

const StudentForm = (props) => {
    const [values, setValues] = useState({
        name: "",
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
        props.addStudent(values);
    };

    return (
        <div>
            <div className="student-form-container">
                <div className="form-style-div">
                    <h2 className="student-form-title">New Student</h2>
                    <form onSubmit={submitHandler}>
                        <label htmlFor="name">
                            <span>Name</span>
                            <input
                                type="text"
                                id="name"
                                pattern=".{2,}"
                                required
                                className="input-field"
                                name="name"
                                value={values.name}
                                onChange={(e) => handleChange("name", e)}
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
                                value={values.lastName}
                                onChange={(e) => handleChange("lastName", e)}
                            />
                        </label>
                        <label htmlFor="age">
                            <span>Age</span>
                            <input
                                type="number"
                                id="age"
                                min="1"
                                className="input-field"
                                name="age"
                                value={values.age}
                                placeholder="Enter your age"
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
