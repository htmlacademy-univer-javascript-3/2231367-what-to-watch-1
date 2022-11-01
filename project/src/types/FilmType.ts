import {RatingDescription} from '../types/RatingDescription';

export type FimlType = {
  id: number;
  title: string;
  img: string;
  backgroundImg: string;
  posterImg: string;
  genre: string;
  year: number;
  description: string;
  rating: number;
  ratingDescription: RatingDescription;
  votesCount: number;
  director: string;
  actors: string[];
  duration: number;
  link: string;
}
