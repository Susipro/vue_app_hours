<template>
  <h1 class="my-5 d-flex justify-content-center">Ingreso de Usuario</h1>
  <div class="alert alert-danger" v-if="error.type">{{ error.message }}</div>
  <form @submit.prevent="loginForm">
    <div class="container">
      <div class="form-group my-4">
        <label for="email">Email</label>
        <input type="email" placeholder="Introduce Email" class="form-control" id="email" v-model.trim="email"
               :class="[error.type === 'email' ? 'is-invalid' : '']">
      </div>
      <div class="form-group my-4">
        <label for="password">Contraseña</label>
        <input type="password" placeholder="Password" class="form-control" id="password" v-model.trim="pass"
               :class="[error.type === 'password' ? 'is-invalid' : '']">
      </div>
      <button type="submit" class="btn btn-primary btn-block" :disabled="btnBlock">Entrar</button>

    </div>
  </form>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  data() {
    return {
      email: '',
      pass: '',
    }
  },
  computed: {
    ...mapState(['error']),
    btnBlock() {
      if (!this.email.includes('@') && (!this.email.includes('.'))) {
        return true
      }
      if ((this.pass.length > 5)) {
        return false
      }
      return true
    }
  },
  methods: {
    ...mapActions(['userLogin']),
    async loginForm() {
      await this.userLogin({email: this.email, password: this.pass})
      if (this.error.type !== null) {
        return
      }
      this.email = '';
      this.pass = '';
    }
  },
}
</script>