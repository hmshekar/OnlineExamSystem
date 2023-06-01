package com.example.result;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface ResultRepository extends JpaRepository<Result, Integer> {

	  public List<Result> findByEmailEmail(String email );
	  public List<Result> findByExamIdId(int examId);
}