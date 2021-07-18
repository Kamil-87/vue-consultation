<template>
  <v-container>

    <h1 class="subheading grey--text mb-5">{{ isEdit ? 'Редактировать данные пациента' : 'Добавить данные пациента'}}</h1>

    <form>
      <v-text-field
          v-model="patientInfo.lastName"
          :error-messages="lastNameErrors"
          :counter="nameLength"
          label="Фамилия *"
          required
          @input="$v.patientInfo.lastName.$touch()"
          @blur="$v.patientInfo.lastName.$touch()"
      ></v-text-field>
      <v-text-field
          v-model="patientInfo.firstName"
          :error-messages="firstNameErrors"
          :counter="nameLength"
          label="Имя *"
          required
          @input="$v.patientInfo.firstName.$touch()"
          @blur="$v.patientInfo.firstName.$touch()"
      ></v-text-field>
      <v-text-field
          v-model="patientInfo.patronymic"
          :error-messages="patronymicErrors"
          :counter="nameLength"
          label="Отчество"
          @input="$v.patientInfo.patronymic.$touch()"
          @blur="$v.patientInfo.patronymic.$touch()"
      ></v-text-field>

      <v-text-field
          v-model="patientInfo.snils"
          :error-messages="snilsErrors"
          placeholder="___-___-___ __ "
          label="СНИЛС *"
          maxlength="14"
          @keyup="validateSnils"
          @input="$v.patientInfo.snils.$touch()"
          @blur="$v.patientInfo.snils.$touch()"
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
              label="Дата рождения *"
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
          label="Ваш пол *"
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
          class="mb-5"
          maxlength="3"
          label="Вес"
          @input="$v.patientInfo.weight.$touch()"
          @blur="$v.patientInfo.weight.$touch()"
      ></v-text-field>

      <v-btn
          class="mr-4"
          @click="submitHandler"
          color="primary"
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
import {required, maxLength, minLength} from 'vuelidate/lib/validators'
import {format, parseISO} from 'date-fns'
import { mapGetters} from "vuex"

const nameLength = 20

export default {
  mixins: [validationMixin],

  validations: {
    patientInfo: {
      firstName: {required, maxLength: maxLength(nameLength)},
      lastName: {required, maxLength: maxLength(nameLength)},
      patronymic: {maxLength: maxLength(nameLength)},
      snils: {required, minLength: minLength(14)},
      select: {required},
      birthday: {required},
      height: {
        validFormat: val => /^\d+$/.test(val)
      },
      weight: {
        validFormat: val => /^\d+$/.test(val)
      }
    }
  },

  data: () => ({
    nameLength: nameLength,

    text: 'Text',
    snackbar: false,
    statusMessage: '',

    patientInfo: {
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
    },
    menu: false,

    current: null,
    isEdit: false
  }),

  created() {
    this.isEdit = this.$route.params.id !== undefined
    this.current = parseInt(this.$route.params.id)
    if (this.isEdit) {
      console.log('watch', this.current)
      const patient = this.patientById(this.current)
      const birthday = patient.birthday.split('-').reverse().join('-')

      //присваиваем полям значения текущего пациента
      this.patientInfo.firstName = patient.firstName
      this.patientInfo.lastName = patient.lastName
      this.patientInfo.patronymic = patient.patronymic
      this.patientInfo.snils = patient.snils
      this.patientInfo.height = patient.height
      this.patientInfo.weight = patient.weight
      this.patientInfo.select = patient.gender
      this.patientInfo.birthday = birthday
    }
  },

  computed: {
    ...mapGetters({patientById: 'patientById'}),
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
      !this.$v.patientInfo.lastName.maxLength && errors.push(`Не больше ${nameLength} символов`)
      return errors
    },
    firstNameErrors() {
      const errors = []
      if (!this.$v.patientInfo.firstName.$dirty) return errors
      !this.$v.patientInfo.firstName.required && errors.push('Поле обязательно для заполнения')
      !this.$v.patientInfo.firstName.maxLength && errors.push(`Не больше ${nameLength} символов`)
      return errors
    },
    patronymicErrors() {
      const errors = []
      if (!this.$v.patientInfo.patronymic.$dirty) return errors
      !this.$v.patientInfo.patronymic.maxLength && errors.push(`Не больше ${nameLength} символов`)
      return errors
    },
    snilsErrors() {
      const errors = []
      if (!this.$v.patientInfo.snils.$dirty) return errors
      !this.$v.patientInfo.snils.required && errors.push('Поле обязательно для заполнения')
      !this.$v.patientInfo.snils.minLength && errors.push('Введите корректный СНИЛС')
      return errors
    },
    heightErrors() {
      const errors = []
      if (!this.$v.patientInfo.height.$dirty) return errors
      !this.$v.patientInfo.height.validFormat && errors.push('Некорректные данные, введите цифры')
      return errors
    },
    weightErrors() {
      const errors = []
      if (!this.$v.patientInfo.weight.$dirty) return errors
      !this.$v.patientInfo.weight.validFormat && errors.push('Некорректные данные, введите цифры')
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
    prepareFormData() {
      return {
        id: this.isEdit ? this.current : Date.now(),
        lastName: this.patientInfo.lastName,
        firstName: this.patientInfo.firstName,
        patronymic: this.patientInfo.patronymic,
        snils: this.patientInfo.snils,
        height: this.patientInfo.height,
        weight: this.patientInfo.weight,
        gender: this.patientInfo.select,
        birthday: this.formattedBirthday
      }
    },
    showStatusMessage(status, text) {
      const statusData = {}
      statusData.text = text
      statusData.status = status
      statusData.snackbar = true
      this.$store.dispatch('showStatusMessage', statusData)
      console.log("show message", statusData)
    },
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const formData = this.prepareFormData()
        if (this.isEdit) {
          this.$store.dispatch('updatePatient', formData)
          this.showStatusMessage('success', 'Данные успешно изменены!')
        } else {
          this.$store.dispatch('createPatient', formData)
          this.showStatusMessage('success', 'Данные успешно добавлены!')
        }

        this.goToPatientPage(formData.id)
      } catch (e) {
        console.log("Error", e)
        this.showStatusMessage('error', 'Ошибка')
      }
    },
    clear() {
      this.$v.$reset()
      this.patientInfo.lastName = ''
      this.patientInfo.firstName = ''
      this.patientInfo.patronymic = ''
      this.patientInfo.snils = ''
      this.patientInfo.height = ''
      this.patientInfo.weight = ''
      this.patientInfo.select = null
      this.patientInfo.birthday = null
    },
    validateSnils() {
      const x = this.patientInfo.snils.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/)

      this.patientInfo.snils = x[1]
      if (x[2]) {
        this.patientInfo.snils = x[1] + '-' + x[2]
      }
      if (x[3]) {
        this.patientInfo.snils = x[1] + '-' + x[2] + '-' + x[3]
      }
      if (x[4]) {
        this.patientInfo.snils = x[1] + '-' + x[2] + '-' + x[3] + ' ' + x[4]
      }
    },
    goToPatientPage(id) {
      this.$router.push({name: 'Patient', params: {id}})
    }
  },
}
</script>

<style scoped>

</style>
