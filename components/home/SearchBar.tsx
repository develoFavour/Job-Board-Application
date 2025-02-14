import type React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	jobType: string;
	setJobType: (type: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
	searchQuery,
	setSearchQuery,
	jobType,
	setJobType,
}) => {
	return (
		<div className="flex flex-col md:flex-row gap-4 mb-8">
			<div className="relative flex-grow">
				<input
					type="text"
					placeholder="Search jobs or companies..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<Search
					className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
					size={20}
				/>
			</div>
			<select
				value={jobType}
				onChange={(e) => setJobType(e.target.value)}
				className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
			>
				<option value="">All Job Types</option>
				<option value="full-time">Full Time</option>
				<option value="part-time">Part Time</option>
				<option value="contract">Contract</option>
				<option value="internship">Internship</option>
			</select>
		</div>
	);
};

export default SearchBar;
