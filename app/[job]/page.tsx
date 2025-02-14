import JobListing from "@/components/home/JobListing";

export default function JobsPage() {
	return (
		<div className="min-h-screen bg-gray-100">
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold mb-8 text-center">
					Available Jobs On Our site
				</h1>
				<JobListing />
			</div>
		</div>
	);
}
