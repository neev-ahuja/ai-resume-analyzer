import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";


export const meta = () => (
  [
    { title: 'Home' },
    { name: 'description', content: 'Resume Analyzer' },
  ]
)

export default function Home() {

  const { auth, isLoading, kv, fs } = usePuterStore();
  const navigate = useNavigate();

  const [user, setUser] = useState<PuterUser | null>(null);

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!auth.isAuthenticated) {
        navigate("/login?next=/")
      } else {
        setUser(auth.getUser())
      }
    }
  }, [isLoading, auth.isAuthenticated])


  useEffect(() => {
    const fetchResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = resumes?.map((resume) => (
        JSON.parse(resume.value) as Resume
      ))
      setResumes(parsedResumes || []);

      setLoadingResumes(false);
    };

    fetchResumes();
  }, [])

  const handleDownload = async (path: string) => {
    const content = await fs.read(path);

    if (!content) return console.log("Content not found");

    const url = URL.createObjectURL(content);

    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.pdf";
    a.click();

    URL.revokeObjectURL(url);
  }


  return (
    <div className="bg-background-light  text-[#0d141b]  font-display transition-colors duration-200 h-screen overflow-hidden flex">
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-16 bg-white  border-b border-slate-200  px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-sm text-slate-500 ">
            <span>Dashboard</span>
            <span className="material-symbols-outlined text-base">
              chevron_right
            </span>
            <span className="font-medium text-[#0d141b] ">
              My Resumes
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 ">
              <div className="flex-col items-end hidden md:flex">
                <span className="text-sm font-bold text-[#0d141b] ">
                  {user?.username}
                </span>
              </div>
              <div className="relative">
                <div
                  className="size-9 rounded-full bg-cover bg-center border-2 border-white  shadow-sm cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-primary/20 transition-all"
                  data-alt="User profile picture"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuABp9GAqq9Gqc9q4ontG9PmrYtZhhLkLNh7xcZ1SEtzM3fqMunyFilLDpV1ThaSpSYGv0ZG7n7Sj6LSxmPWFoCRtX8nRKDC1_EXxLCFy22lwECuIMkAoH7qqO6FYYmPGLm375N6OI-fJonZrBy63J-tmo8XWKFdpqQuCtkg2AvDnIqIJ3kDpF1OA4304XC_JddEseOCkvutvS8SdDDFCcSVXpASEUUmYoZJrC1RgXDyDXUGRs9B1lKButjE_XzGqTiXaR-8YyGgQIDW")',
                  }}
                ></div>

                {showProfileMenu && (
                  <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-slate-100 md:hidden">
                      <p className="text-sm font-bold text-[#0d141b] truncate">{user?.username || 'User'}</p>
                    </div>
                    <button
                      onClick={() => auth.signOut()}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-lg">logout</span>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto bg-background-light  p-6 lg:p-10 scroll-smooth">
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-[#0d141b]  text-3xl md:text-4xl font-extrabold leading-tight tracking-[-0.033em]">
                  My Resumes
                </h1>
                <p className="text-slate-500  text-base font-normal leading-normal max-w-2xl">
                  Manage and optimize your CVs for better job matching with our AI
                  analysis tools.
                </p>
              </div>
              <button
                onClick={() => navigate('/upload')}
                className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg h-11 px-6 bg-primary text-white text-sm font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:shadow-blue-500/40 transition-all">
                <span className="material-symbols-outlined text-[20px]">
                  add
                </span>
                <span className="truncate">Upload New Resume</span>
              </button>
            </div>
            {
              loadingResumes ? (
                <div className="text-center animate-pulse">
                  Loading...
                </div>
              ) : (resumes.length == 0 ? (
                <div className="text-center font-bold text-2xl text-gray-600 mt-[10vw]">
                  No Resumes Found
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                  {
                    resumes.map((resume, index) => {
                      return (
                        <div key={resume.id} className="group bg-white  rounded-xl border border-slate-200  p-5 flex flex-col gap-4 hover:shadow-xl hover:shadow-slate-200/50   transition-all">
                          <div className="flex justify-between items-start">
                            <div className="size-12 rounded-lg bg-red-50  flex items-center justify-center text-red-600 ">
                              <span className="material-symbols-outlined text-2xl">
                                picture_as_pdf
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <h3
                              className="font-bold text-[#0d141b]  text-lg truncate"
                              title={resume.companyName}
                            >
                              {resume.companyName}
                            </h3>
                          </div>
                          <div className="mt-2 p-3 bg-slate-50  rounded-lg border border-slate-100 ">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-semibold text-slate-600 ">
                                Match
                              </span>
                              <span className="text-xs font-bold text-primary">{resume.feedback.overallScore}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-200  rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${resume.feedback.overallScore}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="flex gap-2 pt-2 border-t border-slate-100 ">
                            <button onClick={() => handleDownload(resume.resumePath)} className="flex-1 h-9 rounded-lg  text-primary text-xs font-bold  bg-gray-100 transition-colors flex items-center justify-center">
                              Download
                            </button>
                            <Link
                              to={"/resume/" + resume.id}
                              className="flex-1 h-9 rounded-lg bg-primary/10 text-primary text-xs font-bold hover:bg-primary/20 transition-colors flex items-center justify-center"
                            >
                              Analyze
                            </Link>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              ))
            }
          </div>
        </div>
      </main>
    </div>
  );
}
