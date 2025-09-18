import { Student, OverviewStats } from "@/lib/types";

export default function Insights({ stats, data }: { stats: OverviewStats; data: Student[] }) {
// Simple heuristic insights
const topPersona = (()=>{
const counts: Record<string, number> = {};
for (const s of data) counts[s.learning_persona] = (counts[s.learning_persona]||0)+1;
return Object.entries(counts).sort((a,b)=>b[1]-a[1])[0]?.[0] ?? "Balanced Learner";
})();

// Calculate additional insights
const highPerformers = data.filter(s => s.assessment_score >= 80).length;
const lowPerformers = data.filter(s => s.assessment_score < 60).length;
const avgEngagement = data.reduce((sum, s) => sum + s.engagement_time, 0) / data.length;

return (
<div className="space-y-6">
  {/* Key Findings Header */}
  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg">
    <h4 className="text-lg font-bold flex items-center mb-2">
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
      Key Findings & Analytics Insights
    </h4>
    <p className="text-blue-100 text-sm">Critical insights from student performance data</p>
  </div>

  {/* Key Metrics Cards */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-green-600 mb-1">High Performers</p>
          <p className="text-2xl font-bold text-green-700">{highPerformers}</p>
          <p className="text-xs text-green-600">Students (≥80%)</p>
        </div>
        <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
    </div>
    
    <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-red-600 mb-1">Need Support</p>
          <p className="text-2xl font-bold text-red-700">{lowPerformers}</p>
          <p className="text-xs text-red-600">Students (&lt;60%)</p>
        </div>
        <div className="w-10 h-10 bg-red-200 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
      </div>
    </div>
    
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600 mb-1">Avg Engagement</p>
          <p className="text-2xl font-bold text-blue-700">{avgEngagement.toFixed(0)}</p>
          <p className="text-xs text-blue-600">Minutes</p>
        </div>
        <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
    </div>
  </div>

  {/* Detailed Insights */}
  <div className="bg-white border border-gray-200 rounded-lg p-6">
    <h5 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
      <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Strategic Insights
    </h5>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-blue-600">Performance Analysis:</span> Average assessment score is <span className="font-bold text-blue-700">{stats.avgAssessment.toFixed(1)}</span>. Comprehension and retention are strong performance levers.
          </p>
        </div>
        <div className="flex items-start space-x-3">
          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-green-600">Learning Patterns:</span> Most common learning persona is <span className="font-bold text-green-700">{topPersona}</span>, indicating dominant learning preferences.
          </p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-yellow-600">Attention Correlation:</span> Attention levels show a visible relationship with performance outcomes (see scatter plot analysis).
          </p>
        </div>
        <div className="flex items-start space-x-3">
          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-purple-600">Individual Profiling:</span> Use radar charts to profile individual students for targeted support and intervention strategies.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
);
}
