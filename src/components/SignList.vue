<template>
  <div v-if="showList">
    <div v-for="(sign, index) of signs" :key="sign.id">
      <div class="card m-4">
        <div class="row">
          <div class="col align-self-center">
            <img src="/images/mazas-work.png" alt="" class="img-fluid"
                 v-if="(sign.workHours + sign.nightHours + sign.holidaysHours) >= 12">
            <img src="/images/mecanico.jpg" alt="" class="img-fluid" v-else>
          </div>
          <div class="col-md-6">
            <div class="card-body">
              <ul class="list-group">
                <li class="list-group-item">Fecha: {{ sign.date }}</li>
                <li class="list-group-item">Parte: {{ sign.workDeliveryNote }}</li>
                <li class="list-group-item">Empresa: {{ sign.companyName }}</li>
                <li class="list-group-item">Normales: {{ sign.workHours }}</li>
                <li class="list-group-item">Nocturnas: {{ sign.nightHours }}</li>
                <li class="list-group-item">Festivas: {{ sign.holidaysHours }}</li>
                <li class="list-group-item">Urgencia: {{ sign.urgency ? 'Si' : 'No' }}</li>
                <li class="list-group-item">Dormir: {{ sign.sleepAway ? 'Si' : 'No' }}</li>
              </ul>
              <div class="pt-2">
                <button class="btn btn-danger pt-2" @click="deleteSign(sign.id)">Eliminar</button>
                <button class="btn btn-secondary pt-2" @click="editSign(sign.id)">Editar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: "signList",
  computed: {
    ...mapState(['signs', 'showList'])
  },
  methods: {
    ...mapActions(['deleteSign', 'editSign']),
  },
}
</script>

<style scoped>

</style>