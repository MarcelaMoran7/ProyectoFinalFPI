<template>
  <div>
    <div class="row justify-end">

      <div class="col-3 baurn-jkl">
        Precio:
        <q-input class="row inline" type="number" rounded standout bottom-slots v-model.number="desde" label="Desde" dense>
        <template v-slot:prepend>
          <q-icon name="las la-dollar-sign" />
        </template >
        <template v-slot:hint>
          Precio desde:
        </template>
      </q-input>
      <q-input class="row inline" type="number" rounded standout bottom-slots v-model.number="hasta" label="Hasta" dense>
        <template v-slot:prepend>
          <q-icon name="las la-dollar-sign" />
        </template >
        <template v-slot:hint>
          Precio hasta:
        </template>
      </q-input>
      </div>

      <q-select @update:model-value="cambioSelect" class="col-6 desktop-hide q-ma-md" rounded outlined v-model="ordenarPor" :options="opcionesOrdenar" label="Ordenar por" />

      <div class="col-7 mobile-hide q-ma-lg">
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
      <q-card  class="my-card col-md-3 col-6 q-pa-sm"
      v-for="(item,key) in articulos" :key="key">
      <img src="https://cdn.quasar.dev/img/mountains.jpg">

      <q-card-section>
        <div class="text-h6">{{item.precio}}</div>
        {{item.titulo}}
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn color="yellow-5">Detalles</q-btn>
      </q-card-actions>
    </q-card>

    </div>
  </div>

</template>

<script setup>
import { onMounted, ref } from 'vue'

const ordenarPor = ref('Precio')
const opcionesOrdenar = ref(
  [{ label: 'Precio', value: 'Precio' },
    { label: 'Fecha', value: 'Fecha' }
  ])

const desde = ref(0)
const hasta = ref(0)

const articulosOriginal = [
  { precio: 133, titulo: 'Samsung J6, Pantalla de 5.5 64GB, 2GB Ram, Color Negro', fecha: '2022 - 12 - 25' },
  { precio: 122, titulo: 'Samsung J6, Pantalla de 5.5 64GB, 2GB Ram, Color Negro', fecha: '2021 - 11 - 24' },
  { precio: 140, titulo: 'Samsung J6, Pantalla de 5.5 64GB, 2GB Ram, Color Negro', fecha: '2019 - 12 - 25' },
  { precio: 132, titulo: 'Samsung J6, Pantalla de 5.5 64GB, 2GB Ram, Color Negro', fecha: '2022 - 10 - 25' },
  { precio: 127, titulo: 'Samsung J6, Pantalla de 5.5 64GB, 2GB Ram, Color Negro', fecha: '2022 - 9 - 25' },
  { precio: 135, titulo: 'Samsung J6, Pantalla de 5.5 64GB, 2GB Ram, Color Negro', fecha: '2022 - 8 - 25' },
  { precio: 138, titulo: 'Samsung J6, Pantalla de 5.5 64GB, 2GB Ram, Color Negro', fecha: '2022 - 11 - 15' },
  { precio: 25.01, titulo: 'Samsung J6, Pantalla de 5.5 64GB, 2GB Ram, Color Negro', fecha: '2022 - 10 - 5' }
]

const articulos = ref([])

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

onMounted(() => {
  articulosOriginal.forEach(item => {
    articulos.value.push(item)
  })
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
  margin:20px

.neede
  border: 1px solid black
  border-radius: 2rem
  width: auto
  padding: 5px
</style>
