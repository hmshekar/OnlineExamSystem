package com.example.subject;

import java.util.List;

public interface SubjectService {
    Subject getSubjectByName(String name);
    List<Subject> getAllSubjects();
    Subject createSubject(Subject subject);
    void deleteSubjectByName(String name);
    public Subject findBySubject(String name);
}
