import { createWebHistory, createRouter } from 'vue-router';
import CoachDetails from './components/coaches/CoachDetails.vue';
import CoachList from './components/coaches/CoachList.vue';
import CoachRegistration from './components/coaches/CoachRegistration.vue';
import NotFound from './components/NotFound.vue';
import CoachContact from './components/coaches/CoachContact.vue';
import ContactReview from './components/coaches/CoachReview.vue';
import RequestsReceived from './components/requests/RequestsReceived.vue';

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
      name: 'details',
      path: ':id',
      component: CoachDetails,
      props: true,
    },
    {
      name: 'contact',
      path: ':id/contact',
      component: CoachContact,
      props: true,
    },
    {
      name: 'review',
      path: ':id/review',
      component: ContactReview,
      props: true,
    }],
  },

  {
    name: 'register',
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
  history: createWebHistory(),
  routes,
});

export default router;
