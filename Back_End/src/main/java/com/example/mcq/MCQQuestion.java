package com.example.mcq;




import com.example.Exam.Exam;
import com.example.subject.Subject;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MCQQuestion {

	  @Id
	  @GeneratedValue(strategy = GenerationType.IDENTITY)
	  private int id;
	  
	  @Column(name="question_name")
	  private String qname;
	  
	  private String optionOne;
	  private String optionTwo;
	  private String optionThree;
	  private String optionFour;
	  
	  @Column(name="question_answer")
	  private String answer;
	  
	   @ManyToOne
	   private Subject sname;
	   
	   @ManyToOne
//	   @JoinColumn( name = "")
	   private Exam ename;


	   
	   
}
