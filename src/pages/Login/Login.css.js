import { makeStyles } from '@material-ui/core'
import loginBg from '../../assets/login-bg.jpeg'
export default makeStyles(theme => ({
    page: {
        width: '100vw',
        height: '100vh',
        background: `url("${loginBg}")`,
        backgroundSize: 'cover',
    },
}))
