import { createRouter, createWebHistory } from 'vue-router';

/** Admin **/
import AdminView from '@/views/AdminView.vue';
import RegisterPage from '@/components/admin/session/register/RegisterPage';

const routes = [
  {
    path: '/',
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView,
    children: [
      { path: 'register', component: RegisterPage },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
