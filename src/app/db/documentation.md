
DB Architecture

Companies                                    / name website category
- Managers       / companyId                 / name&surname email avatar
- - Interviews   / managerId                 / title description deadline status 
- - - Questions  / interviewId               / description answerType timerSeconds
- - - Candidates / interviewId               / name&surname email avatar
- - - - Answers  / candidateId & interviewId / data
- - - - - Audio  / answerId                  / url


- User (name&surname email avatar) 
- - Manager (companyId)
- - Candidate (interviewId)
