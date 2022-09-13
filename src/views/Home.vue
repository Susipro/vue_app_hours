<template>
  <main class="d-flex justify-content-center">
    <div class="container">
      <div class="m-4" v-if="showSign">
        <div class="pt-2">
          <div class="card">
            <div class="card-body">
              <h1>{{ titleStatus }}</h1>
              <form @submit.prevent="formSubmit">
                <Input/>
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
//Pending Refactor
//Create component and use for register and login (use computed and v-if)
import Input from '@/components/Input.vue';
import SignList from '@/components/SignList.vue';
import {mapActions, mapState} from 'vuex';

const shortid = require('shortid');
export default {
  name: 'Home',
  components: {Input, SignList},
  methods: {
    ...mapActions(['setSign', 'clearSign', 'updateSign', 'firebaseLoad']),
    formSubmit() {
      if (this.editStatus === false) {

        this.sign.id = shortid.generate();
        this.setSign(this.sign);
        this.clearSign();
      }
      if (this.editStatus === true) {
        this.updateSign(this.sign);
        this.clearSign();
      }
    }

  },
  created() {
    this.firebaseLoad()
  },
  computed: {
    ...mapState(['sign', 'showSign', 'editStatus']),
    titleStatus() {
      return this.editStatus ? 'Editar' : 'Fichar';
    }
  },

}
</script>
