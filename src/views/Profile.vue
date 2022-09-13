<template>
  <main class="d-flex justify-content-center">
    <div class="container">
      <div class="m-4" v-if="showProfile">
        <div class="pt-2">
          <div class="card">
            <div class="card-body">
              <h1>{{ titleStatus }}</h1>
              <form @submit.prevent="formSubmit">
                <div class="form-group">
                  <label for="base-salary">Salario Base Bruto</label>
                  <input
                      v-model="this.payrollData.baseSalary"
                      type="number"
                      class="form-control"
                      id="base-salary"
                      :disabled="inputBlock"
                  />
                  <label for="irpf">IRPF %</label>
                  <input
                      v-model="this.payrollData.irpf"
                      type="number"
                      class="form-control"
                      id="irpf"
                      :disabled="inputBlock"
                  />
                  <label for="ss">Seguridad Social %</label>
                  <input
                      v-model="this.payrollData.ss"
                      type="number"
                      class="form-control"
                      id="ss"
                      :disabled="inputBlock"
                  />

                  <button
                      class="btn btn-primary btn-block mt-3"
                      type="submit"
                  >
                    {{btnText}}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <SignList/>
    </div>
  </main>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "Profile",
  data() {
    return {

    }
  },
  computed: {
    ...mapState(['payrollData','payrollStatus','']),
    btnText(){
      return !this.payrollStatus ? 'Editar' : 'Actualizar';
    },
    inputBlock(){
      return !this.payrollStatus;
    }
  },
  methods: {
    ...mapActions(['updatePayrollData', 'changePayrollStatus']),
    formSubmit() {
      if (this.payrollStatus === false) {
        this.changePayrollStatus();
        return
      }
      if (this.payrollStatus === true) {
        this.updatePayrollData(this.payrollData)
        this.changePayrollStatus();
      }
    }
  },
}
</script>

<style scoped>

</style>