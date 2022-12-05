export type Review = {
  id: number;
  rating: number;
  author: {
    id: number;
    name: string;
  };
  date: string;
  comment: string;
};
