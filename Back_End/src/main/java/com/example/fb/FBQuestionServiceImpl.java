package com.example.fb;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class FBQuestionServiceImpl implements FBQuestionService {

    private final FBQuestionRepository fbQuestionRepository;

    @Autowired
    public FBQuestionServiceImpl(FBQuestionRepository fbQuestionRepository) {
        this.fbQuestionRepository = fbQuestionRepository;
    }

    @Override
    public FBQuestion getFBQuestionById(int id) {
        return fbQuestionRepository.findById(id).orElse(null);
    }

    @Override
    public List<FBQuestion> getAllFBQuestions() {
        return fbQuestionRepository.findAll();
    }

    @Override
    public List<FBQuestion> getFBQuestionsByExamId(int examId) {
        return fbQuestionRepository.findByEnameId(examId);
    }

    @Override
    public FBQuestion createFBQuestion(FBQuestion fbQuestion) {
        return fbQuestionRepository.save(fbQuestion);
    }

    @Override
    public void deleteFBQuestion(int id) {
        fbQuestionRepository.deleteById(id);
    }

	@Override
	public String deleteFbByExamId(int id) {
	List<FBQuestion> list=getFBQuestionsByExamId(id);
		if(list!=null) {
			for(FBQuestion question: list) {
				fbQuestionRepository.delete(question);
			}
		}else {
			return "AllFbDeleted";
		}
		return "AllFbDeleted";
	}
    
    
}
