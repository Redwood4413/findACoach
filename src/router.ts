import { createWebHistory, createRouter } from 'vue-router';
import CoachDetails from './components/coaches/CoachDetails.vue';
import CoachList from './components/coaches/CoachList.vue';
import CoachRegistration from './components/coaches/CoachRegistration.vue';
import NotFound from './components/NotFound.vue';
import ContactCoach from './components/requests/ContactCoach.vue';
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
  },
  {
    path: '/coaches/:id',
    component: CoachDetails,
    children: [
      {
        name: 'contact',
        path: 'contact',
        component: ContactCoach,
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
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
