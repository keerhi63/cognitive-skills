export type Student = {
student_id: string;
name: string;
class: number;
comprehension: number;
attention: number;
focus: number;
retention: number;
assessment_score: number;
engagement_time: number;
learning_persona: string;
};

export type OverviewStats = {
avgAssessment: number;
avgComprehension: number;
avgAttention: number;
avgFocus: number;
avgRetention: number;
totalStudents: number;
};
