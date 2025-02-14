"use client";

import { useState, useEffect } from "react";
import type { JobicyResponse } from "@/types/index";
import JobCard from "./JobCard";
import SearchBar from "./SearchBar";
import useJobStore from "@/store/useJobStore";

const JobListing = () => {
	const { jobs, setJobs } = useJobStore();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [jobsPerPage] = useState(10);
	const [searchQuery, setSearchQuery] = useState("");
	const [jobType, setJobType] = useState("");

	useEffect(() => {
		if (jobs.length === 0) {
			fetchJobs();
		} else {
			setLoading(false);
		}
	}, [jobs.length]);

	const fetchJobs = async () => {
		try {
			setLoading(true);
			const response = await fetch("https://jobicy.com/api/v2/remote-jobs", {
				headers: {
					Accept: "application/json",
				},
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data: JobicyResponse = await response.json();
			setJobs(data.jobs);
			setLoading(false);
		} catch (error) {
			console.error(error);
			setError(
				error instanceof Error ? error.message : "An unexpected error occurred"
			);
			setLoading(false);
		}
	};

	const filteredJobs = jobs.filter((job) => {
		const matchesSearch =
			job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
			job.companyName.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesType = jobType === "" || job.jobType.includes(jobType);
		return matchesSearch && matchesType;
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
				jobType={jobType}
				setJobType={setJobType}
			/>

			{loading ? (
				<div className="flex justify-center items-center h-64">
					<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
				</div>
			) : error ? (
				<p className="text-center text-red-500">{error}</p>
			) : jobs.length > 0 ? (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{currentJobs.map((job) => (
							<JobCard key={job.id} job={job} />
						))}
					</div>
					<div className="mt-8 flex justify-center gap-2">
						{Array.from({
							length: Math.ceil(filteredJobs.length / jobsPerPage),
						}).map((_, index) => (
							<button
								key={index}
								onClick={() => paginate(index + 1)}
								className={`px-4 py-2 rounded ${
									currentPage === index + 1
										? "bg-blue-500 text-white"
										: "bg-gray-200 text-gray-700 hover:bg-gray-300"
								}`}
							>
								{index + 1}
							</button>
						))}
					</div>
				</>
			) : (
				<p className="text-center text-gray-500 text-lg">No jobs found.</p>
			)}
		</div>
	);
};

export default JobListing;
