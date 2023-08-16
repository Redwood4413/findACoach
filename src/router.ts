import {
  createWebHistory, createRouter, RouteLocationNormalized, NavigationGuardNext,
} from 'vue-router';
import CoachDetails from './components/coaches/CoachDetails.vue';
import CoachList from './components/coaches/CoachList.vue';
import CoachRegistration from './components/coaches/CoachRegistration.vue';
import NotFound from './components/NotFound.vue';
import NoPermissions from './components/NoPermissions.vue';
import CoachContact from './components/coaches/CoachContact.vue';
import CoachReviews from './components/coaches/CoachReviews.vue';
import RequestsReceived from './components/requests/RequestsReceived.vue';
import CoachWrapper from './components/coaches/CoachWrapper.vue';
import CoachAddReview from './components/coaches/CoachAddReview.vue';
import CoachEditReview from './components/coaches/CoachEditReview.vue';
import { useReviewsStore } from './stores/ReviewsStore';
import { useAuthStore } from './stores/AuthStore';
import { useRequestsStore } from './stores/RequestsStore';

const routes = [
  {
    name: 'home',
    path: '/',
    redirect: '/coaches',
  },
  {
    name: 'coaches',
    path: '/coaches',
    component: CoachList,
    children: [{
      name: 'coach',
      path: '/coach',
      redirect: '/coaches',
      component: CoachWrapper,
      beforeEnter: (
        to: RouteLocationNormalized,
        _: RouteLocationNormalized,
        next: NavigationGuardNext,
      ) => {
        const reviewsStore = useReviewsStore();
        reviewsStore.fetchReviews(to.params.id as string);

        next();
      },
      children: [{
        name: 'details',
        path: ':id',
        component: CoachDetails,
        props: true,
        meta: { transition: 'slide' },
      },
      {
        name: 'contact',
        path: ':id/contact',
        component: CoachContact,
        props: true,
        meta: { transition: 'slide' },
      },
      {
        name: 'reviews',
        path: ':id/reviews',
        component: CoachReviews,
        props: true,
      },
      {
        name: 'edit-review',
        path: ':id/reviews/edit-review/:reviewId',
        component: CoachEditReview,
        beforeEnter: async (
          to: RouteLocationNormalized,
          _: RouteLocationNormalized,
          next: NavigationGuardNext,
        ) => {
          const reviewsStore = useReviewsStore();
          const authStore = useAuthStore();

          await reviewsStore.fetchReviews(to.params.id as string);
          const review = reviewsStore.getReviewById(to.params.reviewId as string);

          if (!review) {
            next({ name: 'not-found' });
            return;
          }

          if (review.authorId === authStore.getUserId) {
            next();
          } else {
            next({ name: 'no-permissions' });
          }
        },
        props: true,
      },
      {
        name: 'add-review',
        path: ':id/add-review',
        component: CoachAddReview,
        props: true,
      }],
    },
    ],
  },

  {
    name: 'register-coach',
    path: '/register',
    component: CoachRegistration,
  },
  {
    name: 'requests',
    path: '/requests',
    component: RequestsReceived,
    beforeEnter: (to, from, next) => {
      const requestsStore = useRequestsStore();
      const authStore = useAuthStore();

      requestsStore.fetchRequests(authStore.getUserId);
      next();
    },
  },
  {
    name: 'no-permissions',
    component: NoPermissions,
    path: '/no-permissions',
  },
  {
    name: 'not-found',
    path: '/:notFound(.*)',
    component: NotFound,
    props: { element: 'Page' },
  },
];

const router = createRouter({
  history: createWebHistory('findACoach'),
  routes,
  // scrollBehavior(to) {

  //   return {
  //     top: 0,
  //     behavior: 'smooth',
  //   };
  // },

});

export default router;
