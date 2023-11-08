import { defineStore } from 'pinia'

export const useSpaStore = defineStore({
  id: 'services',
  state: () => ({
    loadingSpaServices: false,
    spaServices: []
  }),
  getters: {
    getSpaServices: (state) => {
      return state.spaServices
    }
  },
  actions: {
    async addSpaService(svc) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(svc)
      }
      try {
        await fetch('/api/spa/services', requestOptions)
          .then((response) => {
            if (response.status === 200) {
              alert(`${svc.title} successfully added`)
              this.fetchSpaServices()
            }
          })
          
      } catch (error) {
        console.log(error)
      }
    },
    async deleteSpaService(svc) {
      if (!svc?.id) {
        console.log('id required to delete service')
        return
      }
      try {
        await fetch(`/api/spa/services?id=${svc.id}`, { method: 'DELETE' })
          .then((response) => {
            if (response.status === 200) {
              alert(`${svc.service} successfully deleted`)
              this.fetchSpaServices()
            }
          })
          
      } catch (error) {
        console.log(error)
      }
    },
    async fetchSpaServices() {
      this.loadingSpaServices = true
      try {
        await fetch('/api/spa/services')
          .then((response) => response.json())
          .then(({ data }) => (
            this.spaServices = data
          ))
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingSpaServices = false;
      }
    }
  }
})
