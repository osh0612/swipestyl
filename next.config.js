/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['mesqcfkwbbttcjxyckww.supabase.co'],
  },
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/home',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
