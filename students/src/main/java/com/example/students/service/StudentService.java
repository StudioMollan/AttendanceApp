package com.example.students.service;

import com.example.students.shared.dto.StudentDto;

import java.util.Optional;

public interface StudentService {

    String getStudent();

    Optional<StudentDto> getStudentByStudentId(String studentId);

    StudentDto createStudent(StudentDto studentDetails);

    String updateStudent();

    String deleteStudent();
}
