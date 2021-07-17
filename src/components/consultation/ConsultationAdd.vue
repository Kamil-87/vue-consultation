<template>
  <v-dialog
      max-width="600"
      v-model="$store.getters.addConsultationDialogVisible"
      @click:outside="$store.commit('hideConsultationDialog')"
  >
    <v-snackbar
        v-model="snackbar"
        :timeout="3000"
        :color="statusMessage"
        top
        min-width="250px"
        class="mt-15"
    >
      {{ text }}
    </v-snackbar>
    <v-card>
      <v-card-title class="subheading grey--text mb-5">Добавление консультации</v-card-title>
      <v-card-text>
        <form>
          <v-select
              v-model="select"
              :items="specialists"
              :error-messages="selectErrors"
              label="Выберите специалиста"
              prepend-inner-icon="mdi-account-supervisor"
              required
              @change="$v.select.$touch()"
              @blur="$v.select.$touch()"
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
                  @click:clear="day = null"
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="day"
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
              :return-value.sync="time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="time"
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
                v-model="time"
                :allowed-minutes="allowedStep"
                format="24hr"
                min="8:00"
                max="20:00"
                full-width
                @click:minute="$refs.menuTime.save(time)"
            ></v-time-picker>
          </v-menu>

          <v-textarea
              label="Симптомы"
              rows="3"
              prepend-inner-icon="mdi-comment"
              :counter="2048"
              maxlength="2048"
              v-model="description"
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
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  mixins: [validationMixin],

  validations: {
    select: {required},
    day: {required},
    time: {required},
    description: {maxLength: maxLength(2048)},
  },

  data() {
    return {
      text: 'Text',
      snackbar: false,
      statusMessage: '',

      menuDate: false,
      menuTime: false,
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
      description: '',
      isEdit: false
    }
  },
  watch: {
    currentConsultationId() {
      this.refreshConsultation(this.currentConsultationId)
    }
  },
  computed: {
    ...mapGetters(['currentConsultationId', 'consultationById', 'addConsultationDialogVisible']),
    selectErrors() {
      const errors = []
      if (!this.$v.select.$dirty) return errors
      !this.$v.select.required && errors.push('Поле обязательно для заполнения')
      return errors
    },
    dayErrors() {
      const errors = []
      if (!this.$v.day.$dirty) return errors
      !this.$v.day.required && errors.push('Поле обязательно для заполнения')
      return errors
    },
    timeErrors() {
      const errors = []
      if (!this.$v.time.$dirty) return errors
      !this.$v.time.required && errors.push('Поле обязательно для заполнения')
      return errors
    },
    descriptionErrors() {
      const errors = []
      if (!this.$v.description.$dirty) return errors
      !this.$v.description.maxLength && errors.push('Не больше 2048 символов')
      return errors
    },
    formattedDay() {
      return this.day ? format(parseISO(this.day), 'dd-MM-yyyy') : ''
    },
    dateToday() {
      return format(Date.now(), 'yyyy-MM-dd')
    }
  },
  methods: {
    ...mapMutations(['hideConsultationDialog']),
    // шаг по 5 минут
    allowedStep: m => m % 5 === 0,

    formatToIso(day) {
      return day.split('-').reverse().join('-')
    },

    refreshConsultation(currentConsultationId) {
      this.isEdit = currentConsultationId !== null
      if (this.isEdit) {
        const consultation = this.consultationById(currentConsultationId)
        this.select = consultation.specialist
        this.day = this.formatToIso(consultation.day)
        this.time = consultation.time
        this.description = consultation.symptoms
      } else {
        this.select = ''
        this.day = ''
        this.time = ''
        this.description = ''
      }
    },

    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const formData = {
          id: this.isEdit ? this.currentConsultationId : Date.now(),
          day: this.formattedDay,
          time: this.time,
          specialist: this.select,
        }
        if (this.isEdit) {
          this.$store.dispatch('updateConsultation', formData)
          this.text = 'Данные успешно обновлены!'
        } else {
          this.$store.dispatch('createConsultation', formData)
          this.text = 'Данные успешно добавлены!'
        }
        this.statusMessage = 'success'
        this.snackbar = true
        this.hideConsultationDialog()

      } catch (e) {
        console.log(e)
        this.text = 'Ошибка'
        this.statusMessage = 'error'
        this.snackbar = true
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
