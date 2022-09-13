<template>
  <div class="card m-4" v-if="!btnCalculateFlag">
    <div class="col align-self-center m-3 form-group">
      <label class="mr-2 mt-2" for="month">Selecciona Mes</label>
      <select name="month" id="month" v-model="month" class="form-control">
        <option v-for="(month, index) of months" :key=index :value="month">{{ month }}</option>
      </select>
      <label class="mr-2 mt-2" for="year">Selecciona Año</label>
      <select name="year" id="year" v-model="year" class="form-control">
        <option v-for="year of years" :value="year">{{ year }}</option>
      </select>
    </div>
    <div class="col align-self-center m-3 form-group">
      <label class="mr-2 mt-2" for="work-days">Días Laborables Del Mes</label>
      <input type="number" id="work-days" v-model="fullMonthWorkDays" class="form-control">
<!--      <label class="mr-2 mt-2" for="base-salary">Salario Base</label>-->
<!--      <input type="number" id="base-salary" v-model="payrollData.baseSalary" class="form-control">-->
      <label class="mr-2 mt-2" for="irpf">IRPF</label>
      <input type="number" id="irpf" v-model="payrollData.irpf" class="form-control">
      <label class="mr-2 mt-2" for="ss">SS</label>
      <input type="number" id="ss" v-model="payrollData.ss" class="form-control">
    </div>
    <div class="col align-self-center m-1">
      <button class="btn btn-primary pt-2 btn-block" @click="testCalculate" :disabled="btnBlock">Calcular</button>
    </div>
  </div>
  <div class="card m-4">
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">Impuestos</th>
        <th scope="col">%</th>
        <th scope="col">Bruto</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>IRPF</td>
        <td>{{ payrollData.irpf }}</td>
        <td>{{ monthlyBruteMoney.irpf }}</td>
      </tr>
      <tr>
        <td>SS</td>
        <td>{{ payrollData.ss }}</td>
        <td>{{ monthlyBruteMoney.ss }}</td>
      </tr>
      <tr>
        <td>Total Bruto</td>
        <td></td>
        <td>{{ monthlyBruteMoney.bruteSalary }}</td>
      </tr>
      <tr>
        <td>Total Neto</td>
        <td></td>
        <td>{{ monthlyNetMoney.netSalary }}</td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="card m-4">
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">Horas/Plus</th>
        <th scope="col">Total</th>
        <th scope="col">Bruto</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Normales</td>
        <td>{{ monthlyHoursAndPlus.workHours }} de {{ minimumWorkMonthHours }}</td>
        <td>{{ monthlyBruteMoney.extraPayHours.toFixed(2) }}</td>
      </tr>
      <tr>
        <td>Nocturnas</td>
        <td>{{ monthlyHoursAndPlus.nightHours }}</td>
        <td>{{ monthlyBruteMoney.nightHours.toFixed(2) }}</td>
      </tr>
      <tr>
        <td>Festivas</td>
        <td>{{ monthlyHoursAndPlus.holidaysHours }}</td>
        <td>{{ monthlyBruteMoney.holidaysHours.toFixed(2) }}</td>
      </tr>
      <tr>
        <td>Total</td>
        <td>{{ monthlyHoursAndPlus.total }}</td>
        <td>{{ monthlyBruteMoney.total.toFixed(2) }}</td>
      </tr>
      </tbody>
    </table>
    </div>
    <div class="card m-4">
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">Bonus Extra</th>
        <th scope="col">Total</th>
        <th scope="col">Bruto</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Urgencias</td>
        <td>{{ monthlyHoursAndPlus.urgency }}</td>
        <td>{{ monthlyBruteMoney.urgency }}</td>
      </tr>
      <tr>
        <td>Dormir</td>
        <td>{{ monthlyHoursAndPlus.sleepAway }}</td>
        <td>{{ monthlyBruteMoney.sleepAway }}</td>
      </tr>
      <tr>
        <td>Total</td>
        <td></td>
        <td>{{ monthlyBruteMoney.totalPlus }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: "SalaryForecast",
  data() {
    return {
      months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      years: ['2021', '2022', '2023', '2024', '2025'],
      month: '0',
      year: '0',
      fullMonthWorkDays: 21,
      signsToCalculate: [],
      minimumWorkMonthHours: 0,
      monthlyHoursAndPlus: {
        workHours: 0,
        nightHours: 0,
        holidaysHours: 0,
        urgency: 0,
        sleepAway: 0,
        total: 0,
        realExtraHours: 0
      },
      monthlyBruteMoney: {
        workHours: 0,
        nightHours: 0,
        holidaysHours: 0,
        urgency: 0,
        sleepAway: 0,
        total: 0,
        totalPlus: 0,
        extraPayHours: 0,
        bruteSalary: 0,
        irpf: 0,
        ss: 0
      },
      monthlyNetMoney: {
        netSalary: 0
      },
      payrollData: {
        baseSalary: 1701,
        irpf: 14,
        ss: 8,
      },
      btnCalculateFlag: false
    }
  },
  computed: {
    ...mapState(['signs']),
    btnBlock(){
      return this.btnCalculateFlag;
    }
  },
  methods: {
    getSignsToCalculate(signs) {
      this.signsToCalculate = signs.filter(item => (item.year == this.year && item.month == this.month && 1 * item.day < 26) || (1 * item.month == 1 * this.month - 1 && 1 * item.day > 25))
    },

    getMonthlyMinimumHours(totalHours) {
      this.minimumWorkMonthHours = parseFloat(totalHours) * 8;
      console.log(this.minimumWorkMonthHours)
    },

    calculateMonthlyHours(selectedSigns) {
      for (const selectedSign of selectedSigns) {
        this.monthlyHoursAndPlus.workHours += parseFloat(selectedSign.workHours);
        this.monthlyHoursAndPlus.nightHours += parseFloat(selectedSign.nightHours);
        this.monthlyHoursAndPlus.holidaysHours += parseFloat(selectedSign.holidaysHours);
      }
      this.monthlyHoursAndPlus.total = this.monthlyHoursAndPlus.workHours + this.monthlyHoursAndPlus.nightHours + this.monthlyHoursAndPlus.holidaysHours;
    },

    calculateMonthlyPlus(selectedSigns) {
      for (const selectedSign of selectedSigns) {
        if (selectedSign.urgency) {
          this.monthlyHoursAndPlus.urgency += 1;
        }
        if (selectedSign.sleepAway) {
          this.monthlyHoursAndPlus.sleepAway += 1;
        }
      }
    },

    calculateHoursMoney(monthlyHours) {
      if (this.monthlyHoursAndPlus.total > this.minimumWorkMonthHours) {
        this.monthlyHoursAndPlus.realExtraHours = parseFloat(this.monthlyHoursAndPlus.workHours) - parseFloat(this.minimumWorkMonthHours);
        this.monthlyBruteMoney.extraPayHours = parseFloat(monthlyHours.realExtraHours) * 13.71
      }
      if (this.monthlyHoursAndPlus.total < this.minimumWorkMonthHours) {
        this.monthlyHoursAndPlus.realExtraHours = 0;
      }
      this.monthlyBruteMoney.nightHours = parseFloat(monthlyHours.nightHours) * 5.51
      this.monthlyBruteMoney.holidaysHours = parseFloat(monthlyHours.holidaysHours) * 8.26
      this.monthlyBruteMoney.total = this.monthlyBruteMoney.nightHours + this.monthlyBruteMoney.holidaysHours + this.monthlyBruteMoney.extraPayHours;
    },

    calculatePlusMoney(monthlyPlus) {
      this.monthlyBruteMoney.urgency = monthlyPlus.urgency * 75;
      this.monthlyBruteMoney.sleepAway = monthlyPlus.sleepAway * 20;
      this.monthlyBruteMoney.totalPlus = this.monthlyBruteMoney.urgency + this.monthlyBruteMoney.sleepAway;
    },

    bruteCalculate(){
      this.monthlyBruteMoney.bruteSalary = this.payrollData.baseSalary + this.monthlyBruteMoney.total + this.monthlyBruteMoney.totalPlus;
      this.monthlyBruteMoney.bruteSalary = this.monthlyBruteMoney.bruteSalary.toFixed(2)
    },

    taxCalculate(){
      this.monthlyBruteMoney.irpf =  (this.monthlyBruteMoney.bruteSalary * this.payrollData.irpf) / 100;
      this.monthlyBruteMoney.irpf = this.monthlyBruteMoney.irpf.toFixed(2)

      this.monthlyBruteMoney.ss =  ((this.monthlyBruteMoney.bruteSalary - this.monthlyBruteMoney.irpf) * this.payrollData.ss) / 100;
      this.monthlyBruteMoney.ss = this.monthlyBruteMoney.ss.toFixed(2)

    },

    netSalaryCalculate(){
      this.monthlyNetMoney.netSalary = this.monthlyBruteMoney.bruteSalary - this.monthlyBruteMoney.irpf - this.monthlyBruteMoney.ss;
      this.monthlyNetMoney.netSalary = this.monthlyNetMoney.netSalary.toFixed(2);
    },

    testCalculate() {
      this.getSignsToCalculate(this.signs);
      this.getMonthlyMinimumHours(this.fullMonthWorkDays);
      this.calculateMonthlyHours(this.signsToCalculate);
      this.calculateMonthlyPlus(this.signsToCalculate);
      this.calculateHoursMoney(this.monthlyHoursAndPlus);
      this.calculatePlusMoney(this.monthlyHoursAndPlus);
      this.bruteCalculate();
      this.taxCalculate();
      this.netSalaryCalculate();

      this.btnCalculateFlag = true;
      this.signsToCalculate = [];
    }
  }
}
</script>

<style scoped>

</style>