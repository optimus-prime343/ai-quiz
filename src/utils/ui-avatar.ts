export const getUiAvatar = (text: null | string | undefined) => {
  const url = new URL('/api', 'https://ui-avatars.com/')
  url.searchParams.append('name', text ?? 'P')
  return url.toString()
}
