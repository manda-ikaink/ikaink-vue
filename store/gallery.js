export const state = () => ({
  active: null
})
  
export const mutations = {
  addActive(state, id) {
    state.active = id
  },
  removeActive(state) {
    state.active = null
  }
}