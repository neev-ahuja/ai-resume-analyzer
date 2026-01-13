import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => ([
    { title: 'Authentication' },
    { name: 'description', content: 'Login to your account' },
])

export default function Login() {

    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1] || '/';
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next])

    return (
        <div className="min-h-screen w-full flex overflow-hidden font-display text-slate-900  bg-background-light  transition-colors duration-200">
            <div className="hidden lg:flex lg:w-1/2 relative bg-surface-dark overflow-hidden flex-col justify-between p-12 xl:p-20 text-white">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-linear-to-br from-primary/90 to-blue-900/90 mix-blend-multiply z-10"></div>
                    <div
                        className="h-full w-full bg-cover bg-center"
                        data-alt="Abstract professional gradient background representing career growth"
                        style={{
                            backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCV3xHXc3iDAloloL2kQgA-jiCXVo62tIVLd7gzuRLKBgidHi__Z-1YDX5jHFi3ohv-h85J_7u8vHRQEWQQk-7BQFaQrkFfeKb7qnD9qLfccQBjbKZxqJhm3nnMLNLfLFARsl-fjrWWzh7NBGBwbB33PhzuVJDCQtLjyppXHiHCY9fnmuTsxsC7Kiw18Eu9xhRCZ3DFlq5U0tyZe8KV7UlP0xT84y1lqFReRippamBk-3tW6h8ujwmoQKvUGsLWJSWADfiVQ8pv5RY3')",
                        }}
                    ></div>
                </div>
                <div className="relative z-20 h-full flex flex-col justify-between">
                    <div className="flex items-center gap-3">
                        <div className="size-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-xl">
                                description
                            </span>
                        </div>
                        <span className="text-xl font-bold tracking-tight">ResumeAI</span>
                    </div>
                    <div className="flex flex-col gap-6 max-w-lg">
                        <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
                            Unlock Your <br />
                            <span className="text-blue-200">Career Potential</span>
                        </h1>
                        <p className="text-lg text-blue-100/90 font-normal leading-relaxed">
                            AI-powered resume matching to land your dream job faster. Optimize
                            your profile and get matched with top recruiters instantly.
                        </p>
                    </div>
                    <div className="text-sm text-blue-200/60 font-medium">
                        © 2024 ResumeAI Inc. All rights reserved.
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col bg-background-light  h-screen overflow-y-auto">

                <div className="lg:hidden flex items-center justify-between p-6 pb-0">
                    <div className="flex items-center gap-2 text-slate-900 ">
                        <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">description</span>
                        </div>
                        <span className="text-lg font-bold">ResumeAI</span>
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24">

                    {
                        isLoading ? (
                            <div className="animate-pulse text-[2rem] font-bold">
                                Loading...
                            </div>
                        ) : (
                            <div className="w-full max-w-md flex flex-col gap-8">
                                <div className="flex flex-col gap-2 text-center lg:text-left">
                                    <h2 className="text-3xl font-black text-slate-900  leading-tight">
                                        Welcome Back
                                    </h2>
                                    <p className="text-slate-500  text-base">
                                        Sign in to access your dashboard and saved matches.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={auth.signIn}
                                        className="relative flex w-full cursor-pointer items-center justify-center rounded-xl h-12 px-5 bg-[#0008d9]  border border-slate-200  transition-colors text-slate-900  gap-3 text-base font-bold leading-normal tracking-[0.015em]">
                                        <span>
                                            <img className="size-11" src="https://cdn-1.webcatalog.io/catalog/puter/puter-icon-filled-256.png?v=1714776701295" alt="" />
                                        </span>
                                        <span className="truncate text-white">Continue with Puter</span>
                                    </button>
                                </div>
                                <div className="relative flex items-center py-2">
                                    <div className="grow border-t border-slate-200 "></div>
                                    <span className="px-3 text-slate-500  text-sm font-medium">
                                        Or continue with email
                                    </span>
                                    <div className="grow border-t border-slate-200 "></div>
                                </div>
                                <form className="flex flex-col gap-5">
                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            className="text-sm font-bold text-slate-900 "
                                            htmlFor="email"
                                        >
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                                <span className="material-symbols-outlined text-[20px]">
                                                    mail
                                                </span>
                                            </div>
                                            <input
                                                className="block w-full rounded-xl border-slate-300  bg-white  text-slate-900  placeholder-slate-400 focus:border-primary focus:ring-primary pl-10 h-12 sm:text-sm"
                                                id="email"
                                                placeholder="you@example.com"
                                                required
                                                type="email"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            className="text-sm font-bold text-slate-900 "
                                            htmlFor="password"
                                        >
                                            Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                                <span className="material-symbols-outlined text-[20px]">
                                                    lock
                                                </span>
                                            </div>
                                            <input
                                                className="block w-full rounded-xl border-slate-300  bg-white  text-slate-900  placeholder-slate-400 focus:border-primary focus:ring-primary pl-10 pr-10 h-12 sm:text-sm"
                                                id="password"
                                                placeholder="••••••••"
                                                required
                                                type="password"
                                            />
                                            <button
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 "
                                                type="button"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">
                                                    visibility_off
                                                </span>
                                            </button>
                                        </div>
                                        <div className="flex justify-end">
                                            <Link
                                                to="#"
                                                className="text-sm font-semibold text-primary hover:text-primary-hover"
                                            >
                                                Forgot password?
                                            </Link>
                                        </div>
                                    </div>
                                    <button
                                        className="flex w-full cursor-pointer items-center justify-center rounded-xl h-12 px-6 bg-primary hover:bg-primary-hover text-white text-base font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
                                        type="submit"
                                    >
                                        Sign In
                                    </button>
                                </form>
                                <div className="text-center">
                                    <p className="text-slate-500  text-sm">
                                        Don't have an account?
                                        <Link
                                            className="font-bold text-primary hover:text-primary-hover ml-1"
                                            to="#"
                                        >
                                            Sign up for free
                                        </Link>
                                    </p>
                                </div>
                                <div className="mt-auto pt-6 text-center lg:text-left">
                                    <p className="text-xs text-slate-400 ">
                                        By continuing, you agree to ResumeAI's{" "}
                                        <Link className="underline hover:text-slate-500" to="#">
                                            Terms of Service
                                        </Link>{" "}
                                        and{" "}
                                        <Link className="underline hover:text-slate-500" to="#">
                                            Privacy Policy
                                        </Link>
                                        .
                                    </p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
