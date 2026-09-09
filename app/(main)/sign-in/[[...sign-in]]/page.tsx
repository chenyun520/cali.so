import { AccountAccess } from '../../AccountAccess'

export const metadata = {
  title: '登录',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <AccountAccess mode="sign-in" />
}
