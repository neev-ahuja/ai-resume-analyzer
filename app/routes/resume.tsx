import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";

export const meta = () => ([
    { title: 'Resumind | Review ' },
    { name: 'description', content: 'Detailed overview of your resume' },
])

const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
    }, [isLoading])

    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume:${id}`);

            if (!resume) return;

            const data = JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath);
            if (!resumeBlob) return;

            const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            const imageBlob = await fs.read(data.imagePath);
            if (!imageBlob) return;
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback);
            console.log({ resumeUrl, imageUrl, feedback: data.feedback });
        }

        loadResume();
    }, [id]);

    return (
        <div className="bg-background-light font-display min-h-screen text-[#0d141b]">
            <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        <span className="font-medium text-sm">Back to Dashboard</span>
                    </button>
                    <div className="h-6 w-px bg-slate-200 mx-2"></div>
                    <span className="font-bold text-lg">Resume Review</span>
                </div>
            </header>

            <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
                <section className="flex-1 bg-slate-50 p-6 flex items-center justify-center overflow-auto border-b lg:border-b-0 lg:border-r border-slate-200">
                    {imageUrl && resumeUrl ? (
                        <div className="relative shadow-xl rounded-xl overflow-hidden max-h-full max-w-full border border-slate-200 bg-white">
                            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
                                <img
                                    src={imageUrl}
                                    className="max-h-full w-auto object-contain"
                                    title="View Resume PDF"
                                    alt="Resume Preview"
                                />
                            </a>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-3 text-slate-400 animate-pulse">
                            <span className="material-symbols-outlined text-5xl">description</span>
                            <span className="font-medium">Loading preview...</span>
                        </div>
                    )}
                </section>
                
                <section className="flex-1 overflow-y-auto p-6 lg:p-10 bg-white">
                    <div className="max-w-3xl mx-auto flex flex-col gap-8">
                        <div>
                            <h2 className="text-3xl font-extrabold tracking-tight mb-2">Analysis Results</h2>
                            <p className="text-slate-500">
                                Detailed insights and improvement suggestions for your resume.
                            </p>
                        </div>

                        {feedback ? (
                            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                                <Summary feedback={feedback} />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-4">
                                <span className="material-symbols-outlined text-4xl animate-spin">refresh</span>
                                <p>Analyzing resume...</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    )
}
export default Resume
