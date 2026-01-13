export default function Details({ feedback }: { feedback: Feedback }) {
    if (!feedback) return null;

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-[#0d141b] mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">analytics</span>
                Detailed Analysis
            </h3>

            {feedback.strengths && feedback.strengths.length > 0 && (
                <div className="mb-6">
                    <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                        <span className="material-symbols-outlined text-lg">thumb_up</span>
                        Strengths
                    </h4>
                    <ul className="space-y-2 text-slate-600 text-sm">
                        {feedback.strengths.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0"></span>
                                <span className="leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {feedback.weaknesses && feedback.weaknesses.length > 0 && (
                <div className="mb-6">
                    <h4 className="font-semibold text-red-700 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                        <span className="material-symbols-outlined text-lg">thumb_down</span>
                        Areas for Improvement
                    </h4>
                    <ul className="space-y-2 text-slate-600 text-sm">
                        {feedback.weaknesses.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0"></span>
                                <span className="leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {feedback.details && (
                <div className="pt-4 border-t border-slate-100">
                    <h4 className="font-semibold text-slate-700 mb-2 flex items-center gap-2 text-sm">
                        <span className="material-symbols-outlined text-lg text-slate-400">info</span>
                        Additional Notes
                    </h4>
                    <div className="text-slate-600 whitespace-pre-wrap text-sm leading-relaxed">{feedback.details}</div>
                </div>
            )}
        </div>
    );
}
