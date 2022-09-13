<template>
  <div class="form-group">
    <label for="work-date">Fecha de Trabajo</label>
    <input
        v-model="sign.date"
        type="date"
        class="form-control"
        id="work-date"
    />
  </div>
  <div class="form-group">
    <label for="work-delivery-note">Parte de Trabajo</label>
    <input
        v-model.number="sign.workDeliveryNote"
        type="number"
        id="work-delivery-note"
        class="form-control"
    />
  </div>
  <div class="form-group">
    <label for="company-name">Nombre de Empresa</label>
    <input
        v-model="sign.companyName"
        type="text"
        id="company-name"
        class="form-control"
    />
  </div>
  <div class="form-group">
    <label for="work-hours">Horas Normales</label>
    <input
        v-model.number="sign.workHours"
        type="number"
        id="work-hours"
        class="form-control"
        step="0.1"    />
  </div>
  <div class="form-group">
    <label for="night-hours">Horas Nocturnas</label>
    <input
        v-model.number="sign.nightHours"
        type="number"
        id="night-hours"
        class="form-control"
        step="0.1"
    />
  </div>
  <div class="form-group">
    <label for="holiday-hours">Horas Festivas</label>
    <input
        v-model.number="sign.holidaysHours"
        type="number"
        id="holiday-hours"
        class="form-control"
        step="0.1">
  </div>
  <div class="form-check form-switch form-check-inline">
    <input
        class="form-check-input"
        type="checkbox"
        id="flexSwitchUrgencia"
        v-model="sign.urgency"
    >
    <label class="form-check-label" for="flexSwitchUrgencia">Urgencia</label>
  </div>
  <div class="form-check form-switch form-check-inline">
    <input
        class="form-check-input"
        type="checkbox"
        id="flexSwitchSleep"
        v-model="sign.sleepAway"
    >
    <label class="form-check-label" for="flexSwitchSleep">Dormir Fuera</label>
  </div>
  <button
      class="btn btn-primary btn-block mt-3"
      type="submit"
      :disabled="btnBlock"
  >
    {{btnText}}
  </button>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: "Input",
  computed: {
    ...mapState(['sign', 'editStatus']),
    btnText(){
      return !this.editStatus ? 'Fichar' : 'Actualizar';
    },
    btnBlock(){
      return this.sign.companyName.trim()===''
    }
  }
}
</script>

<style scoped>

</style>