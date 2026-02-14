import { useActiveIdContext } from "../lib/hooks";
import { JobItem } from "../lib/types";

import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProps = {
  jobItems: JobItem[];
  isLoading: boolean;
};

export function JobList({ jobItems, isLoading }: JobListProps) {
  const { activeJobId } = useActiveIdContext();
  return (
    <ul className="job-list">
      {isLoading && <Spinner />}
      {!isLoading &&
        jobItems.map((item) => <JobListItem key={item.id} jobItem={item} isActive={item.id === activeJobId} />)}
    </ul>
  );
}

export default JobList;
