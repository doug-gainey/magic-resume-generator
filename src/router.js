import {createRouter, createWebHistory} from 'vue-router';
import Home from './pages/Home.vue';
import Resume from './pages/Resume.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/resume/:resumeId?',
    name: 'resume',
    component: Resume
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
