import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    // basePath: '/',
    compiler: {
        styledComponents: true,
    }
};

export default nextConfig;
