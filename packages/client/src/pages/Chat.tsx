import React, { FC } from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import { ChatMessage } from './ChatMassage'
import { MainContainer, MainContentSection, MainDetailContainer, MainListContainer, MainNavSection } from '../components/Layout'
import { UserChatList } from '../components/UserList'

const Chat: FC = () => {
  const { path } = useRouteMatch()

  return (
    <MainContainer>
      <MainListContainer>
        <MainNavSection>
          Messages
        </MainNavSection>
        <MainContentSection>
          <UserChatList />
        </MainContentSection>
      </MainListContainer>
      <MainDetailContainer>
        <Switch>
          <Route path={`${path}/:withId`}>
            <ChatMessage />
          </Route>
        </Switch>
      </MainDetailContainer>
    </MainContainer>
  )
}

export default Chat
