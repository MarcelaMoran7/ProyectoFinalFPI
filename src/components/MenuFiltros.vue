<template>
  <div class="q-pa-md ">
    <fieldset class="vtyu">
      <legend>MARCA</legend>
      <q-list bordered separator>
      <q-item dense v-for="(marcas, key) in marca" :key="'marc-' + key" clickable v-ripple>
        <q-item-section>
          <q-checkbox keep-color v-model="marcas.val" color="blue-grey">
            {{marcas.label}}<q-badge class="q-ml-xs" color="blue-grey" align="top">{{marcas.cantidad}}</q-badge>
        </q-checkbox>

        </q-item-section>
      </q-item>
      </q-list>
    </fieldset>
    <fieldset class="q-mt-md vtyu">
      <legend>SISTEMAS</legend>
      <q-list bordered separator >
      <q-item dense v-for="(sistemas, key) in sistemas" :key="'sis-' + key" clickable v-ripple>
        <q-item-section>
          <q-checkbox keep-color v-model="sistemas.val" color="blue-grey">
            {{sistemas.label}}<q-badge class="q-ml-xs" color="blue-grey" align="top">{{sistemas.cantidad}}</q-badge>
        </q-checkbox>

        </q-item-section>
      </q-item>
      </q-list>
    </fieldset>
    <fieldset class="q-mt-md vtyu">
      <legend>PANTALLAS</legend>
      <q-list bordered separator>
      <q-item dense v-for="(pantallas, key) in pantallas" :key="'pant-' + key" clickable v-ripple>
        <q-item-section>
          <q-checkbox keep-color v-model="pantallas.val" color="blue-grey">
            {{pantallas.label}}
        </q-checkbox>

        </q-item-section>
      </q-item>
      </q-list>
    </fieldset>
    <q-btn @click="filtrar" push color="white" text-color="blue-grey" label="Buscar" class="q-ma-md" icon="las la-search"/>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useCounterStore } from 'stores/dataglobal'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../boot/database'

const cargarDatos = async function () {
  // cargando los datos
  const querySnapshot = await getDocs(collection(db, 'marca'))
  querySnapshot.forEach((doc) => {
    console.log(doc.data())
    marca.value.push({ val: false, label: doc.data().nombre, cantidad: doc.data().cantidad })
  })

  // cargando los sistemas

  const querySnapshot1 = await getDocs(collection(db, 'sistemas'))
  querySnapshot1.forEach((doc) => {
    console.log(doc.data())
    sistemas.value.push({ val: false, label: doc.data().nombre, cantidad: doc.data().cantidad })
  })

  // cargando pantallas

  const querySnapshot2 = await getDocs(collection(db, 'pantallas'))
  querySnapshot2.forEach((doc) => {
    console.log(doc.data())
    pantallas.value.push({ val: false, label: doc.data().nombre })
  })
}

const store = useCounterStore()
const marca = ref([])
const sistemas = ref([])
const pantallas = ref([])
const filtrar = () => {
  const valMarcas = []
  marca.value.forEach((item) => {
    if (item.val) { valMarcas.push(item.label) }
  })
  store.filtroMarcas = valMarcas

  const valSistemas = []
  sistemas.value.forEach((item) => {
    if (item.val) { valSistemas.push(item.label) }
  })
  store.filtroSistemas = valSistemas

  const valPantallas = []
  pantallas.value.forEach((item) => {
    if (item.val) { valPantallas.push(item.label) }
  })
  store.filtroPantallas = valPantallas
}
export default {
  setup () {
    onMounted(() => {
      cargarDatos()
    })

    return {
      check1: ref(false),
      store,
      marca,
      sistemas,
      pantallas,
      filtrar,
      cargarDatos
    }
  }
}
</script>

<style lang="sass" scoped>
.vtyu
  border-radius: 1rem
  border: 5px solid blue-grey-10

</style>
