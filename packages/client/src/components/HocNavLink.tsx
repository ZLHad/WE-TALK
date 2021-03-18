import React, { forwardRef, ReactElement } from 'react'

import { Link, LinkProps, NavLinkProps, useLocation, useRouteMatch } from 'react-router-dom'
import type { Location } from 'history'

interface IHocNavLink extends NavLinkProps {
  children: (active: boolean) => ReactElement
}

const calculatePath = (to: LinkProps['to'], locationContext: Location<unknown>): string | undefined => {
  const location = typeof to === 'function' ? to(locationContext) : to

  if (typeof location === 'string') {
    return location
  } else {
    return location.pathname
  }
}

/**
 * 导航链接
 */
const HocNavLink = forwardRef<HTMLAnchorElement, IHocNavLink>(
  ({
    className, style, activeClassName = 'active', activeStyle,
    exact, strict, children, to, location, ...rest
  }, ref) => {
    const locationContext = useLocation()
    const match = useRouteMatch({ path: calculatePath(to, location ?? locationContext), strict, exact })
    const active = Boolean(match)
    const linkProps = {
      className: (className ?? '') + (active ? ` ${activeClassName}` : ''),
      style: { ...style, ...active ? activeStyle : undefined },
      to,
      ref,
      ...rest
    }

    return (
      <Link {...linkProps}>{children(active)}</Link>
    )
  })

export default HocNavLink
