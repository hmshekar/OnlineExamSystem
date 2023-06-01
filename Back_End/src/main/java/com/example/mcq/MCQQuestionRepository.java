package com.example.mcq;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;




@Repository
public interface MCQQuestionRepository extends JpaRepository<MCQQuestion, Integer> {
	
	public List<MCQQuestion> findByEnameId(int id);

}
