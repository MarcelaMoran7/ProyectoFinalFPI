<template ref="articulosPrincipales">
  <div>
    <div class="row justify-center">
      <div class="q-mt-lg q-ml-sm">
        <q-toggle
        v-model="leftDrawerOpen"
        color="yellow"
        label="Nuevo:"
        left-label
        class="mobile-hide"
        @click="toggleLeftDrawer"
      />
      </div>

      <div class="col-6 row  mobile-hide q-mt-lg q-ml-sm">
        <div><q-btn @click="cargar" v-show="hayFiltroPrecio" rounded flat color="red" icon-right="las la-undo-alt" label="Limpiar filtro" class="q-pa-xs q-ma-xs" size="12px"/></div>
        Precio:
        <q-input class="col" type="number" rounded standout bottom-slots v-model.number="desde" label="Desde" dense>
        <template v-slot:prepend>
          <q-icon name="las la-dollar-sign" />
        </template >
        <template v-slot:hint>
          Precio desde:
        </template>
      </q-input>
      <q-input class="col" type="number" rounded standout bottom-slots v-model.number="hasta" label="Hasta" dense>
        <template v-slot:prepend>
          <q-icon name="las la-dollar-sign" />
        </template >
        <template v-slot:hint>
          Precio hasta:
        </template>
      </q-input>
      <div><q-btn @click="filtrarPrecios" flat round color="grey" icon="las la-search"/></div>

      </div>

      <div><q-btn  @click="toggleLeftDrawer" round color="black" icon="las la-filter" class="col-2 desktop-hide q-mt-md q-pa-md " /></div>

      <q-select @update:model-value="cambioSelect" class="col-6 desktop-hide q-ma-md" rounded outlined v-model="ordenarPor" :options="opcionesOrdenar" label="Ordenar por" />

      <div class="col-4 mobile-hide q-ma-lg ">
        Ordenar por:
        <q-btn-toggle
        rounded
      class="my-custom-toggle"
        v-model="ordenarPor"
        push
        glossy
        toggle-color="yellow-14"
        :options="opcionesOrdenar"
        @click="Ordenar"
      />
      </div>

    </div>
    <div class="row q-ma-md">
      <q-card  class="my-card vtyu col-md-3 col-6 q-pa-sm q-mt-sm"
      v-for="(item,key) in articulos" :key="key">
      <img src="https://cdn.quasar.dev/img/mountains.jpg">

      <q-card-section>
        <div class="text-h6 text-center">${{item.precio}}</div>
        {{item.titulo}}
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn :to="'/articulo/' + item.id" color="warning" rounded>Detalles</q-btn>
      </q-card-actions>
    </q-card>

    </div>
  </div>

  <div class="q-pa-lg flex flex-center">
    <q-pagination
        v-model="current"
        max="5"
        direction-links
        outline
        color="orange"
        active-design="unelevated"
        active-color="brown"
        active-text-color="orange"
      />
  </div>
  <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
    <MenuFiltros></MenuFiltros>
    </q-drawer>

</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useCounterStore } from 'stores/dataglobal'
import MenuFiltros from 'src/components/MenuFiltros.vue'

const store = useCounterStore()
const ordenarPor = ref('Precio')
const opcionesOrdenar = ref(
  [{ label: 'Precio', value: 'Precio' },
    { label: 'Fecha', value: 'Fecha' }
  ])

const desde = ref(0)
const hasta = ref(0)
const current = ref(3)
const leftDrawerOpen = ref(false)
const articulosOriginal = [
  { id: 'jsdfbhkslduh', sistema: 'Android', precio: 133, titulo: 'Samsung J6, Pantalla de 5.5 64GB, 2GB Ram, Color Negro', fecha: '2022 - 12 - 25', marca: 'Iphone', pantalla: '6.0' },
  { id: 'jsdfbhksldih', sistema: 'IOS', precio: 122, titulo: 'Samsung J6, Pantalla de 5.5 64GB, 2GB Ram, Color Negro', fecha: '2021 - 11 - 24', marca: 'Samsung', pantalla: '5.5' },
  { id: 'jsdfbhksldoh', sistema: 'Windows', precio: 140, titulo: 'Samsung J6, Pantalla de 5.5 64GB, 2GB Ram, Color Negro', fecha: '2019 - 12 - 25', marca: 'Nokia', pantalla: '5.0' },
  { id: 'jsdfbhksldah', sistema: 'Android', precio: 132, titulo: 'Samsung J6, Pantalla de 5.5 64GB, 2GB Ram, Color Negro', fecha: '2022 - 10 - 25', marca: 'Huawei', pantalla: '6.0' },
  { id: 'jsdfbhksldeh', sistema: 'IOS', precio: 127, titulo: 'Samsung J6, Pantalla de 5.5 64GB, 2GB Ram, Color Negro', fecha: '2022 - 9 - 25', marca: 'Xiaomi', pantalla: '5.5' },
  { id: 'jsdfbhksldjh', sistema: 'Windows', precio: 135, titulo: 'Samsung J6, Pantalla de 5.5 64GB, 2GB Ram, Color Negro', fecha: '2022 - 8 - 25', marca: 'Iphone', pantalla: '5.0' },
  { id: 'jsdfbhksldph', sistema: 'Android', precio: 138, titulo: 'Samsung J6, Pantalla de 5.5 64GB, 2GB Ram, Color Negro', fecha: '2022 - 11 - 15', marca: 'Samsung', pantalla: '6.0' },
  { id: 'jsdfbhksldqh', sistema: 'IOS', precio: 25.01, titulo: 'Samsung J6, Pantalla de 5.5 64GB, 2GB Ram, Color Negro', fecha: '2022 - 10 - 5', marca: 'Huawei', pantalla: '5.5' }
]

const articulos = ref([])
const hayFiltroPrecio = ref(false)
const hayFiltro = computed(() => {
  if (desde.value > 0 && hasta.value > 0) { return true } else { return false }
})
const hayFiltroMenu = computed(() => {
  return store.filtroMarcas.length
})
const hayFiltroMenuSis = computed(() => {
  return store.filtroSistemas.length
})
const hayFiltroMenuPant = computed(() => {
  return store.filtroPantallas.length
})

watch(hayFiltroMenuPant, (nuevo, viejo) => {
  console.log('observador')
  filtrarPorMenuPant()
})
watch(hayFiltroMenuSis, (nuevo, viejo) => {
  console.log('observador')
  filtrarPorMenuSis()
})

watch(hayFiltroMenu, (nuevo, viejo) => {
  console.log('observador')
  filtrarPorMenu()
})

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
const Ordenar = () => {
  if (ordenarPor.value === 'Precio') {
    articulos.value.sort((a, b) => a.precio - b.precio)
  }
  if (ordenarPor.value === 'Fecha') {
    articulos.value.sort((a, b) => {
      if (a.fecha < b.fecha) {
        return -1
      }
      if (a.fecha > b.fecha) {
        return 1
      }

      return 0
    })
  }
}

const cambioSelect = (value) => {
  ordenarPor.value = value.value
  Ordenar()
}

const filtrarPrecios = () => {
  hayFiltroPrecio.value = true
  if (desde.value > 0 && hasta.value > 0) {
    articulos.value = articulos.value.filter((item) => {
      if (item.precio >= desde.value && item.precio <= hasta.value) { return true } else { return false }
    })
  }
}

const filtrarPorMenu = () => {
  if (store.filtroMarcas.length > 0) {
    hayFiltroPrecio.value = true
    articulos.value = articulos.value.filter((item) => {
      if (store.filtroMarcas.includes(item.marca)) { return true } else { return false }
    })
  }
}

const filtrarPorMenuSis = () => {
  if (store.filtroSistemas.length > 0) {
    hayFiltroPrecio.value = true
    articulos.value = articulos.value.filter((item) => {
      if (store.filtroSistemas.includes(item.sistema)) { return true } else { return false }
    })
  }
}

const filtrarPorMenuPant = () => {
  if (store.filtroPantallas.length > 0) {
    hayFiltroPrecio.value = true
    articulos.value = articulos.value.filter((item) => {
      if (store.filtroPantallas.includes(item.pantalla)) { return true } else { return false }
    })
  }
}

const cargar = () => {
  hayFiltroPrecio.value = false
  store.filtroMarcas = []
  store.filtroSistemas = []
  store.filtroPantallas = []
  articulos.value = []
  articulos.value = articulosOriginal.map((a) => {
    return { ...a }
  })
}

onMounted(() => {
  cargar()

  console.log(hayFiltro.value)
})

</script>
<style lang="sass" scoped>
.my-custom-toggle
  border: 1px solid yellow-14

.baurn-jkl
  border: 1px solid black
  border-radius: 2rem
  width: auto
  padding: 10px 5px
  margin-right:120px
  margin-top:15px

.neede
 margin-top: 20px

.vtyu
  border-radius: 2rem
</style>
