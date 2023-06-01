package com.example.Exam;
import java.util.List;

public interface ExamService {
    Exam createExam(Exam exam);
    Exam getExamById(int id);
    List<Exam> getAllExams();
    Exam updateExam(Exam exam);
    void deleteExam(int id);
    // Add other necessary methods for your business logic
}
