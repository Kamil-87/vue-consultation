<template>
  <v-container>
    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      :color="statusMessage"
      top
      right
      min-width="250px"
      class="mt-15"
    >
      {{ text }}
    </v-snackbar>

    <h1 class="subheading grey--text mb-5">Редактировать данные пациента</h1>
    <form>
      <v-text-field
        v-model="patientInfo.lastName"
        :error-messages="lastNameErrors"
        :counter="10"
        label="Фамилия"
        required
        @input="$v.patientInfo.lastName.$touch()"
        @blur="$v.patientInfo.lastName.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="patientInfo.firstName"
        :error-messages="firstNameErrors"
        :counter="10"
        label="Имя"
        required
        @input="$v.patientInfo.firstName.$touch()"
        @blur="$v.patientInfo.firstName.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="patientInfo.patronymic"
        :error-messages="patronymicErrors"
        :counter="10"
        label="Отчество"
        @input="$v.patientInfo.patronymic.$touch()"
        @blur="$v.patientInfo.patronymic.$touch()"
      ></v-text-field>

      <v-text-field
        v-model="patientInfo.INIPA"
        :error-messages="INIPAErrors"
        placeholder="___-___-___ __ "
        label="СНИЛС"
        maxlength="11"
        @input="$v.patientInfo.INIPA.$touch()"
        @blur="$v.patientInfo.INIPA.$touch()"
      ></v-text-field>

      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        max-width="290"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            :value="formattedBirthday"
            clearable
            label="Дата рождения"
            prepend-inner-icon="mdi-calendar"
            :error-messages="birthdayErrors"
            readonly
            v-bind="attrs"
            v-on="on"
            @click:clear="patientInfo.birthday = null"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="patientInfo.birthday"
          @change="menu = false"
          locale="ru-ru"
          :max="dateToday"
        ></v-date-picker>
      </v-menu>

      <v-select
        v-model="patientInfo.select"
        :items="patientInfo.gender"
        :error-messages="selectErrors"
        label="Ваш пол"
        required
        @change="$v.patientInfo.select.$touch()"
        @blur="$v.patientInfo.select.$touch()"
      ></v-select>

      <v-text-field
        v-model="patientInfo.height"
        :error-messages="heightErrors"
        maxlength="3"
        label="Рост"
        @input="$v.patientInfo.height.$touch()"
        @blur="$v.patientInfo.height.$touch()"
      ></v-text-field>

      <v-text-field
        v-model="patientInfo.weight"
        :error-messages="weightErrors"
        maxlength="3"
        label="Вес"
        @input="$v.patientInfo.weight.$touch()"
        @blur="$v.patientInfo.weight.$touch()"
      ></v-text-field>

      <v-btn
        class="mr-4"
        @click="submitHandler"
        :loading="loading"
      >
        Сохранить
      </v-btn>
      <v-btn @click="clear">
        Очистить
      </v-btn>
    </form>
  </v-container>
</template>

<script>
import {validationMixin} from 'vuelidate'
import {required, maxLength, numeric} from 'vuelidate/lib/validators'
import {format, parseISO } from 'date-fns'
import {mapGetters} from "vuex"

export default {
  mixins: [validationMixin],

  validations: {
    patientInfo: {
      firstName: {required, maxLength: maxLength(10)},
      lastName: {required, maxLength: maxLength(10)},
      patronymic: {maxLength: maxLength(10)},
      INIPA: {required, maxLength: maxLength(11), numeric},
      height: {maxLength: maxLength(3)},
      weight: {maxLength: maxLength(3)},
      select: {required},
      birthday: {required}
    }
  },

  data: () => ({
    text: 'Text',
    snackbar: false,
    statusMessage: '',

    patientInfo: {
      birthday: null,
      lastName: '',
      firstName: '',
      patronymic: '',
      INIPA: '',
      height: '',
      weight: '',
      select: null,
      gender: [
        'Мужской',
        'Женский',
      ],
    },
    menu: false,
    loading: false,

    current: null
  }),

  watch: {
    current(id) {
      console.log('watch', id)
      const patient = this.patients.find(p => p.id === id)
      const birthday = patient.birthday.split('-').reverse().join('-')

      //присваиваем полям значения текущего пациента
      this.patientInfo.firstName = patient.firstName
      this.patientInfo.lastName = patient.lastName
      this.patientInfo.patronymic = patient.patronymic
      this.patientInfo.INIPA = patient.INIPA
      this.patientInfo.height = patient.height
      this.patientInfo.weight = patient.weight
      this.patientInfo.select = patient.gender
      this.patientInfo.birthday = birthday
    }
  },
  created() {

    this.current =this.$route.params.id
  },
  beforeDestroy() {
    this.current = null
  },

  computed: {
    ...mapGetters({patients: 'patients'}),
    selectErrors() {
      const errors = []
      if (!this.$v.patientInfo.select.$dirty) return errors
      !this.$v.patientInfo.select.required && errors.push('Поле обязательно для заполнения')
      return errors
    },
    birthdayErrors() {
      const errors = []
      if (!this.$v.patientInfo.birthday.$dirty) return errors
      !this.$v.patientInfo.birthday.required && errors.push('Поле обязательно для заполнения')
      return errors
    },
    lastNameErrors() {
      const errors = []
      if (!this.$v.patientInfo.lastName.$dirty) return errors
      !this.$v.patientInfo.lastName.required && errors.push('Поле обязательно для заполнения')
      !this.$v.patientInfo.lastName.maxLength && errors.push('Не больше 10 символов')
      return errors
    },
    firstNameErrors() {
      const errors = []
      if (!this.$v.patientInfo.firstName.$dirty) return errors
      !this.$v.patientInfo.firstName.required && errors.push('Поле обязательно для заполнения')
      !this.$v.patientInfo.firstName.maxLength && errors.push('Не больше 10 символов')
      return errors
    },
    patronymicErrors() {
      const errors = []
      if (!this.$v.patientInfo.patronymic.$dirty) return errors
      !this.$v.patientInfo.patronymic.maxLength && errors.push('Не больше 10 символов')
      return errors
    },
    INIPAErrors() {
      const errors = []
      if (!this.$v.patientInfo.INIPA.$dirty) return errors
      !this.$v.patientInfo.INIPA.required && errors.push('Поле обязательно для заполнения')
      !this.$v.patientInfo.INIPA.maxLength && errors.push('Не больше 11 символов')
      !this.$v.patientInfo.INIPA.numeric && errors.push('Только цифры')
      return errors
    },
    heightErrors() {
      const errors = []
      if (!this.$v.patientInfo.height.$dirty) return errors
      !this.$v.patientInfo.height.maxLength && errors.push('Не больше 3 символов')
      return errors
    },
    weightErrors() {
      const errors = []
      if (!this.$v.patientInfo.weight.$dirty) return errors
      !this.$v.patientInfo.weight.maxLength && errors.push('Не больше 3 символов')
      return errors
    },
    formattedBirthday() {
      return this.patientInfo.birthday ? format(parseISO(this.patientInfo.birthday), 'dd-MM-yyyy') : ''
    },
    dateToday() {
      return format(Date.now(), 'yyyy-MM-dd')
    }
  },

  methods: {
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const formData = {
          id: this.current,
          lastName: this.patientInfo.lastName,
          firstName: this.patientInfo.firstName,
          patronymic: this.patientInfo.patronymic,
          INIPA: this.patientInfo.INIPA,
          height: this.patientInfo.height,
          weight: this.patientInfo.weight,
          gender: this.patientInfo.select,
          birthday: this.formattedBirthday
        }
        // this.loading = true
        this.$store.dispatch('updatePatient', formData)
        this.text = 'Данные успешно изменены!'
        this.statusMessage = 'success'
        this.snackbar = true

      } catch (e) {
        console.log(e)
        this.text = 'Ошибка'
        this.statusMessage = 'error'
        this.snackbar = true

      }
      if(this.$v.$invalid) {

      }
    },
    clear() {
      this.$v.$reset()
      this.patientInfo.lastName = ''
      this.patientInfo.firstName = ''
      this.patientInfo.patronymic = ''
      this.patientInfo.INIPA = ''
      this.patientInfo.height = ''
      this.patientInfo.weight = ''
      this.patientInfo.select = null
      this.patientInfo.birthday = null
    },
  },
}
</script>

<style scoped>

</style>
