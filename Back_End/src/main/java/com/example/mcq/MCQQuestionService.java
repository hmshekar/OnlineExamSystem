package com.example.mcq;

import java.util.List;

public interface MCQQuestionService {
    MCQQuestion getMCQQuestionById(int id);
    List<MCQQuestion> getAllMCQQuestions();
    List<MCQQuestion> getMCQQuestionsByExamId(int examId);
    MCQQuestion createMCQQuestion(MCQQuestion mcqQuestion);
	void deleteMCQQuestion(int id);
	String deleteMcqByExamId(int id);
}
