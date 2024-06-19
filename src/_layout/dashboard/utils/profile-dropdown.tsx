import { useAuthStore } from '@/store/auth'
import { classNames } from '@/utils/class-name.'
import {
  MenuButton,
  Transition,
  MenuItems,
  MenuItem,
  Menu,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

export interface Profile {
  firstName: string
  lastName: string
  avatarUrl: string
  id: number
  configs: {
    backgroundColor: string
    primaryColor: string
    secondaryColor: string
  }
}

interface ProfileProps {
  profile: Profile
}

export function Profile({ profile }: ProfileProps) {
  const logout = useAuthStore((state) => state.logout)

  const userNavigation = [
    { name: 'Seu perfil', href: '#' },
    { name: 'Sair', href: '#', action: () => logout() },
  ]

  return (
    <Menu as="div" className="relative">
      <MenuButton className="-m-1.5 flex items-center p-1.5">
        <span className="sr-only">Open user menu</span>
        <img
          className="h-8 w-8 rounded-full bg-gray-50"
          src={profile.avatarUrl}
          alt={profile.id.toString()}
        />
        <span className="hidden lg:flex lg:items-center">
          <span
            className="ml-4 text-sm font-semibold leading-6 text-gray-900"
            aria-hidden="true"
          >
            {profile.firstName.concat(' ').concat(profile.lastName)}
          </span>
          <ChevronDownIcon
            className="ml-2 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </MenuButton>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
          {userNavigation.map((item) => (
            <MenuItem key={item.name}>
              {({ focus }) => (
                <button
                  type="button"
                  onClick={item.action}
                  className={classNames(
                    focus ? 'bg-gray-50' : '',
                    'block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900',
                  )}
                >
                  {item.name}
                </button>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Transition>
    </Menu>
  )
}
