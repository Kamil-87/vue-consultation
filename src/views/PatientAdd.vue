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

    <h1 class="subheading grey--text mb-5">Добавить пациента</h1>
    <form>
      <v-text-field
        v-model="lastName"
        :error-messages="lastNameErrors"
        :counter="10"
        label="Фамилия"
        required
        @input="$v.lastName.$touch()"
        @blur="$v.lastName.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="firstName"
        :error-messages="firstNameErrors"
        :counter="10"
        label="Имя"
        required
        @input="$v.firstName.$touch()"
        @blur="$v.firstName.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="patronymic"
        :error-messages="patronymicErrors"
        :counter="10"
        label="Отчество"
        @input="$v.patronymic.$touch()"
        @blur="$v.patronymic.$touch()"
      ></v-text-field>

      <v-text-field
        v-model="snils"
        :error-messages="snilsErrors"
        placeholder="___-___-___ __"
        label="СНИЛС"
        maxlength="14"
        @keyup="validateSnils"
        @input="$v.snils.$touch()"
        @blur="$v.snils.$touch()"
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
            @click:clear="birthday = null"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="birthday"
          @change="menu = false"
          locale="ru-ru"
          :max="dateToday"
        ></v-date-picker>
      </v-menu>

      <v-select
        v-model="select"
        :items="gender"
        :error-messages="selectErrors"
        label="Ваш пол"
        required
        @change="$v.select.$touch()"
        @blur="$v.select.$touch()"
      ></v-select>

      <v-text-field
        v-model="height"
        :error-messages="heightErrors"
        maxlength="3"
        label="Рост"
        @input="$v.height.$touch()"
        @blur="$v.height.$touch()"
      ></v-text-field>

      <v-text-field
        v-model="weight"
        :error-messages="weightErrors"
        maxlength="3"
        label="Вес"
        @input="$v.weight.$touch()"
        @blur="$v.weight.$touch()"
      ></v-text-field>

      <v-btn
        class="mr-4"
        @click="submitHandler"
        :loading="loading"
      >
        Добавить
      </v-btn>
      <v-btn @click="clear">
        Очистить
      </v-btn>
    </form>
  </v-container>
</template>

<script>
import {validationMixin} from 'vuelidate'
import {required, maxLength, minLength} from 'vuelidate/lib/validators'
import {format, parseISO} from 'date-fns'

export default {
  mixins: [validationMixin],

  validations: {
    firstName: {required, maxLength: maxLength(10)},
    lastName: {required, maxLength: maxLength(10)},
    patronymic: {maxLength: maxLength(10)},
    snils: {required, minLength: minLength(14)},
    height: {maxLength: maxLength(3)},
    weight: {maxLength: maxLength(3)},
    select: {required},
    birthday: {required}
  },

  data: () => ({
    text: 'Text',
    snackbar: false,
    statusMessage: '',

    birthday: null,
    lastName: '',
    firstName: '',
    patronymic: '',
    snils: '',
    height: '',
    weight: '',
    select: null,
    gender: [
      'Мужской',
      'Женский',
    ],

    menu: false,
    loading: false
  }),

  computed: {
    selectErrors() {
      const errors = []
      if (!this.$v.select.$dirty) return errors
      !this.$v.select.required && errors.push('Поле обязательно для заполнения')
      return errors
    },
    birthdayErrors() {
      const errors = []
      if (!this.$v.birthday.$dirty) return errors
      !this.$v.birthday.required && errors.push('Поле обязательно для заполнения')
      return errors
    },
    lastNameErrors() {
      const errors = []
      if (!this.$v.lastName.$dirty) return errors
      !this.$v.lastName.required && errors.push('Поле обязательно для заполнения')
      !this.$v.lastName.maxLength && errors.push('Не больше 10 символов')
      return errors
    },
    firstNameErrors() {
      const errors = []
      if (!this.$v.firstName.$dirty) return errors
      !this.$v.firstName.required && errors.push('Поле обязательно для заполнения')
      !this.$v.firstName.maxLength && errors.push('Не больше 10 символов')
      return errors
    },
    patronymicErrors() {
      const errors = []
      if (!this.$v.patronymic.$dirty) return errors
      !this.$v.patronymic.maxLength && errors.push('Не больше 10 символов')
      return errors
    },
    snilsErrors() {
      const errors = []
      if (!this.$v.snils.$dirty) return errors
      !this.$v.snils.required && errors.push('Поле обязательно для заполнения')
      !this.$v.snils.minLength && errors.push('Введите корректный СНИЛС')
      return errors
    },
    heightErrors() {
      const errors = []
      if (!this.$v.height.$dirty) return errors
      !this.$v.height.maxLength && errors.push('Не больше 3 символов')
      return errors
    },
    weightErrors() {
      const errors = []
      if (!this.$v.weight.$dirty) return errors
      !this.$v.weight.maxLength && errors.push('Не больше 3 символов')
      return errors
    },
    formattedBirthday() {
      return this.birthday ? format(parseISO(this.birthday), 'dd-MM-yyyy') : ''
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
          id: Date.now(),
          lastName: this.lastName,
          firstName: this.firstName,
          patronymic: this.patronymic,
          snils: this.snils,
          height: this.height,
          weight: this.weight,
          gender: this.select,
          birthday: this.formattedBirthday
        }
        // this.loading = true
        this.$store.dispatch('createPatient', formData)
        this.text = 'Данные успешно добавлены!'
        this.statusMessage = 'success'
        this.snackbar = true
        this.clear()
        // this.$router.push('/')
      } catch (e) {
        console.log(e)
        this.text = 'Ошибка'
        this.statusMessage = 'error'
        this.snackbar = true
      }

    },
    clear() {
      this.$v.$reset()
      this.lastName = ''
      this.firstName = ''
      this.patronymic = ''
      this.snils = ''
      this.height = ''
      this.weight = ''
      this.select = null
      this.birthday = null
    },
    validateSnils() {
      const x = this.snils.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/)

      this.snils = x[1]
      if (x[2]) {
        this.snils = x[1] + '-' + x[2]
      }
      if (x[3]) {
        this.snils = x[1] + '-' + x[2] + '-' + x[3]
      }
      if (x[4]) {
        this.snils = x[1] + '-' + x[2] + '-' + x[3] + ' ' + x[4]
      }
    }
  },
}
</script>

<style scoped>

</style>
