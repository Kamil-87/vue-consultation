import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Patients from '../views/Patients.vue'
import Patient from '../views/Patient.vue'
import PatientAdd from '../views/PatientAdd.vue'
import Consultation from '../views/Consultation.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/patients',
    name: 'Patients',
    component: Patients
  },
  {
    path: '/patientAdd',
    name: 'PatientAdd',
    component: PatientAdd
  },
  {
    path: '/patients/:id',
    name: 'Patient',
    component: Patient,
  },
  {
    path: '/consultation',
    name: 'Consultation',
    component: Consultation
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
