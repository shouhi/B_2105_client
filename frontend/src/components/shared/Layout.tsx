import type { ReactNode, VFC } from 'react'

import type { HeaderProps } from '../layouts/Header'
import { Header } from '../layouts/Header'

type Props = HeaderProps & {
  children: ReactNode
  // isHeaderNarrow?: boolean;
}

export const Layout: VFC<Props> = props => {
  const { children, ...headerProps } = props

  return (
    <div className="pb-20">
      <div className="pt-4 pb-1 mx-auto">
        <Header {...headerProps} />
      </div>
      <div className="flex w-screen">
        <main className="w-full bg-gray-50">{children}</main>
      </div>
      <footer>
        <div className="p-8">
          <div className="text-gray-600 text-center">
            <p>Tech.Uni org.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
