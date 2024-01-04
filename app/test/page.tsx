import SingIn from './components/singIn'
import LogIn from './components/logIn'
import UserInfo from './components/userInfo'
import CurrentUser from './components/currentUser'

export default function Page() {
    return (
        <div>
            {/* <SingIn /> */}
            {/* <LogIn /> */}
            <UserInfo />
            <CurrentUser />
        </div>
    )
}
