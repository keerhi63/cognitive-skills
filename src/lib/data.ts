import { Student, OverviewStats } from "./types";

function randomChoice<T>(arr: T[]): T {
return arr[Math.floor(Math.random() * arr.length)];
}

export function generateStudents(n: number = 200): Student[] {
const first = [
"Alex","Jordan","Taylor","Morgan","Casey","Riley","Avery","Quinn","Blake","Cameron","Drew","Emery","Finley","Hayden","Jamie","Kendall","Lane","Parker","Reese","Sage","Skyler","Tatum","River","Phoenix","Sam","Charlie","Dakota","Emerson","Frankie","Gray","Harper","Indigo","Jules","Kai","Lennox","Marlowe","Noah","Ocean","Peyton","Rowan"
];
const last = [
"Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez","Hernandez","Lopez","Gonzalez","Wilson","Anderson","Thomas","Taylor","Moore","Jackson","Martin","Lee","Perez","Thompson","White","Harris","Sanchez","Clark","Ramirez","Lewis","Robinson","Walker","Young","Allen","King","Wright","Scott","Torres","Nguyen","Hill","Flores"
];

const students: Student[] = [];
for (let i = 1; i <= n; i++) {
const id = `STU${String(i).padStart(3, "0")}`;
const name = `${randomChoice(first)} ${randomChoice(last)}`;
const cls = [9,10,11,12][Math.floor(Math.random()*4)];
const base = Math.min(95, Math.max(20, 70 + (Math.random()-0.5)*30));
const comprehension = Math.min(100, Math.max(20, base + (Math.random()-0.5)*16));
const attention = Math.min(100, Math.max(15, base + (Math.random()-0.5)*20));
const focus = Math.min(100, Math.max(20, attention + (Math.random()-0.5)*12));
const retention = Math.min(100, Math.max(25, comprehension + (Math.random()-0.5)*14));
const engagement_time = Math.min(300, Math.max(30, Math.round(attention*0.8 + (Math.random()-0.5)*30)));
let assessment = comprehension*0.3 + attention*0.25 + focus*0.2 + retention*0.25 + (Math.random()-0.5)*10;
assessment = Math.min(100, Math.max(0, assessment));
let persona = "Balanced Learner";
if (comprehension>80 && attention>80) persona = "High Achiever";
else if (attention<50 && focus<50) persona = "Distracted Learner";
else if (retention>85 && comprehension>75) persona = "Analytical Thinker";
else if (engagement_time>200 && attention>70) persona = "Engaged Explorer";
else if (comprehension<60 && retention<60) persona = "Struggling Student";

students.push({
student_id: id,
name,
class: cls,
comprehension: Math.round(comprehension*10)/10,
attention: Math.round(attention*10)/10,
focus: Math.round(focus*10)/10,
retention: Math.round(retention*10)/10,
assessment_score: Math.round(assessment*10)/10,
engagement_time,
learning_persona: persona
});
}
return students;
}

export function computeOverview(students: Student[]): OverviewStats {
const total = students.length;
const avg = (arr: number[]) => arr.reduce((a,b)=>a+b,0)/Math.max(1, arr.length);
return {
avgAssessment: avg(students.map(s=>s.assessment_score)),
avgComprehension: avg(students.map(s=>s.comprehension)),
avgAttention: avg(students.map(s=>s.attention)),
avgFocus: avg(students.map(s=>s.focus)),
avgRetention: avg(students.map(s=>s.retention)),
totalStudents: total
};
}
