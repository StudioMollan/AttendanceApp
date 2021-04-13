package com.example.students.controller;

import com.example.students.exception.NotFoundException;
import com.example.students.model.request.StudentDetailsRequestModel;
import com.example.students.model.response.StudentResponseModel;
import com.example.students.service.StudentService;
import com.example.students.shared.dto.StudentDto;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Optional;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("students") // localhost:8080/students
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    @Autowired
    StudentService studentService;

    //CRUD

    @GetMapping("/{studentId}") // READ
    @ResponseStatus(value = HttpStatus.OK)
    public StudentResponseModel getStudent(@PathVariable String studentId){
        StudentResponseModel responseModel = new StudentResponseModel();
        Optional<StudentDto> optionalstudentDto = studentService.getStudentByStudentId(studentId);
        if (optionalstudentDto.isPresent()) {
            StudentDto studentDto = optionalstudentDto.get();
            BeanUtils.copyProperties(studentDto, responseModel);
            return responseModel;
        }
        throw new NotFoundException("No user with id " + studentId);

    @GetMapping // READ
    public String getStudent(){ return studentService.getStudent(); }



    @GetMapping // READ ALL
    public List<StudentResponseModel> getStudents() {
        List<StudentDto> studentDtos = studentService.getStudents();
        ArrayList<StudentResponseModel> responseList = new ArrayList<>();
        for (StudentDto studentDto : studentDtos) {
            StudentResponseModel responseModel = new StudentResponseModel();
            BeanUtils.copyProperties(studentDto, responseModel);
            responseList.add(responseModel);
        }
        return responseList;

    }

    @PostMapping // CREATE
    @ResponseStatus(value = HttpStatus.CREATED)
    public StudentResponseModel createStudent(@RequestBody StudentDetailsRequestModel studentDetailsModel){

        StudentDto studentDtoIn = new StudentDto();
        BeanUtils.copyProperties(studentDetailsModel, studentDtoIn);

        StudentDto studentDtoOut = studentService.createStudent(studentDtoIn);

        StudentResponseModel response = new StudentResponseModel();
        BeanUtils.copyProperties(studentDtoOut, response);
        return response;
    }

    @PutMapping // UPDATE
    public String updateStudent(){
        return studentService.updateStudent();
    }

    @DeleteMapping // DELETE
    public String deleteStudent(){
        return studentService.deleteStudent();
    }

}
