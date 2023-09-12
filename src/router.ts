import {
  createWebHistory,
  createRouter,
  RouteRecordRaw,
} from 'vue-router';

const CoachDetails = () =>
  import('./components/coaches/CoachDetails.vue');
const CoachList = () => import('./components/coaches/CoachList.vue');
const CoachRegistration = () =>
  import('./components/coaches/CoachRegistration.vue');
const NotFound = () => import('./components/NotFound.vue');
const NoPermissions = () => import('./components/NoPermissions.vue');
const CoachContact = () =>
  import('./components/coaches/CoachContact.vue');
const CoachReviews = () =>
  import('./components/coaches/CoachReviews.vue');
const RequestsReceived = () =>
  import('./components/requests/RequestsReceived.vue');
const CoachWrapper = () =>
  import('./components/coaches/CoachWrapper.vue');
const CoachAddReview = () =>
  import('./components/coaches/CoachAddReview.vue');
const CoachEditReview = () =>
  import('./components/coaches/CoachEditReview.vue');
const UserEditProfile = () =>
  import('@/components/user/UserEditProfile.vue');

const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    redirect: '/coaches',
  },
  {
    name: 'coaches',
    path: '/coaches',
    component: CoachList,
    children: [
      {
        name: 'coach',
        path: '/coach',
        redirect: '/coaches',
        meta: { isDialog: true },
        component: CoachWrapper,
        children: [
          {
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
            name: 'reviews',
            path: ':id/reviews',
            component: CoachReviews,
            props: true,
          },
          {
            name: 'edit-review',
            path: ':id/reviews/edit-review/:reviewId',
            component: CoachEditReview,
            props: true,
          },
          {
            name: 'add-review',
            path: ':id/add-review',
            component: CoachAddReview,
            props: true,
          },
        ],
      },
    ],
  },

  {
    name: 'register-coach',
    path: '/become-a-coach',
    component: CoachRegistration,
  },
  {
    name: 'requests',
    path: '/your-requests',
    component: RequestsReceived,
  },
  // { name: 'profile',
  // path: '/my-profile',
  // component: UserProfile,
  // children: []
  // },
  {
    // /\
    name: 'edit-profile',
    path: '/edit-profile',
    component: UserEditProfile,
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
});

export default router;
