package com.example.result;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.example.Exam.Exam;
import com.example.subject.Subject;
import com.example.user.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Result {
 
	   @Id
	   @GeneratedValue(strategy = GenerationType.IDENTITY)
	   private int id;
	   
	   @Column(name="result_status")
	   private String status;
	   
	   @Column(name="result_score")
	   private String score;
	   
	   @Column(name="exam_date")
	   private String edate;
	   
	   @Column(name="total_marks")
	   private String totalMarks;
	   
	   @Column(name="total_question")
	   private String totalQuestion;
	   
	
	   @ManyToOne
	   @JoinColumn(name= "subject_name")
	   private Subject sname;
	   
	   @ManyToOne
	   @JoinColumn(name= "user_email")
	   private User email;
	   
	   @ManyToOne
	   @JoinColumn(name= "exam_id",nullable=true ) 
	   private Exam examId;

}
