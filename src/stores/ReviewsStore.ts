import supabase from '@/lib/supabaseClient';
import { loadingMachine } from '@/machines/loadingMachine';
import { useMachine } from '@xstate/vue';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useAuthStore } from './AuthStore';

// eslint-disable-next-line import/prefer-default-export
export const useReviewsStore = defineStore('reviewsStore', () => {
  const { state: stateMachine, send } = useMachine(loadingMachine);
  const state = ref({
    reviews: [] as Review[],
    lastCoachId: '' as string,
  });
  const getReviews = computed(() => state.value.reviews);

  const getAuthorReviews = computed(() => (authorId: string): Review[] => {
    const reviews = state.value.reviews.filter(
      (review) => review.authorId === authorId,
    );

    return reviews;
  });

  const reviewIsFound = computed(
    () => (authorId: string) =>
      !!state.value.reviews.find(
        (review: Review) => review.authorId === authorId,
      ),
  );

  const getRate = computed(() => {
    let total = 0;
    const reviews = getReviews.value;

    if (!reviews.length) return 0;
    reviews.forEach((review) => {
      total += review.rate;
    });
    const average = total / reviews.length;
    return Math.round(average);
  });

  function setReview(review: Review) {
    state.value.reviews.unshift(review);
  }
  function clearReviews() {
    state.value.reviews = [];
  }
  function assignNewCoachId(coachId: string) {
    state.value.lastCoachId = coachId;
  }

  const shouldFetchNewData = computed(() => (currentCoachId: string) => {
    if (state.value.lastCoachId !== currentCoachId) {
      assignNewCoachId(currentCoachId);
      return true;
    }
    return false;
  });

  const getAuthorFullName = computed(() => (reviewId: string) => {
    const found = state.value.reviews.find(
      (review) => review.reviewId === reviewId,
    );
    return `${found?.firstName} ${found?.lastName}`;
  });
  const reviewIdByAuthor = computed(() => (authorId: string) => {
    const review = state.value.reviews.find(
      (review) => review.authorId === authorId,
    );

    return review?.reviewId;
  });
  const getReviewById = computed(() => (reviewId: string) => {
    const found = state.value.reviews.find(
      (review) => review.reviewId === reviewId,
    );
    return found;
  });
  async function fetchReviews(coachId: string) {
    if (shouldFetchNewData.value(coachId)) {
      clearReviews();
      send('LOAD');
    }
    if (stateMachine.value.matches('loaded')) return;
    try {
      send('LOAD');
      const { data: reviews, error } = await supabase
        .from('reviews_list_view')
        .select('*')
        .eq('userId', coachId);

      if (error) {
        send('ERROR');
        throw new Error('Error');
      }

      reviews.forEach((review: Review) => {
        setReview(review);
      });

      send('SUCCESS');
    } catch (error) {
      console.log(error);
    }
  }
  async function reloadReviews() {
    send('LOAD');
    clearReviews();
    fetchReviews(state.value.lastCoachId);
  }
  async function deleteReview(reviewId: string) {
    const authStore = useAuthStore();

    const found = state.value.reviews.find(
      (review) => review.reviewId === reviewId,
    );
    if (authStore.getUserId !== found?.authorId) return;

    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('reviewId', reviewId);

      reloadReviews();
      if (error) {
        throw new Error(`Failed! ${error.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return {
    getAuthorReviews,
    getAuthorFullName,
    getRate,
    getReviews,
    fetchReviews,
    setReview,
    reviewIsFound,
    getReviewById,
    reloadReviews,
    stateMachine,
    deleteReview,
    reviewIdByAuthor,
  };
});
