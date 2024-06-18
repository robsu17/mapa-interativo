import { getProfile } from '@/api/get-profile'
import { Profile } from '@/pages/dashboard/utils/profile-dropdown'
import { create } from 'zustand'

type ProfileStore = {
  user: Profile | null
  isLoading: boolean
  getUserInfo: () => Promise<Profile>
}

export const useGetUserProfile = create<ProfileStore>((set) => ({
  user: null,
  isLoading: false,
  async getUserInfo() {
    set({ isLoading: true })
    const user = await getProfile()
    set({ isLoading: false })
    set({ user })
    return user
  },
}))
