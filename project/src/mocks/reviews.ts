import {Review} from '../types/ReviewType';

export const mockReviews: Review[] = [
  {
    id: 1,
    rating: 7,
    date: 'Mon Dec 04 2022 21:48:20 GMT+0500 (Екатеринбург, стандартное время)',
    comment: 'Great film!',
    author: {
      id: 5,
      name: 'Rosaline'
    }
  },
  {
    id: 2,
    rating: 9,
    date: 'Mon Dec 04 2022 21:48:20 GMT+0500 (Екатеринбург, стандартное время)',
    comment: 'Wow!',
    author: {
      id: 6,
      name: 'Narciss'
    }
  }
];
