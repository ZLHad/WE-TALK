import styled from 'styled-components'
import tw from 'twin.macro'

export const MainNavSection = tw.section`h-16 w-full flex items-center text-lg font-bold pl-5`
export const MainContainer = tw.section`h-screen w-full flex items-stretch`
export const MainListContainer = tw.section`w-80 flex-shrink-0 flex flex-col`
export const MainDetailContainer = tw.section`flex-1 flex flex-col`
export const MainContentSection = styled.div`
  ${tw`flex-1 overflow-auto`};
  scrollbar-color: #b8e0e0 transparent ;
  scrollbar-width: thin;
  ::-webkit-scrollbar {
    width: 0.5em;
  }
  
  ::-webkit-scrollbar-thumb {
    ${tw`bg-green-200 rounded`}
  }
`

export const RightContainer = tw.div`h-full w-full p-4 box-border`
export const RightBackground = tw.section`overflow-hidden bg-white shadow-sm h-full rounded-lg box-border flex flex-col`
