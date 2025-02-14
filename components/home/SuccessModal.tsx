import { CheckCircle } from "lucide-react";

interface SuccessModalProps {
	jobTitle: string;
	companyName: string;
	onClose: () => void;
}

export default function SuccessModal({
	jobTitle,
	companyName,
	onClose,
}: SuccessModalProps) {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-lg p-6 w-full max-w-md text-center">
				<CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
				<h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
				<p className="text-gray-600 mb-4">
					Your application for the position of{" "}
					<span className="font-semibold">{jobTitle}</span> at{" "}
					<span className="font-semibold">{companyName}</span> has been
					successfully submitted.
				</p>
				<p className="text-gray-600 mb-6">We wish you the best of luck!</p>
				<button
					onClick={onClose}
					className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				>
					Close
				</button>
			</div>
		</div>
	);
}
