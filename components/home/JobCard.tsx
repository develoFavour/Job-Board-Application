import Link from "next/link";
import type { JobData } from "@/types";

interface JobCardProps {
	job: JobData;
}

export default function JobCard({ job }: JobCardProps) {
	return (
		<Link href={`/job/${job.job_id}`}>
			<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
				<h2 className="text-xl font-semibold mb-2">{job.job_title}</h2>
				<p className="text-gray-600 mb-2">{job.employer_name}</p>
				<p className="text-gray-600 mb-2">
					{job.job_city}, {job.job_state}
				</p>
				<p className="text-gray-600">{job.job_employment_type}</p>
				{job.job_salary && (
					<p className="text-gray-600 mt-2">Salary: {job.job_salary}</p>
				)}
			</div>
		</Link>
	);
}
