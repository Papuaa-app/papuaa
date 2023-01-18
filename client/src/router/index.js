import { createRouter, createWebHistory } from 'vue-router';

/** Admin **/
import AdminView from '@/views/AdminView.vue';
const RegisterPage = import('@/components/admin/session/register/RegisterPage');
const LoginPage = import('@/components/admin/session/login/LoginPage');
const AdminLayout = import('@/layouts/admin/AdminLayout');

/** Hotel **/
const HotelInformation = import('@/components/admin/hotel/HotelInformation.vue');
const CreateNewHotelGroup = import('@/components/admin/hotel/CreateNewHotelGroup.vue');

const routes = [
  {
    path: '/',
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView,
    children: [
      {
        path: 'register',
        name: 'adminRegister',
        component: () => RegisterPage,
      },
      {
        path: 'login',
        name: 'adminLogin',
        component: () => LoginPage,
      },
      {
        path: 'home',
        name: 'adminHome',
        meta: {
          requiresAuth: true,
        },
        component: () => AdminLayout,
        redirect: { name: 'hotelInformation' },
        children: [
          {
            path: 'info',
            name: 'hotelInformation',
            component: () => HotelInformation,
          },
          {
            path: 'wizard',
            name: 'hotelWizard',
            component: () => CreateNewHotelGroup,
          },
        ],
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authenticated = localStorage.getItem('authenticated');
  if (to.meta.requiresAuth && !authenticated) {
    next('login');
  } else {
    next();
  }
});

export default router;
