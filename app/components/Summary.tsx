export default function Summary({ feedback }: { feedback: Feedback }) {
    if (!feedback?.summary) return null;
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-[#0d141b] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">summarize</span>
                Executive Summary
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm">{feedback.summary}</p>
        </div>
    );
}
