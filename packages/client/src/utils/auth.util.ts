import { SafeUserVO } from 'common/dist'
import { history } from '../config/router.config'

enum StorageKey {
  JwtToken = 'JWT_TOKEN',
  UserData = 'USER_DATA'
}

export const getToken = () => localStorage.getItem(StorageKey.JwtToken)

export const checkLogin = () => Boolean(getToken())

export const saveToken = (token?: string | null) => {
  console.info('save', token)
  if (token && token.length > 0) {
    localStorage.setItem(StorageKey.JwtToken, token)
  }
}

export const deleteToken = () => {
  console.info('delete')
  localStorage.removeItem(StorageKey.JwtToken)
}

export const jumpToLogin = () => history.push('/auth/login')

export const saveUser = (user: SafeUserVO) =>
  localStorage.setItem(StorageKey.UserData, JSON.stringify(user))

export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem(StorageKey.UserData) ?? '') as SafeUserVO
  } catch (e) {
    return null
  }
}
