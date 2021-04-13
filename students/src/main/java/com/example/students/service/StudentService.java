package com.example.students.service;

import com.example.students.shared.dto.StudentDto;

import java.util.List;

public interface StudentService {

    String getStudent();

    StudentDto createStudent(StudentDto studentDetails);

    String updateStudent();

    String deleteStudent();

    List<StudentDto> getStudents();
}
