package com.example.fb;

import java.util.List;



public interface FBQuestionService {
    FBQuestion getFBQuestionById(int id);
    List<FBQuestion> getAllFBQuestions();
    List<FBQuestion> getFBQuestionsByExamId(int examId);
    FBQuestion createFBQuestion(FBQuestion fbQuestion);
	void deleteFBQuestion(int id);
	String deleteFbByExamId(int id);
}