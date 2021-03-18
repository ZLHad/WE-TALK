// twin.d.ts
import styledImport, { CSSProp, css as cssImport } from 'styled-components'
import type { DOMAttributes } from 'react'
import { TwStyle } from 'twin.macro'

declare module 'twin.macro' {
  // The styled and css imports
  const styled: typeof styledImport
  const css: typeof cssImport
}

declare module 'react' {
  // The css prop
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSProp | ((false | TwStyle)[])
  }
  // The inline svg css prop
  interface SVGProps<T> extends SVGProps<SVGSVGElement> {
    css?: CSSProp
  }
}

// The 'as' prop on styled components
declare global {
  namespace JSX {
    // @ts-ignore
    interface IntrinsicAttributes<T> extends DOMAttributes<T> {
      as?: string
    }
  }
}
