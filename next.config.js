/** @type {import('next').NextConfig} */

module.exports = {
    experimental: {
        appDir: true,
        serverActions: true,
    },

    images: {
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
    },
};
