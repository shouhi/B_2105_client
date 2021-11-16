import { Popover, Transition } from '@headlessui/react'
import {
  ChevronLeftIcon,
  CogIcon,
  LogoutIcon,
  XIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, memo, useCallback, useContext, VFC } from 'react'

import { auth } from '../../utils/firebase'
import { AuthContext } from '../auth/AuthProvider'
import { Avatar } from '../shared/Avatar'
import { Button } from '../shared/Button'

//右側は自由に記載できるように
type Right = 'profile' | JSX.Element

const ICON_SIZE = 'w-17 h-14'

export type HeaderProps = {
  left?: 'back' | 'close' | 'icon' | JSX.Element
  center?: 'account' | string | JSX.Element
  right?: ('profile' | JSX.Element)[]
}

const UserMenu: VFC = () => {
  const router = useRouter()
  // const [authUser, authLoading, authError] = useAuthState(firebase.auth());
  // const uid = authUser?.uid;
  // const [user] = useDocumentData(
  //   uid && firebase.firestore().doc(`user/${uid}`)
  // );

  const { currentUser } = useContext(AuthContext)

  const handleSignOut = async () => {
    try {
      await auth.signOut()
      router.push('/signin')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div>
      <Popover className="grid">
        {({ open }) => {
          return (
            <>
              <Popover.Button className="rounded-full focus-visible:ring-2 focus-visible:ring-blue-400 focus:outline-none">
                <Avatar
                  alt={'userIcon'}
                  src={currentUser?.photoURL}
                  className={ICON_SIZE}
                />
              </Popover.Button>

              <div className="relative">
                <Transition
                  show={open}
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 -translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 -translate-y-1"
                >
                  <Popover.Panel
                    static
                    className="absolute mt-2 w-96 transform -translate-x-full left-20"
                  >
                    <div className="overflow-hidden py-4 bg-white rounded-2xl ring-1 ring-gray-400 ring-opacity-20 shadow-lg">
                      <div>
                        <Link href="/settings/qin">
                          <a className="flex items-center p-4 hover:bg-gray-100 focus-visible:bg-gray-100 focus:outline-none">
                            <Avatar
                              alt={'userIcon'}
                              src={currentUser?.photoURL}
                              className="w-17 h-14"
                            />
                            <div className="ml-4">
                              <p className="text-base font-bold">
                                {currentUser?.displayName}
                              </p>
                              <p className="text-sm text-gray-400">
                                {currentUser?.uid}
                              </p>
                            </div>
                          </a>
                        </Link>
                      </div>
                      <div className="grid relative">
                        <Link
                          // href={`/users/${uid}`}
                          href="/"
                        >
                          <a className="flex items-center py-2.5 px-4 hover:bg-gray-100 focus-visible:bg-gray-100 focus:outline-none">
                            <div className="flex flex-shrink-0 justify-center items-center">
                              <CogIcon className="w-7 h-7" />
                            </div>
                            <p className="ml-4 font-bold">設定</p>
                          </a>
                        </Link>
                        <button
                          type="button"
                          className="flex items-center py-2.5 px-4 hover:bg-gray-100 focus-visible:bg-gray-100 focus:outline-none"
                          onClick={handleSignOut}
                        >
                          <div className="flex flex-shrink-0 justify-center items-center">
                            <LogoutIcon className="ml-0.5 w-7 h-7 text-red-500" />
                          </div>
                          <p className="ml-4 font-bold text-red-500">
                            ログアウト
                          </p>
                        </button>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </div>
            </>
          )
        }}
      </Popover>
    </div>
  )
}

const Left = memo<Pick<HeaderProps, 'left'>>(props => {
  const router = useRouter()
  const handleClick = useCallback(() => {
    const prevPath = sessionStorage.getItem('prevPath')
    return prevPath ? router.back() : router.push('/')
  }, [router])

  if (!props.left) {
    return <div className={ICON_SIZE} />
  }
  if (props.left === 'back' || props.left === 'close') {
    return (
      <Button variant="ghost" className={ICON_SIZE} onClick={handleClick}>
        {props.left === 'back' ? <ChevronLeftIcon className="w-5 h-5" /> : null}
        {props.left === 'close' ? <XIcon className="w-5 h-5" /> : null}
      </Button>
    )
  }
  if (props.left === 'icon') {
    return (
      <>
        <Link href="/dashboard">
          <Image
            src="/tayzer.png"
            width={50}
            height={50}
            className="cursor-pointer"
          />
        </Link>
        <span className="pl-3 font-bold font-sans text-2xl">Tech.面接</span>
      </>
    )
  }
  return props.left
})
Left.displayName = 'Left'

const Center = memo<Pick<HeaderProps, 'center'>>(props => {
  if (!props.center) {
    return null
  }
  if (props.center === 'account') {
    return (
      <Link href="/settings/">
        {/* //settings系処理（アイコン入れるかな） */}
      </Link>
    )
  }
  if (typeof props.center === 'string') {
    return <div className="text-xl font-bold">{props.center}</div>
  }
  return props.center
})
Center.displayName = 'Center'

const Right = memo<Pick<HeaderProps, 'right'>>(props => {
  if (!props.right) {
    return <div className={ICON_SIZE} />
  }
  return (
    <div className="flex items-center space-x-2 sm:space-x-3">
      {props.right.map((item, i) => {
        return (
          <Fragment key={i}>
            {item === 'profile' ? <UserMenu /> : item}
          </Fragment>
        )
      })}
    </div>
  )
})
Right.displayName = 'Right'

export const Header = memo<HeaderProps>(props => {
  return (
    <header className="flex justify-between items-center px-8 py-2 shadow-md">
      <Left left={props.left} />

      <div className="flex flex-1 justify-center px-2">
        <Center center={props.center} />
      </div>

      <Right right={props.right} />
    </header>
  )
})
Header.displayName = 'Header'
