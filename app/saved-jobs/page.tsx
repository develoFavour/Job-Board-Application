"use client";

import { useEffect, useState } from "react";
import useJobStore from "@/store/useJobStore";
import JobCard from "@/components/home/JobCard";

export default function SavedJobsPage() {
	const { savedJobs } = useJobStore();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null; // or a loading spinner
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8">Saved Jobs</h1>
			{savedJobs.length === 0 ? (
				<p className="text-gray-600">You haven&apos;t saved any jobs yet.</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{savedJobs.map((job) => (
						<JobCard key={job.id} job={job} />
					))}
				</div>
			)}
		</div>
	);
}
