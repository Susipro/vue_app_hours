<template>
  <h1 class="my-5 d-flex justify-content-center">Registro de usuario</h1>
  <div class="alert alert-danger" v-if="error.type">{{ error.message }}</div>
  <form @submit.prevent="registerForm">
    <div class="container">
    <div class="form-group my-4">
      <label for="email">Email</label>
      <input type="email" placeholder="Introduce Email" class="form-control" id="email" v-model.trim="email"
             :class="[error.type === 'email' ? 'is-invalid' : '']">
    </div>
    <div class="form-group my-4">
      <label for="password">Contraseña</label>
      <input type="password" placeholder="Password" class="form-control" id="password" v-model.trim="pass1">
    </div>
    <div class="form-group my-4">
      <label for="password-repeat">Repetir Contraseña</label>
      <input type="password" placeholder="Password" class="form-control " id="password-repeat" v-model.trim="pass2">
    </div>
    <button type="submit" class="btn btn-primary btn-block" :disabled="btnBlock">Registrar</button>

    </div>
  </form>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "Register",
  data() {
    return {
      email: '',
      pass1: '',
      pass2: '',
    }
  },
  computed: {
    btnBlock() {
      if(!this.email.includes('@') && (!this.email.includes('.'))){
        return true
      }
      if((this.pass1.length > 5) && (this.pass1 === this.pass2)){
        return false
      }
      return true
    },
    ...mapState(['error'])
  },
  methods: {
    ...mapActions(['userRegister']),
    async registerForm(){
      await this.userRegister({email: this.email, password: this.pass1})
      if (this.error.type !== null) {
        return
      }
      this.email= '';
      this.pass1= '';
      this.pass2= '';
    }
  },
}
</script>
