package com.example.students.service;

import com.example.students.shared.dto.StudentDto;

public interface StudentService {

    String getStudent();

    StudentDto createStudent(StudentDto studentDetails);

    String updateStudent();

    String deleteStudent();
}
