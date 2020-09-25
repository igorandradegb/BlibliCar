<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <div class="q-pa-md">
        <q-tabs shrink>
          <q-tab name="tab1" label="Lista de Carros" @click="$router.push('/')" />
          <q-tab name="tab2" label="Angariação" @click="$router.push('/angariacao')" />
          <q-space></q-space>
          <q-tab name="tab3" label="Admin" @click="$router.push('/admin')" />
        </q-tabs>
      </div>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  components: {},
  data () {
    return {
    }
  }
}
</script>
