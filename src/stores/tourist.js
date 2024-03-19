// stores/tourist.js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTouristStore = defineStore('tourist', {
  state: () => {
    return {
      personal_information: {},
      accommodation: {}
    }
  },
  persist: true
})
