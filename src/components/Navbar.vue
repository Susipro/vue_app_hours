<template>
  <div class="navbar navbar-dark bg-dark">
    <router-link v-if="authUser" to="/calculate" class="navbar-brand" @click="hideBtnNavbar">
      Calcular
    </router-link>

    <div class="d-flex">
      <router-link v-if="!authUser" to="/register" class="btn btn-dark" @click="">
        Registrarse
      </router-link>
      <router-link v-if="!authUser" to="/login" class="btn btn-dark" @click="">
        Login
      </router-link>
      <button v-if="authUser && navBtnFlag" class="btn btn-dark" @click="changeShowList">
        {{ btnText }}
      </button>
      <router-link v-if="authUser" class="btn btn-dark" to="/">
        Inicio
      </router-link>
      <button v-if="authUser" class="btn btn-dark" @click="logOut">LogOut</button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'

export default {
  name: "Navbar",
  methods: {
    ...mapActions(['changeShowSign', 'changeShowList','changeShowProfile', 'logOut']),
    changeSignList(){
      this.showList = !this.showList;
      this.showSign = !this.showSign;
    },
    hideBtnNavbar(){
      this.navBtnFlag = false
      console.log(this.navBtnFlag);
    }
  },
  computed: {
    ...mapGetters(['authUser']),
    ...mapState(['showList', 'showSign', 'navBtnFlag']),
    btnText(){
      return !this.showList ? 'Listado' : 'Fichar';
    }
  }
}
</script>

<style scoped>

</style>