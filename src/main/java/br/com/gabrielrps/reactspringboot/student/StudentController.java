package br.com.gabrielrps.reactspringboot.student;

import br.com.gabrielrps.reactspringboot.exception.ApiRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private PagedResourcesAssembler<Student> assembler;

    @Autowired
    private StudentService studentService;


    @GetMapping
    public ResponseEntity<?> getAllStudentes(@RequestParam(value = "page", defaultValue = "0") int page,
                                         @RequestParam(value = "limit", defaultValue = "10") int limit,
                                         @RequestParam(value = "direction", defaultValue = "asc") String direction){

        Sort sort = Sort.by((direction.equalsIgnoreCase("asc") ? Direction.ASC : Direction.DESC), "firstName");

        Pageable pageable = PageRequest.of(page, limit, sort);

        Page<Student> students = studentService.findAll(pageable);

        students.stream().forEach(student -> student.add(linkTo(methodOn(StudentController.class).getStudent(student.getStudentId())).withSelfRel()));

        return new ResponseEntity<>(assembler.toModel(students), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudent(@PathVariable("id") UUID id){
        Optional<Student> produto = studentService.findById(id);
        if(!produto.isPresent()){
            throw new IllegalStateException("Student não encontrado");
        }
        return new ResponseEntity<Student>(produto.get(), HttpStatus.OK);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<?> getByEmail(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "limit", defaultValue = "10") int limit,
            @RequestParam(value = "direction", defaultValue = "asc") String direction,
            @PathVariable("email") String email){

        Sort sort = Sort.by((direction.equalsIgnoreCase("asc") ? Direction.ASC : Direction.DESC), "firstName");

        Pageable pageable = PageRequest.of(page, limit, sort);
        Page<Student> students = studentService.findByEmail(pageable, email);

        if(students.isEmpty()){
            throw new ApiRequestException("Student not found!!!");
        }

        students.stream().forEach(student -> student.add(linkTo(methodOn(StudentController.class).getStudent(student.getStudentId())).withSelfRel()));

        return new ResponseEntity<>(assembler.toModel(students), HttpStatus.OK);

    }

    @PostMapping
    public void addNewStudent(@RequestBody Student student){
        studentService.save(student);
    }

}
