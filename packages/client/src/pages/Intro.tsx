import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { UserContext } from '../context/UserContext'
import tw from 'twin.macro'
import { NavLink } from 'react-router-dom'

const IntroContainer = tw.div`flex min-h-screen flex-col`
const IntroMain = tw.main`flex-1`
const IntroTitle = tw.h1`m-0 pt-10 text-center text-8xl font-bold text-gray-600`
const IntroBrief = tw.h2`m-0 mt-10 text-center text-xl font-bold text-gray-500`
const IntroFooter = tw.footer`flex-shrink-0 p-10 text-center text-gray-600`
const ActionBar = tw.div`flex items-center gap-8 justify-center mt-10`
const ActionNav = tw(NavLink)`text-lg text-blue-500 hover:text-blue-600`
const Video = tw.video`mt-10 max-w-4xl mx-auto`
const StackList = tw.div`mt-10 max-w-4xl mx-auto text-gray-600 text-sm text-center`

export const Intro = observer(() => {
  const userStore = useContext(UserContext)

  return (
    <IntroContainer className="background-base">
      <IntroMain>
        <IntroTitle className="title-font">We Talk</IntroTitle>
        <IntroBrief>一个完全比不过QQ的实时聊天应用</IntroBrief>
        <ActionBar>
          {userStore.isLogin ? <ActionNav to="/chat">开始使用</ActionNav> : <ActionNav to="/auth/login">去登录</ActionNav>}
          <iframe style={{ display: 'inline-block', height: 30 }} src="https://ghbtns.com/github-btn.html?user=half-month-trainee&repo=we-talk&type=star&count=true&size=large" frameBorder="0" scrolling="0" width="150" height="20" title="GitHub"></iframe>
        </ActionBar>
        <Video controls>
          <source src="https://javaee-bay.oss-cn-beijing.aliyuncs.com/we-talk/intro/2021-01-31%2016-57-59.mp4"
            type="video/mp4" />
          Sorry, your browser does not support embedded videos.
        </Video>
        <StackList>Keywords: Lerna, React, Create react app, Mobx, Tailwindcss, Styled-components, Fastify, Prisma, PostgreSQL, Axios, Socket.io</StackList>
      </IntroMain>
      <IntroFooter>BY 时长半月练习生</IntroFooter>
    </IntroContainer>
  )
})
