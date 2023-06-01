package com.example.mcq;

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
public class MCQQuestionController {

    private final MCQQuestionService mcqQuestionService;

    @Autowired
    public MCQQuestionController(MCQQuestionService mcqQuestionService) {
        this.mcqQuestionService = mcqQuestionService;
    }

    @GetMapping("/question")
    public ResponseEntity<List<MCQQuestion>> getAllQuestions() {
        List<MCQQuestion> questions = mcqQuestionService.getAllMCQQuestions();
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @PostMapping("/question")
    public ResponseEntity<MCQQuestion> addNewQuestion(@RequestBody MCQQuestion question) {
        MCQQuestion createdQuestion = mcqQuestionService.createMCQQuestion(question);
        return new ResponseEntity<>(createdQuestion, HttpStatus.CREATED);
    }

    @GetMapping("/exam/{id}/question")
    public ResponseEntity<List<MCQQuestion>> getAllQuestionsForExam(@PathVariable("id") int examId) {
        List<MCQQuestion> questions = mcqQuestionService.getMCQQuestionsByExamId(examId);
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @PutMapping("/question/{id}")
    public ResponseEntity<MCQQuestion> updateQuestion(@PathVariable("id") int id, @RequestBody MCQQuestion question) {
        MCQQuestion existingQuestion = mcqQuestionService.getMCQQuestionById(id);
        if (existingQuestion != null) {
            question.setId(id);
            MCQQuestion updatedQuestion = mcqQuestionService.createMCQQuestion(question);
            return new ResponseEntity<>(updatedQuestion, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/question/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable("id") int id) {
        mcqQuestionService.deleteMCQQuestion(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    @DeleteMapping("/exam/{id}/delete")
    public ResponseEntity<Void>  deleteMcqByExamId(@PathVariable("id") int id){
    	String response=mcqQuestionService.deleteMcqByExamId(id);
    	return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

