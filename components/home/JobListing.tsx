"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import type { Job, JobData } from "@/types";
import JobCard from "./JobCard";
import SearchBar from "./SearchBar";

const JobListing = () => {
	const [jobs, setJobs] = useState<Job>({ data: [] });
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [jobsPerPage] = useState(10);
	const [searchQuery, setSearchQuery] = useState("");
	const [category, setCategory] = useState("");

	useEffect(() => {
		fetchJobs();
	}, []);

	const fetchJobs = async () => {
		const options = {
			method: "GET",
			url: "https://jsearch.p.rapidapi.com/search",
			params: {
				query: "developer jobs in chicago",
				page: "1",
				num_pages: "1",
				country: "us",
				date_posted: "all",
			},
			headers: {
				"x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
				"x-rapidapi-host": "jsearch.p.rapidapi.com",
			},
		};

		try {
			setLoading(true);
			const response = await axios.request(options);
			console.log(response.data);
			setJobs(response.data);
			setLoading(false);
		} catch (error) {
			console.error(error);
			setError(
				error instanceof Error ? error.message : "An unexpected error occurred"
			);
			setLoading(false);
		}
	};
	console.log("jobs", jobs.data);

	const filteredJobs = jobs.data.filter((job: JobData) => {
		return (
			job.job_title.toLowerCase().includes(searchQuery.toLowerCase()) &&
			(category === "" || job.job_employment_type === category)
		);
	});

	const indexOfLastJob = currentPage * jobsPerPage;
	const indexOfFirstJob = indexOfLastJob - jobsPerPage;
	const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	return (
		<div className="container mx-auto px-4 py-8">
			<SearchBar
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				category={category}
				setCategory={setCategory}
			/>

			{loading ? (
				<p className="text-center">Loading jobs...</p>
			) : error ? (
				<p className="text-center text-red-500">{error}</p>
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{currentJobs.map((job) => (
							<JobCard key={job.job_id} job={job} />
						))}
					</div>
					<div className="mt-8 flex justify-center">
						{Array.from({
							length: Math.ceil(filteredJobs.length / jobsPerPage),
						}).map((_, index) => (
							<button
								key={index}
								onClick={() => paginate(index + 1)}
								className={`mx-1 px-3 py-1 rounded ${
									currentPage === index + 1
										? "bg-blue-500 text-white"
										: "bg-gray-200"
								}`}
							>
								{index + 1}
							</button>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default JobListing;
