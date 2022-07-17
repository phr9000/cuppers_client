import { LocalStorage } from 'quasar'

export function isLoggedIn(state) {
  if (LocalStorage.getItem('auth')) {
    // 유저정보 남아있는 상태
    return true
  } else {
    // 유저정보 날라간 상태
    return false
  }
}

export function userInfo(state) {
  const userInfo = LocalStorage.getItem('auth')
  if (userInfo) {
    return userInfo
  } else {
    return null
  }
}
