import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { JobicyJob } from "@/types/index";

interface JobStore {
	jobs: JobicyJob[];
	savedJobs: JobicyJob[];
	appliedJobs: number[];
	setJobs: (jobs: JobicyJob[]) => void;
	addSavedJob: (job: JobicyJob) => void;
	removeSavedJob: (jobId: number) => void;
	isSaved: (jobId: number) => boolean;
	setAppliedJob: (jobId: number) => void;
	isApplied: (jobId: number) => boolean;
	getJobBySlug: (slug: string) => JobicyJob | undefined;
}

const useJobStore = create<JobStore>()(
	persist(
		(set, get) => ({
			jobs: [],
			savedJobs: [],
			appliedJobs: [],
			setJobs: (jobs) => set({ jobs }),
			addSavedJob: (job) =>
				set((state) => ({
					savedJobs: [...state.savedJobs, job],
				})),
			removeSavedJob: (jobId) =>
				set((state) => ({
					savedJobs: state.savedJobs.filter((job) => job.id !== jobId),
				})),
			isSaved: (jobId) => get().savedJobs.some((job) => job.id === jobId),
			setAppliedJob: (jobId) =>
				set((state) => ({
					appliedJobs: [...state.appliedJobs, jobId],
				})),
			isApplied: (jobId) => get().appliedJobs.includes(jobId),
			getJobBySlug: (slug) => get().jobs.find((job) => job.jobSlug === slug),
		}),
		{
			name: "job-store",
		}
	)
);

export default useJobStore;
