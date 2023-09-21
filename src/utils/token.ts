enum SETTING {
  TOKEN = 'token',
}

export const SET_TOKEN = (token: string) => {
  localStorage.setItem(SETTING.TOKEN, token)
}

export const GET_TOKEN = (): string => {
  return localStorage.getItem(SETTING.TOKEN) || ''
}

export const CLEAR_TOKEN = () => {
  localStorage.removeItem(SETTING.TOKEN)
}
