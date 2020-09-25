<template>
  <q-page>
    <div style="text-align: center">
      <div>
        <h3>Seja bem vindo ao BliBliCar, <br>a sua agência de aluguel de carros!</h3>
        <h4>Escolha um carro para alugar abaixo!</h4>
        <div class="row" style="padding-right: 60px;padding-left: 60px">
          <div class="col-2"></div>
          <div class="col-8">
            <q-table
              :data="cars"
              :columns="filters.identifiers.selected"
              row-key="idcar"
              :rows-per-page-options="[10, 20, 30, 40, 50, 100]"
            >
              <q-td slot="body-cell-idcar" slot-scope="props" :props="props">
                <div >{{props.value}}</div>
              </q-td>
              <q-td slot="body-cell-marca" slot-scope="props" :props="props">
                <div >{{props.value}}</div>
              </q-td>
              <q-td slot="body-cell-modelo" slot-scope="props" :props="props">
                <div >{{props.value}}</div>
              </q-td>
              <q-td slot="body-cell-ano" slot-scope="props" :props="props">
                <div >{{props.value}}</div>
              </q-td>
              <q-td slot="body-cell-placa" slot-scope="props" :props="props">
                <div >{{props.value}}</div>
              </q-td>
              <q-td slot="body-cell-motorist" slot-scope="props" :props="props">
                <div >{{props.value}}</div>
              </q-td>
              <q-td slot="body-cell-actions" slot-scope="props" :props="props"
                    style="min-width: 140px; max-width: 140px; padding: 0 22px">
                <div class="row gutter-xs justify-end animate-fade q-table-display">
                  <div>
                    <q-btn color="primary" flat label="Escolher" @click="$router.push('/obrigado')">
                    </q-btn>
                  </div>
                </div>
              </q-td>
            </q-table>
          </div>
          <div class="col-2"></div>
        </div>
      </div>
    </div>
  </q-page>
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
              align: 'left',
              label: 'Ações',
              required: true
            }
          ]
        }
      },
      rightDrawer: {
        open: false,
        isLoading: false,
        run: {}
      }
    }
  },
  async mounted () {
    try {
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
    }
  }
}
</script>

<style scoped>

</style>
