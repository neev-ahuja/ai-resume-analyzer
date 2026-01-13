export default function ATS({ score, suggestions }: { score: number; suggestions: ATSTip[] }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-[#0d141b] flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">fact_check</span>
                    ATS Score
                </h3>
                <div className={`text-3xl font-extrabold ${score >= 70 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {score}/100
                </div>
            </div>

            {suggestions?.length > 0 && (
                <div>
                    <h4 className="font-semibold mb-3 text-slate-700 text-sm uppercase tracking-wider">Analysis</h4>
                    <ul className="space-y-3">
                        {suggestions.map((item, index) => (
                            <li key={index} className="flex items-start gap-3 text-slate-600 text-sm">
                                <span className={`material-symbols-outlined text-xl shrink-0 mt-0.5 ${item.type === 'good' ? 'text-green-500' : 'text-orange-500'}`}>
                                    {item.type === 'good' ? 'check_circle' : 'warning'}
                                </span>
                                <span className="leading-relaxed">{item.tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
