package com.example.result;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResultServiceImpl implements ResultService {
    private final ResultRepository resultRepository;

    @Autowired
    public ResultServiceImpl(ResultRepository resultRepository) {
        this.resultRepository = resultRepository;
    }

    @Override
    public Result createResult(Result result) {
        return resultRepository.save(result);
    }

    @Override
    public Result getResultById(int id) {
        return resultRepository.findById(id).orElse(null);
    }

    @Override
    public List<Result> getResultsByEmail(String email) {
        return resultRepository.findByEmailEmail(email);
    }

    @Override
    public Result updateResult(Result result) {
        return resultRepository.save(result);
    }

    @Override
    public void deleteResult(int id) {
        resultRepository.deleteById(id);
    }

    @Override
    public List<Result> getAllResults() {
        return resultRepository.findAll();
    }

    @Override
    public List<Result> findByExamId(int id) {
        return resultRepository.findByExamIdId(id);
    }
    
    @Override
    public void deleteResultByExamId(int id) {
    	List<Result> results = findByExamId(id);
    	if(results!=null) {
    		for(Result result : results) {
    			resultRepository.delete(result);
    		}
    	}else {
    		System.out.println("All the tf Question are deleted");
    	}
    }
}

