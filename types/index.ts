export interface JobicyJob {
	id: number;
	url: string;
	jobSlug: string;
	jobTitle: string;
	companyName: string;
	companyLogo: string;
	jobIndustry: string[];
	jobType: string[];
	jobGeo: string;
	jobLevel: string;
	jobExcerpt: string;
	jobDescription: string;
	pubDate: string;
	annualSalaryMin: number | null;
	annualSalaryMax: number | null;
	salaryCurrency: string;
}

export interface JobicyResponse {
	apiVersion: string;
	jobCount: number;
	lastUpdate: string;
	jobs: JobicyJob[];
}
