import Vue from 'vue'
import VueRouter from 'vue-router'
import Patients from '../views/Patients.vue'
import Patient from '../views/Patient.vue'
import PatientAddOrEdit from '../views/PatientAddOrEdit.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Patients',
    component: Patients
  },
  {
    path: '/patient-add',
    name: 'PatientAdd',
    component: PatientAddOrEdit
  },
  {
    path: '/patient-edit',
    name: 'PatientEdit',
    component: PatientAddOrEdit
  },
  {
    path: '/patients/:id',
    name: 'Patient',
    component: Patient,
  },
  {
    path: '/*',
    name: 'notFound',
    component: NotFound
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
