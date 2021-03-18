import React, { FC, useContext, useEffect } from 'react'
import { LoginDTO } from '@we-talk/common'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { object, SchemaOf, string } from 'yup'
import { login } from '../services/auth.api'
import { UserContext } from '../context/UserContext'
import { history } from '../config/router.config'

import { deleteToken } from '../utils/auth.util'
import tw from 'twin.macro'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const LoginTitle = tw(NavLink)`text-4xl font-bold text-gray-700 m-0 mb-8 hover:text-gray-500 cursor-pointer`
const LoginContainer = tw.section`flex flex-col min-h-screen`
const LoginMain = tw.main`flex-1 py-20`
const FormContainer = tw.div`flex items-center flex-col mx-auto p-10 rounded-lg border-2 border-solid border-gray-200  bg-white max-w-sm`
const LoginFooter = tw.footer`flex-shrink-0 p-10 text-center text-gray-600`
const InputForm = tw(Form)`block w-full`
const InputField = tw(Field)`border-gray-200 border-2 border-solid outline-none bg-gray-100 shadow-inner
                               hover:ring-4 hover:ring-blue-300 hover:border-blue-400 hover:bg-transparent
                               focus:ring-4 focus:ring-blue-300 focus:border-blue-400 focus:bg-transparent
                               block rounded mb-5 p-2 transition-all w-full`

const Button = styled.button(({ primary = false }: {primary?: boolean}) => [
  tw`px-5 py-1 rounded-sm focus:ring-4 focus:ring-gray-300 transition-all hover:bg-gray-200`,
  primary && tw`bg-blue-500 text-white hover:bg-blue-600 `
])

const NavActions = tw.div`flex justify-between items-center`
const NavLinkWithStyle = tw(NavLink)`text-blue-500 hover:text-blue-600`
const InfoTag = tw.div`bg-green-500 text-white p-3 rounded mt-5 w-full`

const ErrorField = tw(ErrorMessage)`-mt-5 text-red-500 mb-5 text-sm`

const loginRegisterSchema: SchemaOf<LoginDTO> = object({
  username: string().required('请输入用户名'),
  password: string().required('请输入密码')
}).defined()

const loginInitialValue: LoginDTO = { username: '', password: '' }

const Login: FC = () => {
  const userStore = useContext(UserContext)

  useEffect(() => deleteToken(), [])

  const handleSubmit = async (value: LoginDTO) => {
    const { data } = await login(value)
    console.log(data)
    if (data.res) {
      userStore.updateAll(data.res)
      history.push('/chat')
    }
  }

  return (
    <LoginContainer>
      <LoginMain>
        <FormContainer>
          <LoginTitle to="/">
            We Talk
          </LoginTitle>
          <Formik<LoginDTO>
            initialValues={loginInitialValue}
            validationSchema={loginRegisterSchema}
            onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <InputForm>
                <InputField name="username" placeholder="用户名" />
                <ErrorField name="username" component="div" />
                <InputField type="password" name="password" placeholder="密码" />
                <ErrorField name="password" component="div" />
                <NavActions>
                  <Button primary type="submit" disabled={isSubmitting}>
                    登录
                  </Button>
                  <NavLinkWithStyle to="/auth/login">先注册（TODO）</NavLinkWithStyle>
                </NavActions>
              </InputForm>
            )}
          </Formik>
          <InfoTag>
            测试用账号[账号/密码]
            <NavActions><span>1728081843</span><span>123456</span></NavActions>
            <NavActions><span>1142160040</span><span>123456</span></NavActions>
            <NavActions><span>1631254983</span><span>123456</span></NavActions>
            <NavActions><span>1703690191</span><span>123456</span></NavActions>
          </InfoTag>
        </FormContainer>
      </LoginMain>
      <LoginFooter>
        BY 时长半月练习生
      </LoginFooter>
    </LoginContainer>
  )
}

export default Login
