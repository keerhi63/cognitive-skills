"use client";
import { Student } from "@/lib/types";
import {
BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,
ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";

export function BarSkillVsScore({ data }: { data: Student[] }) {
// Average score per persona (as a simple bar example)
const groups: Record<string, { name: string; scoreSum: number; count: number }> = {};
for (const s of data) {
if (!groups[s.learning_persona]) groups[s.learning_persona] = { name: s.learning_persona, scoreSum: 0, count: 0 };
groups[s.learning_persona].scoreSum += s.assessment_score;
groups[s.learning_persona].count += 1;
}
const bars = Object.values(groups).map(g => ({ label: g.name, score: g.scoreSum / g.count }));
return (
<div className="w-full h-64">
<ResponsiveContainer>
<BarChart data={bars}>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="label" tick={{ fontSize: 12 }} interval={0} angle={-10} height={60} />
<YAxis domain={[0, 100]} />
<Tooltip />
<Bar dataKey="score" fill="#60a5fa" />
</BarChart>
</ResponsiveContainer>
</div>
);
}

export function ScatterAttentionVsPerformance({ data }: { data: Student[] }) {
const points = data.map(s => ({ attention: s.attention, score: s.assessment_score }));
return (
<div className="w-full h-64">
<ResponsiveContainer>
<ScatterChart>
<CartesianGrid />
<XAxis type="number" dataKey="attention" name="Attention" domain={[0, 100]} />
<YAxis type="number" dataKey="score" name="Score" domain={[0, 100]} />
<Tooltip cursor={{ strokeDasharray: "3 3" }} />
<Scatter data={points} fill="#34d399" />
</ScatterChart>
</ResponsiveContainer>
</div>
);
}

export function RadarStudentProfile({ student }: { student: Student }) {
// Ensure we have valid data using the format that works with Recharts
const radarData = [
{ 
  subject: "Comprehension", 
  score: Number(student.comprehension) || 0, 
  fullMark: 100 
},
{ 
  subject: "Attention", 
  score: Number(student.attention) || 0, 
  fullMark: 100 
},
{ 
  subject: "Focus", 
  score: Number(student.focus) || 0, 
  fullMark: 100 
},
{ 
  subject: "Retention", 
  score: Number(student.retention) || 0, 
  fullMark: 100 
},
];

// Data is ready for rendering

return (
<div className="w-full h-80 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
<div className="text-center mb-4">
<h4 className="text-lg font-semibold text-purple-800 mb-1">Cognitive Skills Profile</h4>
<p className="text-sm text-purple-600">{student.name}</p>
</div>
<ResponsiveContainer width="100%" height="85%">
<RadarChart data={radarData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
<PolarGrid stroke="#e5e7eb" />
<PolarAngleAxis 
  dataKey="subject" 
  tick={{ fontSize: 12, fill: '#6b7280' }}
  axisLine={{ stroke: '#d1d5db' }}
/>
<PolarRadiusAxis 
  domain={[0, 100]} 
  tick={{ fontSize: 10, fill: '#9ca3af' }}
  axisLine={{ stroke: '#d1d5db' }}
/>
<Radar 
  name={student.name} 
  dataKey="score" 
  stroke="#8b5cf6" 
  fill="#8b5cf6" 
  fillOpacity={0.3}
  strokeWidth={3}
  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
/>
</RadarChart>
</ResponsiveContainer>
</div>
);
}

