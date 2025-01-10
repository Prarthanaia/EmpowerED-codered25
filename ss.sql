
    INSERT INTO Assessment (
        id, title, description, subject, grade, duration, totalMarks, teacherId
    ) VALUES (
        lower(hex(randomblob(16))), 'Sample Assessment', 'Sample Description', 'Mathematics', 10, 60, 100, 'TEACHER123'
    );
    

        INSERT INTO Question (
            id, questionText, type, options, correctAnswer, marks, assessmentId, createdAt, updatedAt
        ) VALUES (
            '81f779018eda4b309997e903f55c0c5d', 
            'Empowered Learning
Create MCQ Assessment
Create a multiple choice question paper for your students
Assessment Title
Description
Time Limit (minutes)
Estimated Time
1
h 
0
m
Question 
1
Add Option
Add Question
Cancel
Create Assessment', 
            'MULTIPLE_CHOICE', 
            '[]', 
            'None', 
            0, 
            '1', 
            '2025-01-10 04:10:28.847498', 
            '2025-01-10 04:10:28.847498'
        );
        

        INSERT INTO Question (
            id, questionText, type, options, correctAnswer, marks, assessmentId, createdAt, updatedAt
        ) VALUES (
            '410f6678fc9d4938ac2df9d0aa843f63', 
            'Empowered Learning
Create Theory Assessment
Create a theory paper with descriptive questions
Assessment Title
Description
Time Limit (minutes)
Estimated Time
1
h 
0
m
Question 
1
Question Text
Marks
Expected Answer (Optional)
Add Question
Cancel
Create Assessment', 
            'MULTIPLE_CHOICE', 
            '[]', 
            'None', 
            0, 
            '1', 
            '2025-01-10 04:10:28.847498', 
            '2025-01-10 04:10:28.847498'
        );
        

        INSERT INTO Question (
            id, questionText, type, options, correctAnswer, marks, assessmentId, createdAt, updatedAt
        ) VALUES (
            '76c7da74141a4c1aafa4e34c0fdd3610', 
            'Empowered Learning
Create Hybrid Assessment
Create an assessment with both MCQ and theory questions
Assessment Title
Description
Time Limit (minutes)
Estimated Time
1
h 
0
m
MCQ Questions
Theory Questions
Add MCQ Question
Cancel
Create Assessment', 
            'MULTIPLE_CHOICE', 
            '[]', 
            'None', 
            0, 
            '1', 
            '2025-01-10 04:10:28.847498', 
            '2025-01-10 04:10:28.847498'
        );
        
