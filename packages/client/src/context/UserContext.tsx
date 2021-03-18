import React, { createContext, FC } from 'react'
import { RelationshipStatusEnum, SafeUserVO, UserContextData } from '@we-talk/common'
import { makeAutoObservable } from 'mobx'
import { deleteToken, getToken, saveToken, saveUser, getUser } from '../utils/auth.util'
import { fetchCurrentUser, fetchCurrentUserRelated } from '../services/user.api'

class UserObservable {
  user = getUser()
  token = getToken()
  contacts: SafeUserVO[] = []

  constructor () {
    makeAutoObservable(this)
  }

  get otherUser () {
    return this.contacts.filter(item => item.id !== this.user?.id)
  }

  get isLogin () {
    return Boolean(this.token)
  }

  get contactUser () {
    return (userId: number) => this.contacts.find(item => item.id === userId)
  }

  updateUser (user: SafeUserVO) {
    this.user = user
    saveUser(user)
  }

  updateToken (token: string) {
    this.token = token
    saveToken(token)
  }

  updateContacts (contacts: SafeUserVO[]) {
    this.contacts = contacts
  }

  clearToken () {
    this.token = null
    deleteToken()
  }

  updateAll (context: UserContextData) {
    this.updateUser(context)
    this.updateToken(context.token)
  }

  async fetchUser () {
    const { data: { res } } = await fetchCurrentUser()
    if (res) {
      this.updateUser(res)
    }
  }

  async fetchContacts () {
    const { data: { res } } = await fetchCurrentUserRelated(RelationshipStatusEnum.Friend)
    this.updateContacts(res ?? [])
  }
}

export const userObservable = new UserObservable()

export const UserContext = createContext<UserObservable>(userObservable)

export const UserProvider: FC = ({ children }) => {
  return (
    <UserContext.Provider value={userObservable}>
      {children}
    </UserContext.Provider>
  )
}
