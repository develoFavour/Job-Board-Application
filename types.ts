export interface Job {
	data: JobData[];
}

export interface JobData {
	job_id: string;
	employer_name: string;
	employer_logo: string | null;
	employer_website: string | null;
	job_title: string;
	job_description: string;
	job_country: string;
	job_state: string;
	job_city: string;
	job_employment_type: string;
	job_employment_types: string[];
	job_google_link: string;
	job_is_remote: boolean;
	job_posted_at_timestamp: number;
	job_posted_at_datetime_utc: string;
	job_posted_at: string;
	job_apply_link: string;
	job_apply_is_direct: boolean;
	job_latitude: number;
	job_longitude: number;
	job_benefits: string[] | null;
	job_salary: string | null;
	job_salary_period: string | null;
	job_min_salary: number | null;
	job_max_salary: number | null;
	apply_options: ApplyOption[];
	job_highlights: JobHighlights;
}

export interface ApplyOption {
	publisher: string;
	apply_link: string;
	is_direct: boolean;
}

export interface JobHighlights {
	Qualifications?: string[];
	Benefits?: string[];
	Responsibilities?: string[];
}
