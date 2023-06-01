package com.example.truefalse;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface TFQuestionRepository extends JpaRepository<TFQuestion, Integer> {
	public List<TFQuestion> findByEnameId(int id);
}
