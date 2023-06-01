package com.example.Exam;

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
public class Exam {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@ManyToOne
	private Subject name;

	@Column(name = "exam_desc")
	private String desc;

	@Column(name = "exam_date")
	private String date;

	@Column(name = "exam_marks")
	private String marks;

	@Column(name = "exam_totalQuestion")
	private String totalQuestion;

	@Column(name = "exam_passMarks")
	private String passMarks;

	@Column(name = "exam_level")
	private String level;

	@Column(name = "exam_time", nullable = false)
	private String time;
	// @OneToMany( mappedBy = "examId" , cascade = CascadeType.REMOVE)
	// private List<Result> result;
}
