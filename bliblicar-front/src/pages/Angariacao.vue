<template>
  <q-page>
    <div style="text-align: center">
      <h3>Deixe seu carro para alugar conosco!</h3>
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
          <div>
            <q-input style="padding: 10px" v-model="newCar.motorist" filled label="Qual seu nome?" />
            <q-select style="padding: 10px" :disable="!newCar.motorist" filled v-model="newCar.marca" :options="brands" label="Escolha sua marca"/>
            <q-input style="padding: 10px" :disable="!newCar.marca" filled mask="####" v-model="newCar.ano" label="Ano" placeholder="Digite o ano modelo do seu carro" @input="getModels"/>
            <q-select style="padding: 10px" :disable="!newCar.ano" filled v-model="newCar.modelo" :options="models" label="Escolha seu modelo"/>
            <q-input style="padding: 10px" :disable="!newCar.modelo" filled mask="XXX-XXXX" v-model="newCar.placa" label="Placa" placeholder="Digite a placa do seu carro"/>
            <div style="padding: 10px">
              <q-btn :disable="!newCar.placa" color="primary" label="Salvar" @click="save()">
              </q-btn>
            </div>
          </div>
        </div>
        <div class="col-2"></div>
      </div>
    </div>
  </q-page>
</template>=
<script>

const token = 'token=3bf3619c7c5faabae324a962d7bf40ba'
import axios from 'axios'

export default {
  name: 'Angariação',
  data () {
    return {
      brands: [],
      models: [],
      newCar: {
        marca: '',
        modelo: '',
        ano: '',
        placa: '',
        motorist: ''
      }
    }
  },
  async mounted () {
    try {
      const brands = await axios.get('https://api.robocote.com/v1/veiculos/carro/marcas?' + token)
      if (brands.data && brands.data.content && Array.isArray(brands.data.content) && brands.data.content.length > 0) {
        for (let i = 0; i < brands.data.content.length; i++) {
          if (brands.data.content[i].text.length > 2) {
            this.brands.push({
              label: brands.data.content[i].text,
              value: brands.data.content[i].id
            })
          }
        }
      } else {
        this.brands = []
      }
    } catch (e) {
      throw new Error(e)
    }
  },
  methods: {
    async getModels () {
      try {
        if (this.newCar.ano.length > 3) {
          console.log(this.newCar.marca)
          const models = await axios.get('https://api.robocote.com/v1/veiculos/modelos?ano_modelo=' + this.newCar.ano + '&marca_id=' + this.newCar.marca.value + '&' + token)
          if (models.data && models.data.content && Array.isArray(models.data.content) && models.data.content.length > 0) {
            for (let i = 0; i < models.data.content.length; i++) {
              this.models.push({
                label: models.data.content[i].text,
                value: models.data.content[i].id
              })
            }
          } else {
            this.models = []
          }
        }
      } catch (e) {
        throw new Error(e)
      }
    },
    async save () {
      try {
        let modelo = this.newCar.modelo.label
        if (modelo.length > 40) {
          modelo = modelo.substr(0, 37) + '...'
        }
        const save = await axios.post('http://localhost:3000/cars/create', {
          marca: this.newCar.marca.label,
          modelo: modelo,
          ano: this.newCar.ano,
          placa: this.newCar.placa,
          motorist: this.newCar.motorist
        })
        if (save.data.success) {
          this.$router.push('/obrigado')
        }
      } catch (e) {
        throw new Error(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
