package com.example.students.service;

import com.example.students.shared.dto.StudentDto;


import java.util.Optional;

import java.util.List;


public interface StudentService {

    Optional<StudentDto> getStudent(String studentId);

    StudentDto createStudent(StudentDto studentDetails);

    Optional<StudentDto> updateStudent(String id, StudentDto studentDto);

    boolean deleteStudent(String studentId);

    List<StudentDto> getAllStudents();
}
