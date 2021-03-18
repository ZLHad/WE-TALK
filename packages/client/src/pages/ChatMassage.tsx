import React, { FC, useContext, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { MessageContext } from '../context/MessageContext'
import { MessageTypeEnum, MessageVO, SafeUserVO, SentMessageDTO, SocketEvent } from '@we-talk/common'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { socket } from '../config/socket.config'
import { object, SchemaOf, string } from 'yup'
import tw from 'twin.macro'
import { UserContext } from '../context/UserContext'
import styled from 'styled-components'
import { Avatar, AvatarSize } from '../components/Avatar'
import { RightBackground, RightContainer } from '../components/Layout'

type MessageProps = {
  user?: SafeUserVO,
  message?: MessageVO,
  receive: boolean
}

const MessageContainer = styled.section(({ receive }: Pick<MessageProps, 'receive'>) => [
  tw`flex gap-2 mb-4 items-start`,
  receive && tw`flex-row-reverse`
])
const MessageRight = styled.section(({ receive }: Pick<MessageProps, 'receive'>) => [
  tw`rounded-lg p-3 text-white`,
  receive ? tw`rounded-tr-none bg-blue-500` : tw`rounded-tl-none bg-green-500`
])
const Message: FC<MessageProps> = ({ user, message, receive }) => {
  return (
    <MessageContainer receive={receive}>
      <Avatar size={AvatarSize.Small} alt="" src={user?.avatar ?? ''} />
      <MessageRight receive={receive}>
        {message?.content}
      </MessageRight>
    </MessageContainer>
  )
}

const MessageListContainer = tw.div`flex-1 overflow-auto box-border p-4`

const MessageList = observer(() => {
  const { withId } = useParams<{withId: string}>()
  const messageStore = useContext(MessageContext)
  const userStore = useContext(UserContext)
  const currentMessage = messageStore.message(Number(withId))

  const markRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    markRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [currentMessage])

  const getState = (message: MessageVO) => {
    if (userStore.user && message.fromUserId === userStore.user?.id) {
      return { message, user: userStore.user, receive: true }
    } else {
      const user = userStore.contactUser(message.fromUserId)
      return { message, user, receive: false }
    }
  }
  return (
    <MessageListContainer>
      {currentMessage?.map(item => (
        <Message key={item.id} {...getState(item)}>
        </Message>
      ))}
      <div ref={markRef} key="mark"></div>
    </MessageListContainer>
  )
})

const SendFormInput = tw(Field)`text-lg flex-1 p-4 border-0 outline-none`
const SendFormButton = tw.button`m-2 cursor-pointer hover:bg-blue-600 rounded border-0 pl-3 pr-3 bg-blue-500 text-white shadow-sm`
export const SendForm = styled(Form)`
  ${tw`flex w-full box-border border-0 border-t-2 border-gray-100 border-solid`}
`
type MessageDTO = Pick<SentMessageDTO, 'content'>

const sentMessageSchema: SchemaOf<MessageDTO> = object({
  content: string().required()
}).defined()

export const ChatMessage = () => {
  const { withId } = useParams<{withId: string}>()

  const handleSubmit = (value: MessageDTO, formikHelpers: FormikHelpers<MessageDTO>) => {
    const message: SentMessageDTO = {
      toUserId: Number(withId),
      type: MessageTypeEnum.PlanText,
      ...value
    }
    socket.emit(SocketEvent.Send, message)
    formikHelpers.resetForm()
  }

  return (
    <RightContainer>
      <RightBackground>
        <MessageList />
        <Formik<MessageDTO>
          initialValues={{ content: '' }}
          validationSchema={sentMessageSchema}
          onSubmit={handleSubmit}>
          {() => (
            <SendForm>
              <SendFormInput name="content" placeholder="请输入消息，回车键发送" />
              <SendFormButton type="submit">
                发送
              </SendFormButton>
            </SendForm>
          )}
        </Formik>
      </RightBackground>
    </RightContainer>
  )
}
