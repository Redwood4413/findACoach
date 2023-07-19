import { defineStore } from 'pinia';

export interface Review {
  coachId: string,
  authorId: string,
  description: string,
  rate: number,
}
type Id = string | null;
// eslint-disable-next-line import/prefer-default-export
export const useReviewsStore = defineStore('reviewsStore', {
  state: () => ({
    reviews: [{
      coachId: 'c1',
      authorId: 'u1',
      description: 'Coach with a great knowledge.',
      rate: 5,
    },
    {
      coachId: 'c1',
      authorId: 'u2',
      description: 'Coach with a great knowledge.',
      rate: 4,
    }] as Review[],
  }),
  getters: {
    getReviews() {
      return (coachId?: Id, authorId?: Id): Review[] => {
        if (!coachId && !authorId) {
          throw new Error('At least 1 argument is needed!');
        }
        const reviews = this.reviews.filter((review) => (coachId ? review.coachId === coachId
          : review.authorId === authorId));
        return reviews;
      };
    },
  },
});
