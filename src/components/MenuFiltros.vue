<template>
  <div class="q-pa-md ">
    <fieldset>
      <legend>MARCA</legend>
      <q-list bordered separator>
      <q-item dense v-for="(marcas, key) in marca" :key="'marc-' + key" clickable v-ripple>
        <q-item-section>
          <q-checkbox keep-color v-model="val" color="blue-grey">
            {{marcas.label}}<q-badge class="q-ml-xs" color="blue-grey" align="top">{{marcas.cantidad}}</q-badge>
        </q-checkbox>

        </q-item-section>
      </q-item>
      </q-list>
    </fieldset>
    <fieldset class="q-mt-md">
      <legend>SISTEMAS</legend>
      <q-list bordered separator >
      <q-item dense v-for="(sistemas, key) in sistemas" :key="'sis-' + key" clickable v-ripple>
        <q-item-section>
          <q-checkbox keep-color v-model="val" color="blue-grey">
            {{sistemas.label}}<q-badge class="q-ml-xs" color="blue-grey" align="top">{{sistemas.cantidad}}</q-badge>
        </q-checkbox>

        </q-item-section>
      </q-item>
      </q-list>
    </fieldset>
    <fieldset class="q-mt-md">
      <legend>PANTALLAS</legend>
      <q-list bordered separator>
      <q-item dense v-for="(pantallas, key) in pantallas" :key="'pant-' + key" clickable v-ripple>
        <q-item-section>
          <q-checkbox keep-color v-model="val" color="blue-grey">
            {{pantallas.label}}
        </q-checkbox>

        </q-item-section>
      </q-item>
      </q-list>
    </fieldset>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      val: ref(false),
      marca: ref([
        { value: false, label: 'Samsung', cantidad: 15 },
        { value: false, label: 'Huawei', cantidad: 10 },
        { value: false, label: 'Nokia', cantidad: 56 },
        { value: false, label: 'Iphone', cantidad: 4 },
        { value: false, label: 'Xiamoi', cantidad: 4 }
      ]),
      sistemas: ref([
        { value: false, label: 'Android', cantidad: 15 },
        { value: false, label: 'Windows', cantidad: 10 },
        { value: false, label: 'IOS', cantidad: 56 }
      ]),
      pantallas: ref([
        { value: false, label: '6.0' },
        { value: false, label: '5.5' },
        { value: false, label: '5.0' }
      ])
    }
  }
}
</script>
