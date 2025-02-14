import { useState } from "react";
import { X } from "lucide-react";

interface ApplicationFormProps {
	jobTitle: string;
	onClose: () => void;
	onSubmit: () => void;
}

export default function ApplicationForm({
	jobTitle,
	onClose,
	onSubmit,
}: ApplicationFormProps) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [resume, setResume] = useState<File | null>(null);
	const [coverLetter, setCoverLetter] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(resume);

		onSubmit();
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-lg p-6 w-full max-w-md">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold">Apply for {jobTitle}</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<X size={24} />
					</button>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Full Name
						</label>
						<input
							type="text"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Email
						</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="resume"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Resume
						</label>
						<input
							type="file"
							id="resume"
							onChange={(e) =>
								setResume(e.target.files ? e.target.files[0] : null)
							}
							required
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="coverLetter"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Cover Letter
						</label>
						<textarea
							id="coverLetter"
							value={coverLetter}
							onChange={(e) => setCoverLetter(e.target.value)}
							rows={4}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						></textarea>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						Submit Application
					</button>
				</form>
			</div>
		</div>
	);
}
