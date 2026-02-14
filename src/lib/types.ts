export type JobItem = {
  id: number;
  badgeLetters: string;
  title: string;
  company: string;
  daysAgo: number;
  relevanceScore: number;
};

export type jobItemDetails = JobItem & {
  description: string;
  duration: string;
  salary: string;
  location: string;
  coverImgURL: string;
  companyURL: string;
  qualifications: string[];
  reviews: string[];
};

export type JobItemDetailsApiResponse = {
  public: boolean;
  jobItem: jobItemDetails;
};

export type JobItemsApiResponse = {
  public: boolean;
  sorted: true;
  jobItems: JobItem[];
};

export type Direction = "next" | "prev";

export type SortBy = "relevance" | "recent";
