import { makeStyles } from '@material-ui/core'

import errorImage from '../../assets/500.png'

export default makeStyles(theme => ({
    errorPage: {
        width: '100vw',
        height: '100vh',
        background: `url(${errorImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
}))
