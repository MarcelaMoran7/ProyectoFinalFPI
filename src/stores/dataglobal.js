import { defineStore } from 'pinia'

export const useCounterStore = defineStore('dataglobal', {
  state: () => ({
    counter: 0,
    filtroMarcas: [],
    filtroSistemas: [],
    filtroPantallas: [],
    currentPage: 1,
    dividedArray: [],
    articlesPerPage: 8,
    articles: [],
    articlesEditable: [],
    totalPages: 2
  }),

  getters: {
    doubleCount (state) {
      return state.counter * 2
    }
  },

  actions: {
    increment () {
      this.counter++
    }
  }
})
