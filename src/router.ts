import { createWebHistory, createRouter } from 'vue-router';
import CoachDetails from './components/coaches/CoachDetails.vue';
import CoachList from './components/coaches/CoachList.vue';
import CoachRegistration from './components/coaches/CoachRegistration.vue';
import NotFound from './components/NotFound.vue';
import CoachContact from './components/coaches/CoachContact.vue';
import ContactReviews from './components/coaches/CoachReviews.vue';
import RequestsReceived from './components/requests/RequestsReceived.vue';
import CoachWrapper from './components/coaches/CoachWrapper.vue';
import CoachAddReview from './components/coaches/CoachAddReview.vue';

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
        component: ContactReviews,
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
  },
  {
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
