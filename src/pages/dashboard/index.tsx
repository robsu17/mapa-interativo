import { Separator } from '@/components/separator'
import { Profile } from './utils/profile-dropdown'
import { Sidebar } from './utils/sidebar'
import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuthStore } from '@/store/auth'
import Loading from '@/components/loading'
import { useGetUserProfile } from '@/store/get-user-profile'
import { useEffect } from 'react'

export function Dashboard() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const getProfile = useGetUserProfile((state) => state.getUserInfo)
  const profile = useGetUserProfile((state) => state.user)
  const isLoading = useGetUserProfile((state) => state.isLoading)

  useEffect(() => {
    if (isAuthenticated) {
      getProfile()
    }
  }, [getProfile, isAuthenticated])

  return (
    <div>
      <Helmet title="Página inicial" />
      <Sidebar />
      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Separator />

          <div className="flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {isLoading ? (
                <Loading />
              ) : (
                profile && <Profile profile={profile} />
              )}
            </div>
          </div>
        </div>

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
