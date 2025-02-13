"use client";

import { useState } from "react";
import type { JobData } from "@/types";
import ApplicationForm from "./ApplicationForm";
import useJobStore from "@/store/useJobStore";

export default function JobDetails({ job }: { job: JobData }) {
	const [showApplicationForm, setShowApplicationForm] = useState(false);
	const { savedJobs, addSavedJob, removeSavedJob } = useJobStore();

	const isJobSaved = savedJobs.some(
		(savedJob) => savedJob.job_id === job.job_id
	);

	const handleSaveJob = () => {
		if (isJobSaved) {
			removeSavedJob(job.job_id);
		} else {
			addSavedJob(job);
		}
	};

	return (
		<div className="bg-white rounded-lg shadow-md p-6">
			<h1 className="text-3xl font-bold mb-4">{job.job_title}</h1>
			<p className="text-xl text-gray-600 mb-2">{job.job_country}</p>
			<p className="text-lg text-gray-600 mb-4">{job.employer_name}</p>
			<p className="text-lg font-semibold mb-4">Salary: ${job.job_salary}</p>
			<div className="mb-6">
				<h2 className="text-2xl font-semibold mb-2">Job Description</h2>
				<p className="text-gray-700">{job.job_description}</p>
			</div>
			<div className="mb-6">
				<h2 className="text-2xl font-semibold mb-2">Requirements</h2>
				<ul className="list-disc list-inside text-gray-700">
					{job.job_highlights.Qualifications?.map((req, index) => (
						<li key={index}>{req}</li>
					))}
				</ul>
			</div>
			<div className="mb-6">
				<h2 className="text-2xl font-semibold mb-2">How to Apply</h2>
				<a href={job.job_apply_link} className="text-blue-500 hover:underline">
					Apply Here
				</a>
			</div>
			<div className="flex gap-4">
				<button
					onClick={() => setShowApplicationForm(true)}
					className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				>
					Apply Now
				</button>
				<button
					onClick={handleSaveJob}
					className={`px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
						isJobSaved
							? "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500"
							: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500"
					}`}
				>
					{isJobSaved ? "Remove Saved Job" : "Save Job"}
				</button>
			</div>
			{showApplicationForm && (
				<ApplicationForm
					jobId={job.job_id}
					onClose={() => setShowApplicationForm(false)}
				/>
			)}
		</div>
	);
}
