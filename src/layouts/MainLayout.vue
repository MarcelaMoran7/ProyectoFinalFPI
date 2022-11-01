<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="bg-yellow-5">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          color="black"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-dark" >
          <q-icon name ="las la-bullhorn" size="2rem" color="black"/>Tienda CellPhone
        </q-toolbar-title>

        <q-input class="GPL__toolbar-input" dense standout="bg-grey" v-model="search" placeholder="Search">
          <template v-slot:prepend>
            <q-icon v-if="search === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
          </template>
        </q-input>
        <q-space />

        <q-btn color="brown-5 q-m-auto" label="Inicio" />
        <q-space />

        <q-btn  round color="grey q-ma-sm" icon="las la-plus" />
        <div><q-btn flat round color="dark q-ma-sm" icon="shopping_cart" size="20px"/></div>
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
