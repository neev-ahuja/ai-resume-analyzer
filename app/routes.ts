import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route(".well-known/*", "routes/empty.tsx"),
    index("routes/home.tsx"),
    route("login", "routes/login.tsx"),
    route("resume/:id", "routes/resume.tsx"),
    route("upload", "routes/upload.tsx")
] satisfies RouteConfig;

