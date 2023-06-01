package com.example.fb;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FBQuestionController {

    private final FBQuestionService fbQuestionService;

    @Autowired
    public FBQuestionController(FBQuestionService fbQuestionService) {
        this.fbQuestionService = fbQuestionService;
    }

    @GetMapping("/fb-question")
    public ResponseEntity<List<FBQuestion>> getAllQuestions() {
        List<FBQuestion> questions = fbQuestionService.getAllFBQuestions();
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @PostMapping("/fb-question")
    public ResponseEntity<FBQuestion> addNewQuestion(@RequestBody FBQuestion question) {
        FBQuestion createdQuestion = fbQuestionService.createFBQuestion(question);
        return new ResponseEntity<>(createdQuestion, HttpStatus.CREATED);
    }

    @GetMapping("/exam-fb/{id}/question")
    public ResponseEntity<List<FBQuestion>> getAllQuestionsForExam(@PathVariable("id") int examId) {
        List<FBQuestion> questions = fbQuestionService.getFBQuestionsByExamId(examId);
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @PutMapping("/fb-question/{id}")
    public ResponseEntity<FBQuestion> updateQuestion(@PathVariable("id") int id, @RequestBody FBQuestion question) {
        FBQuestion existingQuestion = fbQuestionService.getFBQuestionById(id);
        if (existingQuestion != null) {
            question.setId(id);
            FBQuestion updatedQuestion = fbQuestionService.createFBQuestion(question);
            return new ResponseEntity<>(updatedQuestion, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/fb-question/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable("id") int id) {
        fbQuestionService.deleteFBQuestion(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/exam-fb/{id}/delete")
    public ResponseEntity<String> deleteMcqByExamId(@PathVariable("id") int id) {
        String response = fbQuestionService.deleteFbByExamId(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}