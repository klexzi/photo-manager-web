import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
    noCaptionText: {
        color: 'rgba(0, 0, 0, 0.4)',
    },
    iconButton: {
        padding: '0',
        margin: '0 10px',
        fontSize: '0.4rem',
        '& .MuiIcon-root': {
            fontSize: '1.1rem',
        },
    },
}))
