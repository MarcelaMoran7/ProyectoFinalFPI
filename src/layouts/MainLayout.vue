<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="bg-yellow-5">
      <q-toolbar>

        <q-avatar class="mobile-hide">
          <q-icon name ="las la-bullhorn" size="2rem" color="black"/>
        </q-avatar>

        <q-toolbar-title class="text-dark mobile-hide" >
          Tienda CellPhone
        </q-toolbar-title>

        <q-input rounded class="GPL__toolbar-input col-9 col-lg-5" dense standout="bg-blue-grey-3" v-model="search" placeholder="Search">
          <template v-slot:prepend>
            <q-icon v-if="search === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
          </template>
        </q-input>
        <q-space />

        <q-btn to="/" class=" q-ma-md mobile-hide" color="blue-grey-3" label="Inicio" />
        <q-space />

        <q-btn :to="'/NewAd'" class=" q-ma-sm mobile-hide" round color="blue-grey-3" icon="las la-plus" />
        <div><q-btn class=" q-ma-sm mobile-hide" flat round color="dark" icon="shopping_cart" size="20px"/></div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
    <MenuFiltros></MenuFiltros>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import MenuFiltros from 'components/MenuFiltros.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    MenuFiltros
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      MenuFiltros,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
<style lang="sass">
.GPL

  &__toolbar
    height: 64px

  &__toolbar-input
    width: 35%
    border-radius: 3rem
</style>
