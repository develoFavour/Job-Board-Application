import Link from "next/link";
import {
	CalendarDays,
	MapPin,
	Building,
	Briefcase,
	DollarSign,
} from "lucide-react";
import type { JobData } from "@/types";

interface JobCardProps {
	job: JobData;
}

export default function JobCard({ job }: JobCardProps) {
	return (
		<Link href={`/job/${job.job_id}`}>
			<div className="bg-white rounded-lg h-[300px] mt-12 shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-xl font-semibold text-blue-600">
						{job.job_title}
					</h2>
				</div>
				<div className="space-y-2">
					<p className="flex items-center text-gray-600">
						<Building className="w-4 h-4 mr-2" />
						{job.employer_name}
					</p>
					<p className="flex items-center text-gray-600">
						<MapPin className="w-4 h-4 mr-2" />
						{job.job_city}, {job.job_state}
					</p>
					<p className="flex items-center text-gray-600">
						<Briefcase className="w-4 h-4 mr-2" />
						{job.job_employment_type}
					</p>
					{job.job_salary && (
						<p className="flex items-center text-gray-600">
							<DollarSign className="w-4 h-4 mr-2" />
							Salary: {job.job_salary}
						</p>
					)}
					<p className="flex items-center text-gray-500 text-sm">
						<CalendarDays className="w-4 h-4 mr-2" />
						Posted: {job.job_posted_at_datetime_utc}
					</p>
				</div>
				<div className="mt-4 flex justify-end">
					<span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
						View Details
					</span>
				</div>
			</div>
		</Link>
	);
}
