package com.example.students.repository;

import com.example.students.repository.entity.StudentEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends CrudRepository<StudentEntity, Long> {

    Optional<StudentEntity> findByStudentId(String studentId);
    Long deleteByStudentId(String studentId);

}
