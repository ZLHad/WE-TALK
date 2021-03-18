import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { NavLink, useRouteMatch } from 'react-router-dom'
import tw from 'twin.macro'
import { UserContext } from '../context/UserContext'
import { MessageContext } from '../context/MessageContext'
import { Avatar, AvatarSize } from './Avatar'

const userChatNavActiveClassName = 'active-chat'
const UserChatNavLink = styled(NavLink).attrs({
  activeClassName: userChatNavActiveClassName
})`
  ${tw`p-5 flex items-center rounded no-underline overflow-hidden transition-colors`}
  color: #0d3200;
  &.${userChatNavActiveClassName} {
    ${tw`bg-green-600 text-white`}
    .brief {
      ${tw`text-green-100`}
    }
    :hover {
      ${tw`bg-green-600`}
    }
  }
  .brief {
    ${tw`w-40 text-sm overflow-ellipsis overflow-hidden whitespace-nowrap text-green-700`}
  }
  :hover {
    background: rgba(188, 194, 194, 0.514);
  }
`
const UserChatNavRight = tw.div`pl-3`
const UserChatNavNickName = tw.div`mb-2`

export const UserChatList = observer(() => {
  const userStore = useContext(UserContext)
  const messageStore = useContext(MessageContext)
  const { url } = useRouteMatch()

  return (
    <>
      {userStore.otherUser.map(item => (
        <UserChatNavLink key={item.id} to={`${url}/${item.id}`}>
          <Avatar alt="avatar" src={item.avatar ?? ''} />
          <UserChatNavRight>
            <UserChatNavNickName>{item.nickname}</UserChatNavNickName>
            <div className="brief">{messageStore.lastMessage(item.id)}</div>
          </UserChatNavRight>
        </UserChatNavLink>
      ))}
    </>
  )
})

export const UserList = observer(() => {
  const userStore = useContext(UserContext)
  const { url } = useRouteMatch()

  return (
    <>
      {userStore.otherUser.map(item => (
        <UserChatNavLink key={item.id} to={`${url}/${item.id}`}>
          <Avatar alt="avatar" size={AvatarSize.Small} src={item.avatar ?? ''} />
          <UserChatNavRight>
            <UserChatNavNickName>{item.nickname}</UserChatNavNickName>
          </UserChatNavRight>
        </UserChatNavLink>
      ))}
    </>
  )
})
