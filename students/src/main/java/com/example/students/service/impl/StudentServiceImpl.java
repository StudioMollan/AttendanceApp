package com.example.students.service.impl;

import com.example.students.repository.StudentRepository;
import com.example.students.repository.entity.StudentEntity;
import com.example.students.service.StudentService;
import com.example.students.shared.dto.StudentDto;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    StudentRepository studentRepository;

    public String getStudent(){
        return "getStudent";
    }

    public StudentDto createStudent(StudentDto userDetailsIn){

        Optional<StudentEntity> checkStudentIdEntity = studentRepository.findByStudentId(userDetailsIn.getStudentId());
        if(checkStudentIdEntity.isPresent()){
            throw new RuntimeException("Student already exists");
        }
        StudentEntity studentEntity = new StudentEntity();
        studentEntity.setEncryptedPassword("testpassword");
        studentEntity.setStudentId("teststudentid");

        BeanUtils.copyProperties(userDetailsIn, studentEntity); // copyProperties förväntar sig getters/setters
        StudentEntity studentEntityOut = studentRepository.save(studentEntity);
        StudentDto studentDtoOut = new StudentDto();
        BeanUtils.copyProperties(studentEntityOut, studentDtoOut);

        return studentDtoOut;
    }

    public String updateStudent(){
        return "updateStudent";
    }

    public String deleteStudent(){
        return "deleteStudent";
    }
}
