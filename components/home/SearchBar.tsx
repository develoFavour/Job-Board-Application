import type React from "react";

interface SearchBarProps {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	category: string;
	setCategory: (category: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
	searchQuery,
	setSearchQuery,
	category,
	setCategory,
}) => {
	return (
		<div className="mb-8 flex flex-col md:flex-row gap-4">
			<input
				type="text"
				placeholder="Search jobs..."
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
			<select
				value={category}
				onChange={(e) => setCategory(e.target.value)}
				className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
			>
				<option value="">All Categories</option>
				<option value="FULLTIME">Full-time</option>
				<option value="PARTTIME">Part-time</option>
				<option value="CONTRACTOR">Contractor</option>
				<option value="INTERN">Intern</option>
			</select>
		</div>
	);
};

export default SearchBar;
