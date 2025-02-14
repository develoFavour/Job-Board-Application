"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
	Building,
	MapPin,
	Briefcase,
	DollarSign,
	Calendar,
	BookmarkPlus,
	BookmarkMinus,
} from "lucide-react";
import type { JobicyJob } from "@/types/index";
import useJobStore from "@/store/useJobStore";
import ApplicationForm from "./ApplicationForm";
import SuccessModal from "./SuccessModal";
import { toast } from "react-hot-toast";

export default function JobDetails({ job }: { job: JobicyJob }) {
	const { addSavedJob, removeSavedJob, isSaved, setAppliedJob, isApplied } =
		useJobStore();
	const [showApplicationForm, setShowApplicationForm] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const jobSaved = isSaved(job.id);
	const jobApplied = isApplied(job.id);
	const router = useRouter();

	const handleSaveToggle = () => {
		if (jobSaved) {
			removeSavedJob(job.id);
			toast.success("Job Removed");
		} else {
			addSavedJob(job);
			toast.success("Job Saved");
		}
	};

	const handleApply = () => {
		if (!jobApplied) {
			setShowApplicationForm(true);
		}
	};

	const handleApplicationSubmit = () => {
		setShowApplicationForm(false);
		setAppliedJob(job.id);
		setShowSuccessModal(true);
	};

	const handleSuccessModalClose = () => {
		setShowSuccessModal(false);
		router.push("/");
	};

	return (
		<div className="bg-white rounded-lg shadow-lg p-8">
			{/* Header Section */}
			<div className="flex items-start justify-between gap-6 mb-6 pb-6 border-b">
				<div className="flex-1">
					<h1 className="text-3xl font-bold text-gray-900 mb-4">
						{job.jobTitle}
					</h1>
					<div className="flex flex-wrap gap-4 text-gray-600">
						<div className="flex items-center">
							<Building className="w-5 h-5 mr-2" />
							{job.companyName}
						</div>
						<div className="flex items-center">
							<MapPin className="w-5 h-5 mr-2" />
							{job.jobGeo}
						</div>
						<div className="flex items-center">
							<Briefcase className="w-5 h-5 mr-2" />
							{job.jobType.join(", ")}
						</div>
						<div className="flex items-center">
							<Calendar className="w-5 h-5 mr-2" />
							Posted: {new Date(job.pubDate).toLocaleDateString()}
						</div>
					</div>
				</div>
				<div className="flex items-start gap-4">
					{job.companyLogo && (
						<div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-100">
							<Image
								src={job.companyLogo || "/placeholder.svg"}
								alt={`${job.companyName} logo`}
								fill
								className="object-cover"
								sizes="80px"
							/>
						</div>
					)}
					<button
						onClick={handleSaveToggle}
						className="p-2 rounded-full hover:bg-gray-100 transition-colors"
						aria-label={jobSaved ? "Remove from saved jobs" : "Save job"}
					>
						{jobSaved ? (
							<BookmarkMinus className="w-6 h-6 text-blue-500" />
						) : (
							<BookmarkPlus className="w-6 h-6 text-gray-400 hover:text-gray-600" />
						)}
					</button>
				</div>
			</div>

			{/* Salary Section */}
			{job.annualSalaryMin && job.annualSalaryMax && (
				<div className="mb-6 p-4 bg-gray-50 rounded-lg">
					<div className="flex items-center">
						<DollarSign className="w-5 h-5 mr-2 text-green-600" />
						<span className="text-lg font-medium">
							{job.salaryCurrency} {job.annualSalaryMin.toLocaleString()} -{" "}
							{job.annualSalaryMax.toLocaleString()} / year
						</span>
					</div>
				</div>
			)}

			{/* Job Description */}
			<div className="prose max-w-none mb-8">
				<div dangerouslySetInnerHTML={{ __html: job.jobDescription }} />
			</div>

			{/* Action Buttons */}
			<div className="flex gap-4 mt-8">
				<button
					onClick={handleApply}
					className={`px-6 py-3 rounded-lg transition-colors ${
						jobApplied
							? "bg-green-500 text-white cursor-default"
							: "bg-blue-600 text-white hover:bg-blue-700"
					}`}
					disabled={jobApplied}
				>
					{jobApplied ? "Applied" : "Apply Now"}
				</button>
				<button
					onClick={handleSaveToggle}
					className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
						jobSaved
							? "bg-red-100 text-red-600 hover:bg-red-200"
							: "bg-gray-100 text-gray-800 hover:bg-gray-200"
					}`}
				>
					{jobSaved ? (
						<>
							<BookmarkMinus className="w-5 h-5 mr-2" />
							Remove from Saved
						</>
					) : (
						<>
							<BookmarkPlus className="w-5 h-5 mr-2" />
							Save Job
						</>
					)}
				</button>
			</div>

			{showApplicationForm && (
				<ApplicationForm
					jobTitle={job.jobTitle}
					onClose={() => setShowApplicationForm(false)}
					onSubmit={handleApplicationSubmit}
				/>
			)}

			{showSuccessModal && (
				<SuccessModal
					jobTitle={job.jobTitle}
					companyName={job.companyName}
					onClose={handleSuccessModalClose}
				/>
			)}
		</div>
	);
}
