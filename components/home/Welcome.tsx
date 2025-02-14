import Link from "next/link";
import React from "react";

const Welcome = () => {
	return (
		<div className="bg-slate-300 h-screen grid justify-center items-center">
			<div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
				<div className="text-center">
					<h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
						<span className="block">Find Your Dream Job</span>
						<span className="block text-indigo-600">
							Start Your Career Journey
						</span>
					</h1>
					<p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
						Discover thousands of job opportunities across various industries.
						Your next career move is just a click away.
					</p>
					<div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
						<div className="rounded-md shadow">
							<Link
								href="#job-list"
								className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
							>
								Browse Jobs
							</Link>
						</div>
						<div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
							<Link
								href="#job-list"
								className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
							>
								Learn More
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Welcome;
