import { makeStyles } from '@material-ui/core'

import notFoundImage from '../../assets/404.png'

export default makeStyles(theme => ({
    notFound: {
        width: '100vw',
        height: '100vh',
        background: `url(${notFoundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
}))
