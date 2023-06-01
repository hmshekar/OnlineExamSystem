package com.example.truefalse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import java.util.List;


@Service
public class TFQuestionServiceImpl implements TFQuestionService {

    private final TFQuestionRepository tfQuestionRepository;

    @Autowired
    public TFQuestionServiceImpl(TFQuestionRepository tfQuestionRepository) {
        this.tfQuestionRepository = tfQuestionRepository;
    }

    @Override
    public TFQuestion getTFQuestionById(int id) {
        return tfQuestionRepository.findById(id).orElse(null);
    }

    @Override
    public List<TFQuestion> getAllTFQuestions() {
        return tfQuestionRepository.findAll();
    }

    @Override
    public List<TFQuestion> getTFQuestionsByExamId(int examId) {
        return tfQuestionRepository.findByEnameId(examId);
    }

    @Override
    public TFQuestion createTFQuestion(TFQuestion TFQuestion) {
        return tfQuestionRepository.save(TFQuestion);
    }

    @Override
    public void deleteTFQuestion(int id) {
        tfQuestionRepository.deleteById(id);
    }

	@Override
	public void deleteTFQuesionByExamId(int id) {
		List<TFQuestion> list=getTFQuestionsByExamId(id);
		if(list!=null) {
			for(TFQuestion question: list) {
				tfQuestionRepository.delete(question);
			}
		}else {
			System.out.println("There are No tf Questions");
		}
		
		
	}
}
