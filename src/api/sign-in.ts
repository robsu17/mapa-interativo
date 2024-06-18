import axios from 'axios'

interface SignInBody {
  email: string
  password: string
}

interface SignInResponse {
  accessToken: string
}

export async function signIn({
  email,
  password,
}: SignInBody): Promise<SignInResponse> {
  const response = await axios.post('/auth/sign-in', {
    email,
    password,
  })

  const { accessToken } = response.data

  return {
    accessToken,
  }
}
