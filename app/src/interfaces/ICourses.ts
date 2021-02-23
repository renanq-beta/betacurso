export interface ICourses{
  total_count: number;
  edges: Array<ICourse>;
}

export interface ICourse{
  id?: string;
  name: string;
  description: string;
  views: number;
  video: string;
  duration: string;
}