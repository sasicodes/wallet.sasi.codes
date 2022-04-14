import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/translucent.css'
import 'tippy.js/themes/light.css'

import Tippy from '@tippyjs/react'
import React from 'react'
import type { Placement } from 'tippy.js'

type Props = {
  children: React.ReactElement
  content: React.ReactNode
  placement?: Placement
}

const Tooltip = ({ children, content, placement = 'top', ...props }: Props) => {
  return (
    <Tippy
      {...props}
      placement={placement}
      content={content}
      arrow={false}
      className="font-semibold"
      followCursor={true}
      theme={'translucent'}
    >
      {children}
    </Tippy>
  )
}

export default Tooltip
