import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { JobData } from "@/types";

interface JobStore {
	savedJobs: JobData[];
	addSavedJob: (job: JobData) => void;
	removeSavedJob: (jobId: string) => void;
}

const useJobStore = create<JobStore>()(
	persist(
		(set) => ({
			savedJobs: [],
			addSavedJob: (job) =>
				set((state) => ({
					savedJobs: [...state.savedJobs, job],
				})),
			removeSavedJob: (jobId) =>
				set((state) => ({
					savedJobs: state.savedJobs.filter((job) => job.job_id !== jobId),
				})),
		}),
		{
			name: "job-store",
		}
	)
);

export default useJobStore;
