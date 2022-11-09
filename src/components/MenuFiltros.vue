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
    <p>{{store.filtroSistemas}}</p>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useCounterStore } from 'stores/dataglobal'

const store = useCounterStore()
const marca = ref([
  { val: false, label: 'Samsung', cantidad: 15 },
  { val: false, label: 'Huawei', cantidad: 10 },
  { val: false, label: 'Nokia', cantidad: 56 },
  { val: false, label: 'Iphone', cantidad: 4 },
  { val: false, label: 'Xiamoi', cantidad: 4 }
])
const sistemas = ref([
  { val: false, label: 'Android', cantidad: 15 },
  { val: false, label: 'Windows', cantidad: 10 },
  { val: false, label: 'IOS', cantidad: 56 }
])
const filtrar = () => {
  const valMarcas = []
  marca.value.forEach((item) => {
    if (item.val) { valMarcas.push(item.label) }
  })
  store.filtroMarcas = valMarcas
}
export default {
  setup () {
    return {
      check1: ref(false),
      store,
      marca,
      sistemas,
      pantallas: ref([
        { val: false, label: '6.0' },
        { val: false, label: '5.5' },
        { val: false, label: '5.0' }
      ]),
      filtrar
    }
  }
}
</script>

<style lang="sass" scoped>
.vtyu
  border-radius: 1rem
  border: 5px solid blue-grey-10

</style>
