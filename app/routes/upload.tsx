import { useState, useEffect, type FormEvent } from "react";
import { useNavigate, Link } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";


export const meta = () => (
    [
        { title: 'Upload Resume' },
        { name: 'description', content: 'Upload your resume to analyze' },
    ]
)


export default function Upload() {
    const navigate = useNavigate();
    const { auth, isLoading, ai, kv, fs } = usePuterStore();
    const [user, setUser] = useState<any>(null);

    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');

    const [companyName, setCompanyName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            if (!auth.isAuthenticated) {
                navigate("/login?next=/upload")
            } else {
                setUser(auth.getUser())
            }
        }
    }, [isLoading, auth.isAuthenticated]);


    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File }) => {
        setIsProcessing(true);

        setStatusText('Uploading the file...');
        const uploadedFile = await fs.upload([file]);
        if (!uploadedFile) return setStatusText('Error: Failed to upload file');

        setStatusText('Converting to image...');
        const imageFile = await convertPdfToImage(file);
        if (!imageFile.file) return setStatusText('Error: Failed to convert PDF to image');

        setStatusText('Uploading the image...');
        const uploadedImage = await fs.upload([imageFile.file]);
        if (!uploadedImage) return setStatusText('Error: Failed to upload image');

        console.log(uploadedImage)

        setStatusText('Preparing data...');
        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }
        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText('Analyzing...');

        try {

            const feedback = await ai.feedback(
                uploadedImage.path,
                prepareInstructions({ jobTitle, jobDescription })
            )
            if (!feedback) return setStatusText('Error: Failed to analyze resume');

            const feedbackText = typeof feedback.message.content === 'string'
                ? feedback.message.content
                : feedback.message.content[0].text;

            data.feedback = JSON.parse(feedbackText);

        } catch (error) {
            console.error(error);
            setStatusText('Failed to analyze resume');
        }
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        setStatusText('Analysis complete, redirecting...');
        console.log(data);
        navigate(`/resume/${uuid}`);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    return (
        <div className="bg-background-light text-[#0d141b] font-display transition-colors duration-200 h-screen overflow-hidden flex">
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors"
                        >
                            <span className="material-symbols-outlined">arrow_back</span>
                            <span className="font-medium text-sm">Back to Dashboard</span>
                        </button>
                    </div>
                </header>
                <div className="flex-1 overflow-y-auto bg-background-light p-6 lg:p-10 scroll-smooth">
                    <div className="max-w-4xl mx-auto flex flex-col gap-8">

                        <div className="flex flex-col gap-2">
                            <h1 className="text-[#0d141b] text-3xl md:text-4xl font-extrabold leading-tight tracking-[-0.033em]">
                                Upload New Resume
                            </h1>
                            <p className="text-slate-500 text-base font-normal leading-normal max-w-2xl">
                                Fill in the job details and upload your resume to generate a tailored analysis.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-[#0d141b]">Company Name</label>
                                    <input
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        disabled={isProcessing}
                                        className="h-11 rounded-lg border border-slate-200 bg-white px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="e.g. Google, Amazon, Microsoft"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-[#0d141b]">Job Title</label>
                                    <input
                                        value={jobTitle}
                                        onChange={(e) => setJobTitle(e.target.value)}
                                        disabled={isProcessing}
                                        className="h-11 rounded-lg border border-slate-200 bg-white px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="e.g. Senior Software Engineer"
                                    />
                                </div>

                                <div className="flex flex-col gap-2 flex-1">
                                    <label className="text-sm font-bold text-[#0d141b]">Job Description</label>
                                    <textarea
                                        value={jobDescription}
                                        onChange={(e) => setJobDescription(e.target.value)}
                                        disabled={isProcessing}
                                        className="flex-1 min-h-[200px] rounded-lg border border-slate-200 bg-white p-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="Paste the full job description here..."
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-6">
                                <label className="text-sm font-bold text-[#0d141b]">Resume File</label>
                                <div
                                    onDragOver={!isProcessing ? handleDragOver : undefined}
                                    onDragLeave={!isProcessing ? handleDragLeave : undefined}
                                    onDrop={!isProcessing ? handleDrop : undefined}
                                    className={`
                            flex-1 min-h-[300px] rounded-xl border-2 border-dashed transition-all cursor-pointer group flex flex-col items-center justify-center text-center gap-4 p-8
                            ${isDragOver
                                            ? 'border-primary bg-primary/5'
                                            : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-primary/50'
                                        }
                            ${isProcessing ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
                                `}
                                    onClick={() => !isProcessing && document.getElementById('file-upload')?.click()}
                                >
                                    <input
                                        type="file"
                                        id="file-upload"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        accept=".pdf"
                                        disabled={isProcessing}
                                    />

                                    {file ? (
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="size-16 rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-2">
                                                <span className="material-symbols-outlined text-4xl">check_circle</span>
                                            </div>
                                            <h3 className="text-[#0d141b] text-lg font-bold">{file.name}</h3>
                                            <p className="text-slate-500 text-sm">
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                            {!isProcessing && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setFile(null);
                                                    }}
                                                    className="mt-2 text-sm text-red-500 hover:text-red-600 font-medium"
                                                >
                                                    Remove file
                                                </button>
                                            )}
                                        </div>
                                    ) : (
                                        <>
                                            <div className="size-16 rounded-full bg-blue-50 flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform">
                                                <span className="material-symbols-outlined text-4xl">cloud_upload</span>
                                            </div>
                                            <div className="flex flex-col gap-2 max-w-xs">
                                                <h3 className="text-[#0d141b] text-lg font-bold">
                                                    Click or Drag to Upload
                                                </h3>
                                                <p className="text-slate-500 text-sm">
                                                    Supported formats: PDF
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={!file || !companyName || !jobTitle || isProcessing}
                                    className="w-full h-12 rounded-lg bg-primary text-white font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all flex items-center justify-center gap-2"
                                >
                                    {isProcessing ? (
                                        <>
                                            <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                            <span>{statusText || 'Processing...'}</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Analyze Resume</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </main>
        </div>
    );
}
