package com.example.truefalse;




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
public class TFQuestion {

	  @Id
	  @GeneratedValue(strategy = GenerationType.IDENTITY)
	  private int id;
	  
	  @Column(name="question_name")
	  private String qname;
	  
	  private String optionOne;
	  private String optionTwo;
	
	  
	  @Column(name="question_answer")
	  private String answer;
	  
	   @ManyToOne
	   private Subject sname;
	   
	   @ManyToOne
	   private Exam ename;
   
	   
}
