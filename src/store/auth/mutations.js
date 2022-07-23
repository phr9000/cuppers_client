import { LocalStorage } from 'quasar'

export function setUser(state, user) {
  if (user) {
    LocalStorage.set('auth', user)
  } else {
    LocalStorage.remove('auth')
  }
  state.user = user
}
