import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import tw from 'twin.macro'
import { Avatar, AvatarSize } from '../components/Avatar'
import { RightBackground, RightContainer } from '../components/Layout'
import { UserContext } from '../context/UserContext'

const AvatarContainer = tw.div`flex justify-center pt-10`
const NicknameContainer = tw.div`text-center text-2xl mt-5`
const UsernameContainer = tw.div`text-center mt-5 text-gray-600`
const SendMessageAction = tw(NavLink)`bg-blue-500 text-white px-5 py-3 border-0 rounded max-w-sm mx-auto mt-5 no-underline hover:bg-blue-600`

export const ContactDetail = observer(() => {
  const { userId } = useParams<{userId: string}>()
  const userStore = useContext(UserContext)
  const user = userStore.contactUser(Number(userId))
  return (
    <RightContainer>
      <RightBackground>
        <AvatarContainer>
          <Avatar size={AvatarSize.Large} src={user?.avatar ?? ''} />
        </AvatarContainer>
        <NicknameContainer>{user?.nickname}</NicknameContainer>
        <UsernameContainer>Username: {user?.username}</UsernameContainer>
        <SendMessageAction to={`/chat/${userId}`}>
          发送消息
        </SendMessageAction>
      </RightBackground>
    </RightContainer>
  )
})
