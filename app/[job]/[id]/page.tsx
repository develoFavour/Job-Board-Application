import axios from "axios";
import { Suspense } from "react";
import type { JobData } from "@/types";

interface Job {
	data: JobData[];
}

async function getJob(id: string): Promise<Job | null> {
	const decodedId = decodeURIComponent(id);

	const options = {
		method: "GET",
		url: "https://jsearch.p.rapidapi.com/job-details",
		params: {
			job_id: decodedId,
			country: "us",
		},
		headers: {
			"x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
			"x-rapidapi-host": "jsearch.p.rapidapi.com",
		},
	};

	try {
		const response = await axios.request(options);
		if (!response.data) {
			throw new Error("No data received");
		}
		return response.data;
	} catch (error) {
		console.error("API Error:", {
			message: error instanceof Error ? error.message : "Unknown error",
			id: decodedId,
		});
		return null;
	}
}

function JobDetails({ job }: { job: JobData }) {
	return (
		<div>
			<h1>{job.job_title}</h1>
			<p>{job.employer_name}</p>
			<p>{job.job_city}</p>
			<p>{job.job_description}</p>
		</div>
	);
}

export default async function JobPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const job = await getJob(id);

	if (!job || !job.data || job.data.length === 0) {
		return (
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
				<p>
					Sorry, we couldn&apos;t find the job you&apos;re looking for. It may
					have been removed or doesn&apos;t exist.
				</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<Suspense fallback={<div>Loading...</div>}>
				<JobDetails job={job.data[0]} />
			</Suspense>
		</div>
	);
}
