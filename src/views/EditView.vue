<template>
Editar {{$route.params.id}} - {{sign}}
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: "EditView",
  computed: {
    ...mapState(['sign'])
  },
  methods: {
   ...mapActions(['setEditSign', 'editSign'])
  },
  created() {
    this.editSign(this.$route.params.id);
  }
}
</script>

<style scoped>

</style>