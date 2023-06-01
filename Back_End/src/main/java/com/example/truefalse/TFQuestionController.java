package com.example.truefalse;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TFQuestionController {

    private final TFQuestionService tfQuestionService;

    @Autowired
    public TFQuestionController(TFQuestionService tfQuestionService) {
        this.tfQuestionService = tfQuestionService;
    }

    @GetMapping("/tf-question")
    public ResponseEntity<List<TFQuestion>> getAllQuestions() {
        List<TFQuestion> questions = tfQuestionService.getAllTFQuestions();
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @PostMapping("/tf-question")
    public ResponseEntity<TFQuestion> addNewQuestion(@RequestBody TFQuestion question) {
        TFQuestion createdQuestion = tfQuestionService.createTFQuestion(question);
        return new ResponseEntity<>(createdQuestion, HttpStatus.CREATED);
    }

    @GetMapping("/exam-tf/{id}/question")
    public ResponseEntity<List<TFQuestion>> getAllQuestionsForExam(@PathVariable("id") int examId) {
        List<TFQuestion> questions = tfQuestionService.getTFQuestionsByExamId(examId);
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @PutMapping("/tf-question/{id}")
    public ResponseEntity<TFQuestion> updateQuestion(@PathVariable("id") int id, @RequestBody TFQuestion question) {
        TFQuestion existingQuestion = tfQuestionService.getTFQuestionById(id);
        if (existingQuestion != null) {
            question.setId(id);
            TFQuestion updatedQuestion = tfQuestionService.createTFQuestion(question);
            return new ResponseEntity<>(updatedQuestion, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/tf-question/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable("id") int id) {
        tfQuestionService.deleteTFQuestion(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    @DeleteMapping("/exam-tf/{id}/delete")
    public ResponseEntity<Void> deleteTFQuesionByExamId(@PathVariable("id") int id){
    	tfQuestionService.deleteTFQuesionByExamId(id);
    	return new ResponseEntity<>(HttpStatus.OK);
    }
}

