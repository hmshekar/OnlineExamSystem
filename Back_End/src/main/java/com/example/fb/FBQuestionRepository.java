package com.example.fb;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface FBQuestionRepository extends JpaRepository<FBQuestion, Integer> {
	
	public List<FBQuestion> findByEnameId(int id);

}
