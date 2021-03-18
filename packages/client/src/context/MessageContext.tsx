import React, { createContext, FC } from 'react'
import { MessageVO, SafeUserVO } from '@we-talk/common'
import { makeAutoObservable } from 'mobx'
import { userObservable } from './UserContext'
import { initMessage } from '../services/message.api'

type MessageMap = Map<SafeUserVO['id'], MessageVO[]>

export class MessageObservable {
  messageMap: MessageMap = new Map()

  constructor () {
    makeAutoObservable(this)
  }

  get message () {
    return (withId: number) => this.messageMap.get(withId)
  }

  get lastMessage () {
    return (userId: number) => {
      const messages = this.messageMap.get(userId)
      if (messages && messages.length > 0) {
        return messages[messages.length - 1].content
      } else {
        return ''
      }
    }
  }

  initMessageMap (map: MessageMap) {
    this.messageMap = map
  }

  async fetchBasicMessageMap () {
    const { data: { res } } = await initMessage()
    const nextMessageMap: MessageMap = new Map()
    function addToMap (userId: number, message: MessageVO) {
      const messages = nextMessageMap.get(userId)
      if (messages) {
        messages.push(message)
      } else {
        nextMessageMap.set(userId, [message])
      }
    }
    res?.forEach(element => {
      const currentUser = userObservable.user
      if (element.fromUserId === currentUser?.id) {
        addToMap(element.toUserId, element)
      } else if (element.toUserId === currentUser?.id) {
        addToMap(element.fromUserId, element)
      } else {
        console.log('id err', currentUser)
      }
    })
    this.initMessageMap(nextMessageMap)
  }

  receiveNewMessage (message: MessageVO) {
    const currentUser = userObservable.user
    if (message.fromUserId === currentUser?.id) {
      this.addMessageToMap(message.toUserId, message)
    } else if (message.toUserId === currentUser?.id) {
      this.addMessageToMap(message.fromUserId, message)
    } else {
      console.log('id err', currentUser)
    }
  }

  addMessageToMap (userId: number, message: MessageVO) {
    const messages = this.messageMap.get(userId)
    this.messageMap.set(userId, [...messages ?? [], message])
  }
}

export const messageObservable = new MessageObservable()

export const MessageContext = createContext(messageObservable)

export const MessageProvider: FC = ({ children }) => {
  return (
    <MessageContext.Provider value={messageObservable}>
      {children}
    </MessageContext.Provider>
  )
}
