<template>
  <q-page>
    <div style="text-align: center">
      <h3>Obrigado por escolher a BliBliCar!</h3>
      <img src="../assets/obrigado-pic.jpg">
      <div style="padding: 10px">
        <q-btn color="primary" label="Voltar a lista" @click="$router.push('/')">
        </q-btn>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  name: 'Obrigado'
}
</script>

<style scoped>

</style>
