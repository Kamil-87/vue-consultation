<template>
  <v-dialog
    max-width="600"
    v-model="$store.getters.addConsultationDialogVisible"
    @click:outside="$store.commit('hideConsultationDialog')"
  >

    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
      :color="status"
      top
      min-width="250px"
      class="mt-15"
    >
      {{ text }}
    </v-snackbar>

    <v-card>
      <v-card-title class="subheading grey--text mb-5">
        {{ isEdit ? 'Редактирование консультации' : 'Добавление консультации' }}
      </v-card-title>
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
                :value="formattedDay(day)"
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
              max="19:45"
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
            v-model="symptoms"
            :error-messages="symptomsErrors"
          ></v-textarea>

          <v-btn
            class="mr-4"
            @click="submitHandler"
            color="primary"
          >
            {{ isEdit ? 'Сохранить' : 'Добавить' }}
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
import {mapGetters, mapMutations} from "vuex"

export default {
  mixins: [validationMixin],

  validations: {
    select: {required},
    day: {required},
    time: {required},
    symptoms: {maxLength: maxLength(2048)},
  },

  data() {
    return {
      text: 'Text',
      snackbar: false,
      status: '',

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
      symptoms: '',
      isEdit: false
    }
  },
  watch: {
    currentConsultationId() {
      this.refreshConsultation(this.currentConsultationId)
    }
  },
  computed: {
    ...mapGetters('consultation', ['currentConsultationId', 'consultationById', 'addConsultationDialogVisible', 'consultations']),
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
    symptomsErrors() {
      const errors = []
      if (!this.$v.symptoms.$dirty) return errors
      !this.$v.symptoms.maxLength && errors.push('Не больше 2048 символов')
      return errors
    },

    dateToday() {
      return format(Date.now(), 'yyyy-MM-dd')
    },
  },
  methods: {
    ...mapMutations('consultation', ['hideConsultationDialog']),
    // шаг по 15 минут
    allowedStep: m => m % 15 === 0,

    formattedDay(day) {
      return day ? format(parseISO(day), 'dd-MM-yyyy') : ''
    },

    formatToIso(day) {
      return day.split('-').reverse().join('-')
    },

    showStatusMessage(status, text) {
      const statusData = {}
      statusData.text = text
      statusData.status = status
      statusData.snackbar = true

      this.$store.dispatch('showStatusMessage', statusData)
      console.log("show message", statusData)
    },

    refreshConsultation(currentConsultationId) {
      this.isEdit = currentConsultationId !== null
      if (this.isEdit) {
        const consultation = this.consultationById(currentConsultationId)
        this.select = consultation.specialist
        this.day = this.formatToIso(consultation.day)
        this.time = consultation.time
        this.symptoms = consultation.symptoms
      } else {
        this.select = ''
        this.day = ''
        this.time = ''
        this.symptoms = ''
      }
    },

    //запрет добавления, при условии, если уже существует консультация для пациента в это же время
    timeIsNotSelected() {
      const date = new Date(`${this.day}T${this.time}`)
      return this.consultations.find(c => {
        const datePatient = new Date(`${this.formatToIso(c.day)}T${c.time}`)
        return datePatient.getTime() === date.getTime()
      })
    },

    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const formData = {
          id: this.isEdit ? this.currentConsultationId : Date.now(),
          day: this.formattedDay(this.day),
          time: this.time,
          symptoms: this.symptoms,
          specialist: this.select,
          idUser: parseInt(this.$route.params.id)
        }

        console.log(this.timeIsNotSelected())

        if(!(this.timeIsNotSelected() === undefined)) {
          this.text = 'Время занято, выберите другое время'
          this.status = 'warning'
          this.snackbar = true
          return
        }

        if (this.isEdit) {
          this.$store.dispatch('updateConsultation', formData)
          // this.showStatusMessage('success', 'Данные успешно обновлены!')

          //заглушка
          this.text = 'Данные успешно обновлены!'
          this.status = 'success'
          this.snackbar = true
        } else {
          this.$store.dispatch('createConsultation', formData)
          // this.showStatusMessage('success', 'Данные успешно добавлены!')

          //заглушка
          this.text = 'Данные успешно добавлены!'
          this.status = 'success'
          this.snackbar = true
        }

        setTimeout(() => this.hideConsultationDialog(), 2000)
      } catch (e) {
        console.log(e)
        this.text = 'Ошибка'
        this.status = 'error'
        this.snackbar = true
        setTimeout(() => this.hideConsultationDialog(), 2000)
      }
    },
    clear() {
      this.$v.$reset()
      this.select = ''
      this.day = null
      this.time = null
      this.symptoms = ''
    },
  }
}
</script>

<style scoped>

</style>
