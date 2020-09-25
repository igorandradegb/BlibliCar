<template>
  <q-layout view="hHh Lpr lff">
    <div>
      <div>
        <h3 style="padding-right: 20px;padding-left: 20px; text-align: center">Seja bem vindo, Admin</h3>
        <div class="row" style="padding-right: 20px;padding-left: 20px">
          <div class="col-12">
            <q-table
              :data="cars"
              :columns="filters.identifiers.selected"
              row-key="idcar"
              :rows-per-page-options="[10, 20, 30, 40, 50, 100]"
            >
              <q-td slot="body-cell-idcar" slot-scope="props" :props="props">
                <div>{{ props.value }}</div>
              </q-td>
              <q-td slot="body-cell-marca" slot-scope="props" :props="props">
                <div>{{ props.value }}</div>
              </q-td>
              <q-td slot="body-cell-modelo" slot-scope="props" :props="props">
                <div>{{ props.value }}</div>
              </q-td>
              <q-td slot="body-cell-ano" slot-scope="props" :props="props">
                <div>{{ props.value }}</div>
              </q-td>
              <q-td slot="body-cell-placa" slot-scope="props" :props="props">
                <div>{{ props.value }}</div>
              </q-td>
              <q-td slot="body-cell-motorist" slot-scope="props" :props="props">
                <div>{{ props.value }}</div>
              </q-td>
              <q-td slot="body-cell-actions" slot-scope="props" :props="props"
                    style="min-width: 140px; max-width: 140px; padding: 0 22px">
                <div class="row gutter-xs justify-end animate-fade q-table-display">
                  <div>
                    <q-btn color="primary" flat label="Editar" @click="openRightDrawer(props.row)">
                    </q-btn>
                    <q-btn color="primary" flat label="Excluir" @click="deleteCar(props.row.idcar)">
                    </q-btn>
                  </div>
                </div>
              </q-td>
            </q-table>
          </div>
        </div>
      </div>
    </div>

    <q-drawer
      v-model="rightDrawer.open"
      :width="300"
      side="right"
      bordered
    >
      <div>
        <h4 style="padding-left: 10px">Editar registro</h4>
        <q-input style="padding: 10px" v-model="rightDrawer.edit.motorist" filled label="Qual o nome?"/>
        <q-input style="padding: 10px" :disable="!rightDrawer.edit.motorist" filled v-model="rightDrawer.edit.marca"
                 label="Escolha sua marca"/>
        <q-input style="padding: 10px" :disable="!rightDrawer.edit.marca" filled mask="####"
                 v-model="rightDrawer.edit.ano" label="Ano" placeholder="Digite o ano modelo do carro"/>
        <q-input style="padding: 10px" :disable="!rightDrawer.edit.ano" filled v-model="rightDrawer.edit.modelo"
                 label="Escolha seu modelo"/>
        <q-input style="padding: 10px" :disable="!rightDrawer.edit.modelo" filled mask="XXX-XXXX"
                 v-model="rightDrawer.edit.placa" label="Placa" placeholder="Digite a placa do carro"/>
        <div class="row gutter-xs justify-end animate-fade q-table-display">
          <div>
            <q-btn color="primary" flat label="Fechar" @click="closeRightDrawer">
            </q-btn>
            <q-btn color="primary" flat label="Salvar" @click="edit()">
            </q-btn>
          </div>
        </div>
      </div>
    </q-drawer>
  </q-layout>
</template>
<script>
import axios from 'axios'
export default {
  name: 'index',
  components: {
  },
  data () {
    return {
      cars: [],
      innerWidth: 0,
      filters: {
        pagination: {
          page: 1,
          rowsPerPage: 10
        },
        selected: [],
        identifiers: {
          list: [
            // 'idcar',
            'marca',
            'modelo',
            'ano',
            'placa',
            'motorist',
            'actions'
          ],
          selected: [
            {
              name: 'motorist',
              field: 'motorist',
              align: 'left',
              label: 'Dono',
              required: true
            },
            {
              name: 'marca',
              field: 'marca',
              align: 'left',
              label: 'Marca',
              required: true
            },
            {
              name: 'modelo',
              field: 'modelo',
              align: 'left',
              label: 'Modelo',
              required: true
            },
            {
              name: 'ano',
              field: 'ano',
              align: 'left',
              label: 'Ano',
              required: true
            },
            {
              name: 'placa',
              field: 'placa',
              align: 'left',
              label: 'Placa',
              required: true
            },
            {
              name: 'actions',
              field: 'actions',
              align: 'center',
              label: 'Ações',
              required: true
            }
          ]
        }
      },
      rightDrawer: {
        open: false,
        edit: {}
      }
    }
  },
  async mounted () {
    try {
      this.rightDrawer.open = false
      this.read()
    } catch (e) {
      throw new Error(e)
    }
  },
  computed: {
  },
  methods: {
    async read () {
      try {
        const cars = await axios.get('http://localhost:3000/cars/list')
        if (cars.data && cars.data.payload && Array.isArray(cars.data.payload) && cars.data.payload.length > 0) {
          this.cars = cars.data.payload
        } else {
          this.cars = []
        }
      } catch (e) {
        throw new Error(e)
      }
    },
    async openRightDrawer (obj) {
      console.log(obj)
      if (obj.idcar) {
        this.rightDrawer.edit = obj
      } else {
        this.rightDrawer.edit = {
          idcar: '',
          marca: '',
          modelo: '',
          ano: '',
          placa: '',
          motorist: ''
        }
      }
      this.rightDrawer.open = true
    },
    async closeRightDrawer () {
      this.rightDrawer.edit = {
        idcar: '',
        marca: '',
        modelo: '',
        ano: '',
        placa: '',
        motorist: ''
      }
      this.rightDrawer.open = false
    },
    async deleteCar (id) {
      try {
        const cars = await axios.post('http://localhost:3000/cars/delete', { idcar: id })
        if (cars.data.success) {
          await this.read()
        }
      } catch (e) {
        throw new Error(e)
      }
    },
    async edit () {
      try {
        const cars = await axios.post('http://localhost:3000/cars/update', this.rightDrawer.edit)
        if (cars.data.success) {
          await this.read()
          this.rightDrawer.edit = {}
          this.rightDrawer.open = false
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
