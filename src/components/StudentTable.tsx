"use client";
import { Student } from "@/lib/types";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

export default function StudentTable({ data }: { data: Student[] }) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<keyof Student>("assessment_score");
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    let rows = data.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.student_id.toLowerCase().includes(q) ||
        String(s.class).includes(q) ||
        s.learning_persona.toLowerCase().includes(q)
    );
    rows = rows.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];

      let result = 0;
      if (typeof av === "number" && typeof bv === "number") {
        result = av - bv;
      } else {
        result = String(av).localeCompare(String(bv), undefined, { sensitivity: "base" });
      }

      return sortAsc ? result : -result;
    });
    return rows;
  }, [data, query, sortKey, sortAsc]);

  function setSort(key: keyof Student) {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  return (
    <div className="w-full">
      {/* Enhanced Search Bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search students by name, ID, class, or persona..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
          />
        </div>
        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-lg">
          {filtered.length} of {data.length} students
        </div>
      </div>

      {/* Enhanced Table */}
      <div className="overflow-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-[1000px] w-full text-sm">
          <thead className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
            <tr>
              {[
                "student_id",
                "name",
                "class",
                "comprehension",
                "attention",
                "focus",
                "retention",
                "assessment_score",
                "engagement_time",
                "learning_persona",
              ].map((k) => (
                <th
                  key={k}
                  className="text-left px-4 py-4 font-semibold whitespace-nowrap select-none hover:bg-emerald-700 transition-colors cursor-pointer border-b border-emerald-500"
                  onClick={() => setSort(k as keyof Student)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{k.replace("_", " ").toUpperCase()}</span>
                    {sortKey === k && (
                      <svg className={`w-3 h-3 transition-transform ${sortAsc ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, idx) => (
              <tr
                key={s.student_id}
                className={`hover:bg-gray-50 transition-colors duration-150 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-25"
                }`}
              >
                <td className="px-4 py-3 border-b border-gray-100 font-medium text-indigo-600">{s.student_id}</td>
                <td className="px-4 py-3 border-b border-gray-100 font-medium text-gray-800">{s.name}</td>
                <td className="px-4 py-3 border-b border-gray-100">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Grade {s.class}
                  </span>
                </td>
                <td className="px-4 py-3 border-b border-gray-100 text-center">
                  <span className="text-sm font-medium text-gray-700">{s.comprehension}</span>
                </td>
                <td className="px-4 py-3 border-b border-gray-100 text-center">
                  <span className="text-sm font-medium text-gray-700">{s.attention}</span>
                </td>
                <td className="px-4 py-3 border-b border-gray-100 text-center">
                  <span className="text-sm font-medium text-gray-700">{s.focus}</span>
                </td>
                <td className="px-4 py-3 border-b border-gray-100 text-center">
                  <span className="text-sm font-medium text-gray-700">{s.retention}</span>
                </td>
                <td className="px-4 py-3 border-b border-gray-100">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    s.assessment_score >= 80 ? 'bg-green-100 text-green-800' :
                    s.assessment_score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {s.assessment_score}%
                  </span>
                </td>
                <td className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {s.engagement_time}m
                  </div>
                </td>
                <td className="px-4 py-3 border-b border-gray-100">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    s.learning_persona === 'Visual Learner' ? 'bg-blue-100 text-blue-800' :
                    s.learning_persona === 'Auditory Learner' ? 'bg-green-100 text-green-800' :
                    s.learning_persona === 'Kinesthetic Learner' ? 'bg-purple-100 text-purple-800' :
                    s.learning_persona === 'Reading/Writing Learner' ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {s.learning_persona}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
