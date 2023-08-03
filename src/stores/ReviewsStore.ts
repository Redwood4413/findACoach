import { defineStore } from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useReviewsStore = defineStore('reviewsStore', {
  state: () => ({
    reviews: [] as Review[],
  }),
  getters: {
    getReviews() {
      return (coachId: string): Review[] => {
        const reviews = this.reviews.filter((review) => review.coachId === coachId);

        return reviews;
      };
    },
    getAuthorReviews() {
      return (authorId: string): Review[] => {
        const reviews = this.reviews.filter((review) => review.authorId === authorId);

        return reviews;
      };
    },
    getRate() {
      return (coachId: string): number => {
        let total = 0;
        const reviews = this.getReviews(coachId);

        if (!reviews.length) return 0;
        reviews.forEach((review) => {
          total += review.rate;
        });
        const average = total / reviews.length;
        return Math.round(average);
      };
    },
    getReviewsQuantity() {
      return (coachId: string): number => this.getReviews(coachId).length;
    },
  },
  actions: {
    async fetchReviews(coachId: string) {
      const url = `${import.meta.env.VITE_FIREBASE_URL}/reviews/${coachId}.json`;
      try {
        const response = await fetch(url);
        const parsedResponse = await response.json();
        console.log(parsedResponse);

        if (!response.ok) {
          throw new Error('Error');
        }

        Object.keys(parsedResponse).forEach((key) => {
          this.setReview(parsedResponse[key]);
        });
      } catch (error) {
        console.log(error);
      }
    },
    setReview(review: Review) {
      this.reviews.push(review);
    },
  },
});
