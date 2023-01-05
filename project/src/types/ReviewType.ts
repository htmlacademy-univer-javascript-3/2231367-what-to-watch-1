export type Review = {
  id: number;
  rating: number;
  user: {
    id: number;
    name: string;
  };
  date: string;
  comment: string;
};
