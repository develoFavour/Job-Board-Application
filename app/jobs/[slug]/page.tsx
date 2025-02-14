"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import JobDetails from "@/components/home/JobDetails";
import useJobStore from "@/store/useJobStore";

export default function JobPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const resolvedParams = use(params);
	const { getJobBySlug, jobs } = useJobStore();
	const job = getJobBySlug(resolvedParams.slug);

	if (jobs.length === 0) {
		// If we don't have the jobs data, redirect to the jobs page
		if (typeof window !== "undefined") {
			window.location.href = "/jobs";
		}
		return null;
	}

	if (!job) {
		notFound();
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<JobDetails job={job} />
		</div>
	);
}
