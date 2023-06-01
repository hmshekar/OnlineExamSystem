package com.example.result;

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
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ResultController {

    private final ResultService resultService;

    @Autowired
    public ResultController(ResultService resultService) {
        this.resultService = resultService;
    }

    @GetMapping("/result")
    public ResponseEntity<List<Result>> getAllResults() {
        List<Result> results = resultService.getAllResults();
        return new ResponseEntity<>(results, HttpStatus.OK);
    }

    @GetMapping("/exam/{id}/result")
    public ResponseEntity<List<Result>> getAllResultsByExamId(@PathVariable("id") int id) {
        List<Result> results = resultService.findByExamId(id);
        return new ResponseEntity<>(results, HttpStatus.OK);
    }

    @PostMapping("/result")
    public ResponseEntity<Result> addNewResult(@RequestBody Result result) {
        Result createdResult = resultService.createResult(result);
        return new ResponseEntity<>(createdResult, HttpStatus.CREATED);
    }

    @GetMapping("/user/{email}/result")
    public ResponseEntity<List<Result>> getAllResultsForStudent(@PathVariable("email") String email) {
        List<Result> results = resultService.getResultsByEmail(email);
        return new ResponseEntity<>(results, HttpStatus.OK);
    }

    @PutMapping("/result")
    public ResponseEntity<Result> updateResult(@RequestBody Result result) {
        Result updatedResult = resultService.updateResult(result);
        return new ResponseEntity<>(updatedResult, HttpStatus.OK);
    }

    @DeleteMapping("/result/{id}")
    public ResponseEntity<Void> deleteResult(@PathVariable("id") int id) {
        resultService.deleteResult(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    @DeleteMapping("/result/{id}/delete")
    public ResponseEntity<Void> deleteResultByExamId(@PathVariable("id") int id) {
    	resultService.deleteResultByExamId(id);
    	return new ResponseEntity<>(HttpStatus.OK);
    }
}

