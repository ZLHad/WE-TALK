import React, { FC } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { MainContainer, MainNavSection, MainContentSection, MainListContainer, MainDetailContainer } from '../components/Layout'
import { UserList } from '../components/UserList'
import { ContactDetail } from './ContactDetail'

const Contact: FC = () => {
  const { path } = useRouteMatch()

  return (
    <MainContainer>
      <MainListContainer>
        <MainNavSection>
          Contacts
        </MainNavSection>
        <MainContentSection>
          <UserList />
        </MainContentSection>
      </MainListContainer>
      <MainDetailContainer>
        <Switch>
          <Route path={`${path}/:userId`}>
            <ContactDetail />
          </Route>
        </Switch>
      </MainDetailContainer>
    </MainContainer>
  )
}

export default Contact
