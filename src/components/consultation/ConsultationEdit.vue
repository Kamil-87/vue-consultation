<template>
  <v-dialog
    max-width="600"
    v-model="$store.getters.dialogVisible"
    @click:outside="$store.commit('hideDialog')"
  >
    <v-card>
      <v-card-title class="subheading grey--text mb-5">Редактировать данные консультации</v-card-title>
      <v-card-text>
        <form>
          <v-select
            v-model="consultationInfo.select"
            :items="consultationInfo.specialists"
            :error-messages="selectErrors"
            label="Выберите специалиста"
            prepend-inner-icon="mdi-account-supervisor"
            required
            @change="$v.consultationInfo.select.$touch()"
            @blur="$v.consultationInfo.select.$touch()"
          ></v-select>

          <v-menu
            v-model="menuDate"
            :close-on-content-click="false"
            max-width="290"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :value="formattedDay"
                clearable
                label="Дата консультации"
                prepend-inner-icon="mdi-calendar"
                :error-messages="dayErrors"
                readonly
                required
                v-bind="attrs"
                v-on="on"
                @click:clear="consultationInfo.day = null"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="consultationInfo.day"
              @change="menuDate = false"
              :min="dateToday"
              locale="ru-ru"
            ></v-date-picker>
          </v-menu>

          <v-menu
            ref="menuTime"
            v-model="menuTime"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="consultationInfo.time"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="consultationInfo.time"
                label="Время консультации"
                prepend-inner-icon="mdi-clock-time-four-outline"
                :error-messages="timeErrors"
                readonly
                required
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="menuTime"
              v-model="consultationInfo.time"
              :allowed-minutes="allowedStep"
              format="24hr"
              min="8:00"
              max="20:00"
              full-width
              @click:minute="$refs.menuTime.save(consultationInfo.time)"
            ></v-time-picker>
          </v-menu>

          <v-textarea
            label="Симптомы пациента"
            rows="3"
            prepend-inner-icon="mdi-comment"
            :counter="2048"
            maxlength="2048"
            v-model="consultationInfo.description"
            :error-messages="descriptionErrors"
          ></v-textarea>

          <v-btn
            class="mr-4"
            @click="submitHandler"
          >
            Добавить
          </v-btn>
          <v-btn @click="clear">
            Очистить
          </v-btn>
        </form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {validationMixin} from 'vuelidate'
import {required, maxLength} from 'vuelidate/lib/validators'
import {format, parseISO} from 'date-fns'

export default {
  mixins: [validationMixin],

  validations: {
    consultationInfo: {
      select: {required},
      day: {required},
      time: {required},
      description: {maxLength: maxLength(2048)},
    }

  },

  data() {
    return {
      menuDate: false,
      menuTime: false,

      consultationInfo: {
        day: null,
        time: null,
        select: '',
        specialists: [
          'Терапевт',
          'Стоматолог',
          'Гастроэнтеролог',
          'Невролог',
          'ЛОР',
        ],
        description: ''
      }
    }
  },
  computed: {
    selectErrors() {
      const errors = []
      if (!this.$v.consultationInfo.select.$dirty) return errors
      !this.$v.consultationInfo.select.required && errors.push('Поле обязательно для заполнения')
      return errors
    },
    dayErrors() {
      const errors = []
      if (!this.$v.consultationInfo.day.$dirty) return errors
      !this.$v.consultationInfo.day.required && errors.push('Поле обязательно для заполнения')
      return errors
    },
    timeErrors() {
      const errors = []
      if (!this.$v.consultationInfo.time.$dirty) return errors
      !this.$v.consultationInfo.time.required && errors.push('Поле обязательно для заполнения')
      return errors
    },
    descriptionErrors() {
      const errors = []
      if (!this.$v.consultationInfo.description.$dirty) return errors
      !this.$v.consultationInfo.description.maxLength && errors.push('Не больше 2048 символов')
      return errors
    },
    formattedDay() {
      return this.consultationInfo.day ? format(parseISO(this.consultationInfo.day), 'dd-MM-yyyy') : ''
    },
    dateToday() {
      return format(Date.now(), 'yyyy-MM-dd')
    }
  },
  methods: {
    // шаг по 5 минут
    allowedStep: m => m % 5 === 0,

    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const formData = {
          id: Date.now(),
          day: this.formattedDay,
          time: this.consultationInfo.time,
          specialist: this.consultationInfo.select,
        }
        console.log(formData)
        // this.loading = true
        this.$store.dispatch('createConsultation', formData)
      } catch (e) {
        console.log(e)
      }
    },
    clear() {
      this.$v.$reset()
      this.select = ''
      this.day = null
      this.time = null
      this.description = ''
    },
  }
}
</script>

<style scoped>

</style>
