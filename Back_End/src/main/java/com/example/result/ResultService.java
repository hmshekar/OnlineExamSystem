package com.example.result;

import java.util.List;

public interface ResultService {
    Result createResult(Result result);
    Result getResultById(int id);
    List<Result> getResultsByEmail(String email);
    Result updateResult(Result result);
    void deleteResult(int id);
	List<Result> getAllResults();
	List<Result> findByExamId(int id);
	 void deleteResultByExamId(int id);
}

