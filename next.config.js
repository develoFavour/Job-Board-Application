/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "jobicy.com",
				pathname: "/data/**",
			},
		],
	},
};

module.exports = nextConfig;
