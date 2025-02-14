import Link from "next/link";
import Image from "next/image";
import {
	CalendarDays,
	MapPin,
	Building,
	Briefcase,
	BookmarkPlus,
	BookmarkMinus,
} from "lucide-react";
import type { JobicyJob } from "@/types/index";
import useJobStore from "@/store/useJobStore";
import type React from "react";
import toast from "react-hot-toast";

interface JobCardProps {
	job: JobicyJob;
}

export default function JobCard({ job }: JobCardProps) {
	const { addSavedJob, removeSavedJob, isSaved } = useJobStore();
	const jobSaved = isSaved(job.id);

	const handleSaveToggle = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (jobSaved) {
			removeSavedJob(job.id);
			toast.success("Removed from Saved");
		} else {
			addSavedJob(job);
			toast.success("Job Saved");
		}
	};

	return (
		<Link href={`/jobs/${job.jobSlug}`}>
			<div className="bg-white rounded-lg shadow-md p-6 h-[300px] hover:shadow-lg transition-shadow border border-gray-200 relative group">
				{/* Header with company logo and bookmark */}
				<div className="flex items-start justify-between gap-4 mb-4">
					<div className="flex-1">
						<h2 className="text-xl font-semibold text-blue-600 line-clamp-2 pr-8">
							{job.jobTitle}
						</h2>
					</div>
					<div className="flex items-start gap-2">
						{job.companyLogo && (
							<div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-100">
								<Image
									src={job.companyLogo || "/placeholder.svg"}
									alt={`${job.companyName} logo`}
									fill
									className="object-cover"
									sizes="48px"
								/>
							</div>
						)}
						<button
							onClick={handleSaveToggle}
							className="p-2 rounded-full hover:bg-gray-100 transition-colors"
							aria-label={jobSaved ? "Remove from saved jobs" : "Save job"}
						>
							{jobSaved ? (
								<BookmarkMinus className="w-5 h-5 text-blue-500" />
							) : (
								<BookmarkPlus className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
							)}
						</button>
					</div>
				</div>

				{/* Job details */}
				<div className="space-y-2">
					<p className="flex items-center text-gray-600">
						<Building className="w-4 h-4 mr-2 flex-shrink-0" />
						<span className="line-clamp-1">{job.companyName}</span>
					</p>
					<p className="flex items-center text-gray-600">
						<MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
						<span className="line-clamp-1">{job.jobGeo}</span>
					</p>
					<p className="flex items-center text-gray-600">
						<Briefcase className="w-4 h-4 mr-2 flex-shrink-0" />
						<span className="capitalize">{job.jobType.join(", ")}</span>
					</p>
					<p className="flex items-center text-gray-500 text-sm">
						<CalendarDays className="w-4 h-4 mr-2 flex-shrink-0" />
						Posted: {new Date(job.pubDate).toLocaleDateString()}
					</p>
				</div>

				{/* Tags */}
				<div className="mt-4 flex flex-wrap gap-2">
					{job.jobIndustry.map((industry) => (
						<span
							key={industry}
							className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
						>
							{industry}
						</span>
					))}
				</div>

				{/* Salary */}
				{job.annualSalaryMin && job.annualSalaryMax && (
					<div className="mt-4 text-sm text-gray-600">
						<span className="font-medium">
							{job.salaryCurrency} {job.annualSalaryMin.toLocaleString()} -{" "}
							{job.annualSalaryMax.toLocaleString()} / year
						</span>
					</div>
				)}
			</div>
		</Link>
	);
}
