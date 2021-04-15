package com.example.students.controller;

import com.example.students.exception.NotFoundException;
import com.example.students.model.request.StudentDetailsRequestModel;
import com.example.students.model.response.StudentResponseModel;
import com.example.students.service.StudentService;
import com.example.students.shared.dto.StudentDto;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


import java.util.Optional;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("students")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    @Autowired
    StudentService studentService;

    @GetMapping("/{studentId}")
    public StudentResponseModel getStudent(@PathVariable String studentId) {
        StudentResponseModel responseModel = new StudentResponseModel();
        Optional<StudentDto> optionalstudentDto = studentService.getStudent(studentId);
        if (optionalstudentDto.isPresent()) {
            StudentDto studentDto = optionalstudentDto.get();
            BeanUtils.copyProperties(studentDto, responseModel);
            return responseModel;
        }
        throw new NotFoundException("No user with id " + studentId);
    }

    @GetMapping
    public List<StudentResponseModel> getAllStudents() {
        List<StudentDto> studentDtos = studentService.getAllStudents();
        ArrayList<StudentResponseModel> responseList = new ArrayList<>();
        for (StudentDto studentDto : studentDtos) {
            StudentResponseModel responseModel = new StudentResponseModel();
            BeanUtils.copyProperties(studentDto, responseModel);
            responseList.add(responseModel);
        }
        return responseList;
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public StudentResponseModel createStudent(@RequestBody StudentDetailsRequestModel studentDetailsModel){

        StudentDto studentDtoIn = new StudentDto();
        BeanUtils.copyProperties(studentDetailsModel, studentDtoIn);

        StudentDto studentDtoOut = studentService.createStudent(studentDtoIn);

        StudentResponseModel response = new StudentResponseModel();
        BeanUtils.copyProperties(studentDtoOut, response);
        return response;
    }

    @PutMapping("/{studentId}")
    public StudentResponseModel updateStudent(@PathVariable String studentId, @RequestBody StudentDetailsRequestModel requestData){

        StudentDto studentDtoIn = new StudentDto();
        BeanUtils.copyProperties(requestData, studentDtoIn);

        Optional<StudentDto> studentDtoOut = studentService.updateStudent(studentId, studentDtoIn);
        if (studentDtoOut.isEmpty()){
            throw new RuntimeException("Not found");
        }
            StudentDto studentDto = studentDtoOut.get();
            StudentResponseModel responseModel = new StudentResponseModel();
            BeanUtils.copyProperties(studentDto, responseModel);
            return responseModel;
    }

    @DeleteMapping("/{studentId}")
    public String deleteStudent(@PathVariable String studentId) {

        StudentResponseModel responseModel = new StudentResponseModel();
        boolean deleted = studentService.deleteStudent(studentId);
        if (deleted) {
           return "";
        }
        throw new NotFoundException("No user with id " + studentId);
    }

}
