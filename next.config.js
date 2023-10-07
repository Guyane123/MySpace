/** @type {import('next').NextConfig} */

export const experimental = {
    appDir: true,
    serverActions: true,
};
export const images = {
    remotePatterns: [
        {
            protocol: "https",
            hostname: "avatars.githubusercontent.com",
            port: "",
            pathname: "/u/**",
        },
        {
            protocol: "https",
            hostname: "lh3.googleusercontent.com",
            port: "",
            pathname: "/a/**",
        },
    ],
};
