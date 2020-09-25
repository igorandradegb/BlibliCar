<template>
  <q-page>
    <div class="row">
      <div class="col-12">
        <q-table
          :data="list"
          :columns="filters.identifiers.selected"
          row-key="idcar"
          :rows-per-page-options="[10, 20, 30, 40, 50, 100]"
        >
         <tr slot="header" slot-scope="props">
            <q-th key="marca" :props="props">
              Marca
            </q-th>
            <q-th key="modelo" :props="props">
              Modelo
            </q-th>
            <q-th key="ano" :props="props">
              Ano
            </q-th>
            <q-th key="placa" :props="props">
              Placa
            </q-th>
            <q-th key="motorist" :props="props">
              Motorista
            </q-th>
<!--            <q-th key="actions" :props="props">-->
<!--              Ações-->
<!--            </q-th>-->
          </tr>
          <q-td slot="body-cell-marca" slot-scope="props" :props="props">
            <img style="width: 35px; height: 35px; border-radius: 50%" :src="props.value">
          </q-td>
          <q-td slot="body-cell-modelo" slot-scope="props" :props="props">
            <div >{{props.value}}</div>
          </q-td>
          <q-td slot="body-cell-ano" slot-scope="props" :props="props">
            <div >{{props.value}}</div>
          </q-td>
          <q-td slot="body-cell-placa" slot-scope="props" :props="props">
            <div class="text-grey-6">
              <div >{{props.value}}</div>
            </div>
          </q-td>
          <q-td slot="body-cell-motorist" slot-scope="props" :props="props">
            <div >{{props.value}}</div>
          </q-td>
<!--          <q-td slot="body-cell-actions" slot-scope="props" :props="props" style="min-width: 140px; max-width: 140px; padding: 0 22px">-->
<!--            <div class="row gutter-xs justify-end animate-fade q-table-display-ellipsis">-->
<!--              <q-btn color="primary" flat round icon="far fa-ellipsis-v" style="margin-top: 5px"></q-btn>-->
<!--            </div>-->
<!--            <div class="row gutter-xs justify-end animate-fade q-table-display">-->
<!--              <div>-->
<!--                <q-btn color="primary" flat round icon="far fa-clock" @click="openReport(props.row._id)" :loading="reportDrawer.isLoading">-->
<!--                  <q-tooltip>Relatório de acesso</q-tooltip>-->
<!--                </q-btn>-->
<!--              </div>-->
<!--              <div>-->
<!--                <q-btn color="primary" flat round icon="far fa-pencil" @click="openRightDrawer(props.row.__index)">-->
<!--                  <q-tooltip>Editar</q-tooltip>-->
<!--                </q-btn>-->
<!--              </div>-->
<!--              <div>-->
<!--                <q-btn color="primary" flat round icon="far fa-trash-alt" @click="modalDelete.payload._id = props.row._id, modalDelete.payload.__index = props.row.__index, modalDelete.isActive = true">-->
<!--                  <q-tooltip>Excluir</q-tooltip>-->
<!--                </q-btn>-->
<!--              </div>-->
<!--            </div>-->
<!--          </q-td>-->
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
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
            'marca',
            'modelo',
            'ano',
            'placa',
            'motorist',
            'actions'
          ]
        }
      },
      reportDrawer: {
        isActive: false,
        isLoading: false,
        types: {
          AUTH: 1,
          ACCESS: {
            ROOT: 2,
            CONNECTED: 2.1,
            AVAILABLE: 2.2,
            AWAY: 2.3,
            UNAVAILABLE: 2.4,
            DISCONNECTED: 2.5
          }
        },
        cdt: {
          $gte: new Date().setDate(new Date().getDate() - 7),
          $lte: new Date()
        },
        payload: {}
      },
      rightDrawer: {
        open: false,
        isLoading: false,
        newPassword: '',
        permissionOptions: [
          {label: 'Administrador', value: 12},
          {label: 'Gerente', value: 13},
          {label: 'Atendente', value: 14},
          {label: 'Junior', value: 15}
        ],
        categoryOptions: [
          {label: 'Primário', value: 'Primário'}
        ],
        departmentOptions: [
          {label: 'Primário', value: 'Primário'}
        ],
        user: {}
      },
      modalDelete: {
        isActive: false,
        isLoading: false,
        payload: {
          _id: '',
          __index: null
        }
      },
      modalRecharge: {
        isActive: false,
        isLoading: false,
        payload: {
          type: 'user',
          value: ''
        }
      },
      chartData: [
        {
          name: 'Conectado',
          data: []
        },
        {
          name: 'Disponível',
          data: []
        }
      ],
      chartOptions: {
        chart: {
          // height: 350,
          type: 'rangeBar',
          locales: [{
            name: 'pt',
            options: {
              months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
              shortMonths: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
              days: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
              shortDays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
              toolbar: {
                'exportToSVG': 'Exportar para SVG',
                'exportToPNG': 'Exportar para PNG',
                'exportToCSV': 'Exportar para CSV',
                'menu': 'Menu',
                'selection': 'Selecionar',
                'selectionZoom': 'Selecionar zoom',
                'zoomIn': 'Mais zoom',
                'zoomOut': 'Menos zoom',
                'pan': 'Mover',
                'reset': 'Retornar ao padrão'
              }
            }
          }],
          defaultLocale: 'pt'
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '80%'
          }
        },
        // dataLabels: {
        //   enabled: false
        // },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'HH:mm',
            formatter (value) {
              return moment(value).format('HH:mm')
            }
          }
        },
        // yaxis: {
        //   labels: {
        //     formatter (val) {
        //       return val + 'X'
        //     }
        //   }
        // }
        tooltip: {
          x: {
            formatter (val) {
              return moment(val).format('HH:mm:ss')
            }
          },
          y: {
            formatter () {
              return ''
            }
          }
        }
        // colors: ['#FF6600', '#25d366', '#0084ff']
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
        let cars = await this.$axios.get('/user/list')
        if (cars.data && Array.isArray(cars.data) && cars.data.length > 0) {
          this.cars = cars.data
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
