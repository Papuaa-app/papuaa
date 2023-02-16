import { useSessionStore } from '@/store/session';
import { createRouter, createWebHistory } from 'vue-router';
import ls from '@/composables/localStorage';

/** Session **/
const RegisterPage = import('@/components/admin/session/register/RegisterPage');
const LoginPage = import('@/components/admin/session/login/LoginPage');

/** Admin **/
const AdminView = import('@/views/AdminView');
const AdminLayout = import('@/layouts/admin/AdminLayout');
const AdminHome = import('@/components/admin/home/AdminHome');
const UserExtra = import('@/components/admin/user/UserExtra');
const AdminSettings = import('@/components/admin/user/Settings');
const AdminSettingsOrganizations = import('@/components/admin/user/SettingsOrganizations');
/** Hotel **/
const HotelInformation = import('@/components/admin/hotel/HotelInformation');
/** Hotel Group **/
const HotelGroupAdmin = import('@/components/admin/hotel-group/HotelGroupAdmin');
const HotelGroupForm = import('@/components/admin/hotel-group/HotelGroupForm');
/** Hotel **/
const HotelAdmin = import('@/components/admin/hotel/HotelAdmin');
const HotelForm = import('@/components/admin/hotel/HotelForm');
const HotelAdminHome = import('@/components/admin/hotel/HotelAdminHome');


const authenticated = ls.get('authenticated');
const isAdmin = ls.get('isAdmin');

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
                path: '',
                name: 'HotelAdminHome',
                component: () => HotelAdminHome,
              },
              {
                path: 'create',
                name: 'CreateHotel',
                component: () => HotelForm,
              },
            ]
          },
          {
            path: 'settings',
            name: 'AdminSettings',
            meta: {
              isDrawerCollapsed: true,
            },
            component: () => AdminSettings,
            redirect: { name: 'AdminSettingsOrganizations' },
            children: [
              {
                path: 'organizations',
                name: 'AdminSettingsOrganizations',
                component: () => AdminSettingsOrganizations,
              },
            ],
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
  const authenticated = ls.get('authenticated');
  const store = useSessionStore();
  const requiresAuth = to.matched.some(route => route.meta.requiresAuth);
  if (!authenticated && requiresAuth) {
    await store.logout();
  }
  next();
});

export default router;
