package com.example.subject;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SubjectController {

    private final SubjectService subjectService;

    @Autowired
    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @GetMapping("/subject")
    public ResponseEntity<List<Subject>> getAllSubjects() {
        List<Subject> subjects = subjectService.getAllSubjects();
        return new ResponseEntity<>(subjects, HttpStatus.OK);
    }

    @PostMapping("/subject")
    public ResponseEntity<Subject> addNewSubject(@RequestBody Subject subject) {
        Subject createdSubject = subjectService.createSubject(subject);
        return new ResponseEntity<>(createdSubject, HttpStatus.CREATED);
    }

    @DeleteMapping("/subject/{name}")
    public ResponseEntity<String> deleteSubject(@PathVariable("name") String name) {
        subjectService.deleteSubjectByName(name);
        return new ResponseEntity<>(name + " subject deleted", HttpStatus.OK);
    }

    @GetMapping("/subjects/{name}")
    public ResponseEntity<Subject> findBySubject(@PathVariable("name") String name) {
        Subject subject = subjectService.findBySubject(name);
        return new ResponseEntity<>(subject, HttpStatus.OK);
    }
}
