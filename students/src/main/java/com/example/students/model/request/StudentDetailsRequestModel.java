package com.example.students.model.request;

public class StudentDetailsRequestModel {

    private String firstName, lastName;  // student_id
    private int age;
    private boolean present = false;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public boolean isPresent() {
        return present;
    }

    public void setPresent(boolean present) {
        this.present = present;
    }


            /*id: (ett numeriskt värde)

            - student_id: (en text/sträng)

            - name: (en text/sträng)

            - last_name: (en text/sträng)

            - age: (ett numeriskt värde)

            - present: (en boolean)*/
}
