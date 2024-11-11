/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: process.env.NODE_ENV === 'production' ? 'https' : 'http',  // Use HTTPS in production
                hostname: process.env.NEXT_PUBLIC_BACKEND_URL ? new URL(process.env.NEXT_PUBLIC_BACKEND_URL).hostname : 'localhost',
                port: process.env.NEXT_PUBLIC_BACKEND_URL && new URL(process.env.NEXT_PUBLIC_BACKEND_URL).port ? new URL(process.env.NEXT_PUBLIC_BACKEND_URL).port : (process.env.NODE_ENV === 'production' ? '' : '8000'),
                pathname: '/storage/**',
            },
        ],
        domains: ['51.20.18.159', 'ecom-lara-api2.expertoftech.com'],
    },
};

export default nextConfig;
