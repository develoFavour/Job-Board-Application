"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { navItems } from "@/lib/navigation";

const Navigation = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const pathname = usePathname();
	const router = useRouter();

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		router.push(`/jobs?search=${encodeURIComponent(searchQuery)}`);
	};
	return (
		<nav className="bg-white shadow-md">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex items-center">
						<Link href="/" className="flex-shrink-0 flex items-center">
							<span className="font-bold text-xl text-gray-800">
								Job<span className="text-indigo-600">Board</span>
							</span>
						</Link>
					</div>
					<div className="flex justify-center items-center">
						<form onSubmit={handleSearch} className="relative">
							<input
								type="text"
								placeholder="Search jobs..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
							<Search
								className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
								size={18}
							/>
						</form>
					</div>
					<div className="hidden sm:ml-6 sm:flex sm:space-x-8">
						{navItems.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
									pathname === item.href
										? "border-indigo-500 text-gray-900"
										: "border-transparent text-gray-500 hover:border-indigo-600 hover:text-gray-700"
								}`}
							>
								{item.name}
							</Link>
						))}
					</div>
					<div className="flex items-center sm:hidden">
						<button
							onClick={toggleMenu}
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
						>
							<span className="sr-only">Open main menu</span>
							{isMenuOpen ? (
								<X className="block h-6 w-6" aria-hidden="true" />
							) : (
								<Menu className="block h-6 w-6" aria-hidden="true" />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu, show/hide based on menu state */}
			<div className={`sm:hidden ${isMenuOpen ? "block" : "hidden"}`}>
				<div className="pt-2 pb-3 space-y-1">
					{navItems.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
								pathname === item.href
									? "bg-indigo-50 border-indigo-500 text-indigo-700"
									: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
							}`}
							onClick={toggleMenu}
						>
							{item.name}
						</Link>
					))}
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
