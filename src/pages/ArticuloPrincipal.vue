<template ref="articulosPrincipales">
  <div>
    <div class="row justify-center bg-yellow-2">
      <div class="col-2 col-md-1 q-mt-md">
      <q-toggle
        v-model="estado"
        color="yellow"
        label="Nuevo"
        left-label
      />
    </div>

      <div class="col-6 row col-md-6 mobile-hide q-mt-lg q-ml-sm">
        <div><q-btn @click="cargar" v-show="hayFiltroPrecio" rounded flat color="red" icon-right="las la-undo-alt" label="Limpiar filtro" class="q-pa-xs q-ma-xs" size="12px"/></div>
        Precio:
        <q-input class="col" type="number" rounded outlined bottom-slots v-model.number="desde" label="Desde" dense>
        <template v-slot:prepend>
          <q-icon name="las la-dollar-sign" />
        </template >
        <template v-slot:hint>
          Precio desde:
        </template>
      </q-input>
      <q-input class="col" type="number" rounded outlined bottom-slots v-model.number="hasta" label="Hasta" dense>
        <template v-slot:prepend>
          <q-icon name="las la-dollar-sign" />
        </template >
        <template v-slot:hint>
          Precio hasta:
        </template>
      </q-input>
      <div><q-btn @click="filtrarPrecios" flat round color="grey" icon="las la-search"/></div>

      </div>

      <div><q-btn  @click="toggleLeftDrawer" round color="black" icon="las la-filter" class="col-2 desktop-hide q-mt-md q-pa-md " size="sm"/></div>

      <q-select @update:model-value="cambioSelect" class="col-5 desktop-hide q-ma-md" rounded outlined v-model="ordenarPor" :options="opcionesOrdenar" label="Ordenar por" />

      <div class="col-4 col-md-4 mobile-hide q-ma-lg ">
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
    <transition appear enter-active-class="animated lightSpeedInRight slow" leave-active-class="animated fadeInDownBig slow">
      <div class="row q-gutter-xs justify-center q-mt-md">
      <q-card  class="my-card vtyu col-md-3 col-5 q-pa-sm q-mt-sm shadow-4"
      v-for="(item,key) in articulos" :key="key">
      <img :src="item.urlImagen">

      <q-card-section>
        <div class="text-h6 text-center">${{item.precio}}</div>
        <div class="text-center">{{item.titulo}}</div>
      </q-card-section>
      <q-separator />
      <q-card-actions aling="right">
        <q-btn :to="'/articulo/:idArticulo' + item.id" color="warning" rounded>Detalles</q-btn>
      </q-card-actions>
    </q-card>

    </div>

    </transition>

  </div>

  <div class="row">
    <div class=" col-12 col-md-6 q-pa-lg flex flex-center">
    <q-pagination
        v-model="current"
        max="8"
        direction-links
        outline
        color="orange"
        active-design="unelevated"
        active-color="brown"
        active-text-color="orange"
      />
  </div>
  <div class="col-1 q-ma-lg mobile-hide">
    Articulos por pagina:<q-select filled v-model="model" :options="options" />
  </div>
  </div>

  <q-drawer v-model="leftDrawerOpen"
      show-if-above
      bordered>
    <MenuFiltros></MenuFiltros>
    </q-drawer>

</template>

<script setup>
import { onMounted, ref, computed, watch, watchEffect } from 'vue'
import { useCounterStore } from 'stores/dataglobal'
import MenuFiltros from 'src/components/MenuFiltros.vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from 'boot/database'
import { getStorage, ref as refStorage, listAll, getDownloadURL } from 'firebase/storage'

const store = useCounterStore()
const storage = getStorage()
const ordenarPor = ref('Precio')
const opcionesOrdenar = ref(
  [{ label: 'Precio', value: 'Precio' },
    { label: 'Fecha', value: 'Fecha' }
  ])
const estado = ref(false)
const model = ref(null)
const options = ['2', '4', '5', '6', '8']

const desde = ref(0)
// const idArticulo = ref(null)
const hasta = ref(0)
const current = ref(3)
const leftDrawerOpen = ref(false)
const articulosOriginal = ref([
  { id: 'jsdfbhkslduh', sistema: 'Android', precio: 133, titulo: 'Samsung J6, Pantalla de 5.5 64GB, 2GB Ram, Color Negro', fecha: '2022 - 12 - 25', marca: 'Iphone', pantalla: '6.0', vendedor: 'Juan Perez' },
  { id: 'jsdfbhksldih', sistema: 'IOS', precio: 122, titulo: 'Samsung J6, Pantalla de 5.5 64GB, 2GB Ram, Color Negro', fecha: '2021 - 11 - 24', marca: 'Samsung', pantalla: '5.5', vendedor: 'Juan Perez' },
  { id: 'jsdfbhksldoh', sistema: 'Windows', precio: 140, titulo: 'Samsung J6, Pantalla de 5.5 64GB, 2GB Ram, Color Negro', fecha: '2019 - 12 - 25', marca: 'Nokia', pantalla: '5.0', vendedor: 'Juan Perez' },
  { id: 'jsdfbhksldah', sistema: 'Android', precio: 132, titulo: 'Samsung J6, Pantalla de 5.5 64GB, 2GB Ram, Color Negro', fecha: '2022 - 10 - 25', marca: 'Huawei', pantalla: '6.0', vendedor: 'Juan Perez' },
  { id: 'jsdfbhksldeh', sistema: 'IOS', precio: 127, titulo: 'Samsung J6, Pantalla de 5.5 64GB, 2GB Ram, Color Negro', fecha: '2022 - 9 - 25', marca: 'Xiaomi', pantalla: '5.5', vendedor: 'Juan Perez' },
  { id: 'jsdfbhksldjh', sistema: 'Windows', precio: 135, titulo: 'Samsung J6, Pantalla de 5.5 64GB, 2GB Ram, Color Negro', fecha: '2022 - 8 - 25', marca: 'Iphone', pantalla: '5.0', vendedor: 'Juan Perez' },
  { id: 'jsdfbhksldph', sistema: 'Android', precio: 138, titulo: 'Samsung J6, Pantalla de 5.5 64GB, 2GB Ram, Color Negro', fecha: '2022 - 11 - 15', marca: 'Samsung', pantalla: '6.0', vendedor: 'Juan Perez' },
  { id: 'jsdfbhksldqh', sistema: 'IOS', precio: 25.01, titulo: 'Samsung J6, Pantalla de 5.5 64GB, 2GB Ram, Color Negro', fecha: '2022 - 10 - 5', marca: 'Huawei', pantalla: '5.5', vendedor: 'Juan Perez' }
])

const articulos = ref([])
const hayFiltroPrecio = ref(false)
const contadorCargarFotos = ref(0)

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
const filtrarEstado = () => {
  if (estado.value === true) {
    articulos.value = articulos.value.filter((item) => {
      if (item.estado === 'Nuevo') {
        return true
      } else { return false }
    })
  }
}
watchEffect(() => {
  if (estado.value === true) {
    filtrarEstado()
  } else {
    articulos.value = articulosOriginal.value.map((x) => x)
  }
})

const cargar = async () => {
  hayFiltroPrecio.value = false
  store.filtroMarcas = []
  store.filtroSistemas = []
  store.filtroPantallas = []
  articulos.value = []
  articulosOriginal.value = []
  const querySnapshot = await getDocs(collection(db, 'anuncio'))
  querySnapshot.forEach((doc) => {
    const picture = doc.data()
    picture.id = doc.id
    articulosOriginal.value.push(picture)
    // console.log(doc.data())
    // console.log(`${doc.id} => ${doc.data()}`)
  })
  cargarImagenes()
}

const cargarImagenes = () => {
  articulosOriginal.value.forEach((arti) => {
    const listRef = refStorage(storage, arti.id)
    listAll(listRef)
      .then((res) => {
        if (res.items.length > 0) {
          // All the items under listRef.
          // Obteniendo url

          getDownloadURL(refStorage(storage, res.items[0].fullPath))
            .then((url) => {
              // `url` is the download URL for 'images/stars.jpg'
              contadorCargarFotos.value++
              arti.urlImagen = url
              CompletasImagenes()
            })
            .catch((error) => {
              // Handle any errors
              console.log(error)
            })

          // obteniendo url
        } else {
          contadorCargarFotos.value++
          CompletasImagenes()
        }

      // por cada archivo
      }).catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error)
      })
  })
}

function CompletasImagenes () {
  if (contadorCargarFotos.value === articulosOriginal.value.length) {
    articulos.value = articulosOriginal.value.map((a) => {
      return { ...a }
    })
  }
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

.my-card:hover
  transform: scale(1.1)
  transition: transform .5s
.neede
 margin-top: 20px

.vtyu
  border-radius: 2rem

</style>
