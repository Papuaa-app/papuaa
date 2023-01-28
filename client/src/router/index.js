
import { useSessionStore } from '@/store/session';
import { createRouter, createWebHistory } from 'vue-router';

/** Session **/
const RegisterPage = import('@/components/admin/session/register/RegisterPage');
const LoginPage = import('@/components/admin/session/login/LoginPage');

/** Admin **/
const AdminView = import('@/views/AdminView');
const AdminLayout = import('@/layouts/admin/AdminLayout');
const AdminHome = import('@/components/admin/home/AdminHome');

/** Hotel **/
const HotelInformation = import('@/components/admin/hotel/HotelInformation.vue');

/** Hotel Group **/
const CreateNewHotelGroup = import('@/components/admin/hotel-group/CreateNewHotelGroup.vue');
const HotelGroupAdmin = import('@/components/admin/hotel-group/HotelGroupAdmin.vue');
const HotelGroupForm = import('@/components/admin/hotel-group/HotelGroupForm.vue');

/** Hotel **/
const CreateNewHotel = import('@/components/admin/hotel/CreateNewHotel.vue');
const HotelAdmin = import('@/components/admin/hotel/HotelAdmin.vue');
const HotelForm = import('@/components/admin/hotel/HotelForm.vue');

/** User **/
const UserExtra = import('@/components/admin/user/UserExtra.vue');

const authenticated = JSON.parse(localStorage.getItem('authenticated'));
const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));

const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect:  () => {
      if (authenticated) {
        if (isAdmin) {
          return { name: 'Admin' };
        }
        // TODO - user home
        return { name: 'Admin'  };
      } else {
        if (isAdmin) {
          return { name: 'AdminLogin' };
        }
        // TODO - user login
        return { name: 'AdminLogin' };
      }
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => AdminView,
    redirect: { name: 'AdminLayout' },
    children: [
      {
        path: 'register',
        name: 'AdminRegister',
        component: () => RegisterPage,
      },
      {
        path: 'login',
        name: 'AdminLogin',
        component: () => LoginPage,
      },
      {
        path: '',
        name: 'AdminLayout',
        meta: {
          requiresAuth: true,
        },
        component: () => AdminLayout,
        redirect: { name: 'AdminHome' },
        children: [
          {
            path: 'home',
            name: 'AdminHome',
            component: () => AdminHome,
            redirect: { name: 'HotelInformation' },
            children: [
              {
                path: 'info',
                name: 'HotelInformation',
                components: {
                  default: () => HotelInformation,
                  extra: () => UserExtra,
                },
              },
            ],
          },
          {
            path: 'hotel-groups',
            name: 'HotelGroupAdmin',
            component: () => HotelGroupAdmin,
            children: [
              {
                path: 'create',
                name: 'CreateHotelGroup',
                component: () => HotelGroupForm,
              },
            ]
          },
          {
            path: 'hotels',
            name: 'HotelAdmin',
            component: () => HotelAdmin,
            children: [
              {
                path: 'create',
                name: 'CreateHotel',
                component: () => HotelForm,
              },
            ]
          },
        ],
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authenticated = localStorage.getItem('authenticated');
  const store = useSessionStore();
  const requiresAuth = to.matched.some(route => route.meta.requiresAuth);
  if (requiresAuth && !authenticated) {
    // TODO - Login user
    console.log('try logout');
    await store.logout();
  }
  next();
});

export default router;
