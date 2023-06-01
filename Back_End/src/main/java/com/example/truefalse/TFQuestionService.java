package com.example.truefalse;

import java.util.List;



public interface TFQuestionService {
    TFQuestion getTFQuestionById(int id);
    List<TFQuestion> getAllTFQuestions();
    List<TFQuestion> getTFQuestionsByExamId(int examId);
    TFQuestion createTFQuestion(TFQuestion TFQuestion);
	void deleteTFQuestion(int id);
	void deleteTFQuesionByExamId(int id);
}

