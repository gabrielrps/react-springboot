package br.com.gabrielrps.reactspringboot.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public List<Student> getAllStudents(){
        return studentRepository.findAll();
    }


    public Optional<Student> findById(UUID id) {
        return studentRepository.findById(id);
    }

    public Page<Student> findAll(Pageable pageable) {
        return studentRepository.findAll(pageable);
    }

    public void save(Student student) {
        student.setStudentId(UUID.randomUUID());
        studentRepository.save(student);
    }


    public Page<Student> findByEmail(Pageable pageable, String email) {
        return studentRepository.findByEmail(pageable, email);
    }
}
