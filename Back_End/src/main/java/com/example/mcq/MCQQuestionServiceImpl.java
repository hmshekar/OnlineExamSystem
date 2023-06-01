package com.example.mcq;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class MCQQuestionServiceImpl implements MCQQuestionService {

    private final MCQQuestionRepository mcqQuestionRepository;

    @Autowired
    public MCQQuestionServiceImpl(MCQQuestionRepository mcqQuestionRepository) {
        this.mcqQuestionRepository = mcqQuestionRepository;
    }

    @Override
    public MCQQuestion getMCQQuestionById(int id) {
        return mcqQuestionRepository.findById(id).orElse(null);
    }

    @Override
    public List<MCQQuestion> getAllMCQQuestions() {
        return mcqQuestionRepository.findAll();
    }

    @Override
    public List<MCQQuestion> getMCQQuestionsByExamId(int examId) {
        return mcqQuestionRepository.findByEnameId(examId);
    }

    @Override
    public MCQQuestion createMCQQuestion(MCQQuestion mcqQuestion) {
        return mcqQuestionRepository.save(mcqQuestion);
    }

    @Override
    public void deleteMCQQuestion(int id) {
        mcqQuestionRepository.deleteById(id);
    }

	@Override
	public String deleteMcqByExamId(int id) {
	List<MCQQuestion> list=getMCQQuestionsByExamId(id);
		if(list!=null) {
			for(MCQQuestion question: list) {
				mcqQuestionRepository.delete(question);
			}
		}else {
			return "AllMcqDeleted";
		}
		return "AllMcqDeleted";
	}
    
    
}

