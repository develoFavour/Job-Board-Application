"use client";

import { useState } from "react";

interface ApplicationFormProps {
	jobId: string;
	onClose: () => void;
}

export default function ApplicationForm({
	jobId,
	onClose,
}: ApplicationFormProps) {
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		resume: null as File | null,
		coverLetter: "",
	});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFormData((prev) => ({ ...prev, resume: e.target.files![0] }));
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Implement form submission logic here
		console.log("Submitting application for job:", jobId, formData);
		onClose();
	};

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
			<div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
				<h3 className="text-lg font-bold mb-4">Apply for Job</h3>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="fullName"
							className="block text-sm font-medium text-gray-700"
						>
							Full Name
						</label>
						<input
							type="text"
							id="fullName"
							name="fullName"
							value={formData.fullName}
							onChange={handleInputChange}
							required
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleInputChange}
							required
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="resume"
							className="block text-sm font-medium text-gray-700"
						>
							Resume
						</label>
						<input
							type="file"
							id="resume"
							name="resume"
							onChange={handleFileChange}
							required
							className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="coverLetter"
							className="block text-sm font-medium text-gray-700"
						>
							Cover Letter
						</label>
						<textarea
							id="coverLetter"
							name="coverLetter"
							value={formData.coverLetter}
							onChange={handleInputChange}
							required
							rows={4}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
						></textarea>
					</div>
					<div className="flex justify-end gap-4">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							Submit Application
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
