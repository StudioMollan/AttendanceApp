package com.example.students.service.impl;

import com.example.students.exception.BadRequestException;
import com.example.students.repository.StudentRepository;
import com.example.students.repository.entity.StudentEntity;
import com.example.students.service.StudentService;
import com.example.students.shared.Util;
import com.example.students.shared.dto.StudentDto;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private Util util;

    public StudentServiceImpl(StudentRepository studentRepository, Util util) {
        this.studentRepository = studentRepository;
        this.util = util;
    }

    public String getStudent(){
        return "getStudent";
    }

    public StudentDto createStudent(StudentDto studentDetailsIn){

        Optional<StudentEntity> studentDetails = studentRepository.findByStudentId(studentDetailsIn.getStudentId());

        if(studentDetails.isPresent()){
            throw new BadRequestException("Student already exists");
        }

        if (notValid(studentDetailsIn)) {
            throw new BadRequestException("Invalid information, enter all student details!");
        }

        StudentEntity studentEntity = new StudentEntity();
        BeanUtils.copyProperties(studentDetailsIn, studentEntity);

        // id will always be unique so generated studentId will be unique
        String studentId = util.generateHash(String.valueOf(studentDetailsIn.getId()));
        studentEntity.setStudentId(studentId.substring(3));

        StudentEntity studentEntityOut = studentRepository.save(studentEntity);
        StudentDto studentDtoOut = new StudentDto();
        BeanUtils.copyProperties(studentEntityOut, studentDtoOut);

        return studentDtoOut;
    }

    public boolean notValid(StudentDto studentDetails) {
        return studentDetails.getFirstName().isEmpty() || studentDetails.getLastName().isEmpty() ||
                studentDetails.getAge() < 1;
    }

    public String updateStudent(){
        return "updateStudent";
    }

    public String deleteStudent(){
        return "deleteStudent";
    }
}