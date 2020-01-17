import { makeStyles } from '@material-ui/core'

const lightColor = '#e6e6e6'
const fontFamily = 'Pacifico, cursive'
export default makeStyles(theme => ({
    formBox: {
        minWidth: '160px',
        maxWidth: '500px',
    },
    logoTitle: {
        lineHeight: 2.5,
        color: lightColor,
        fontFamily,
    },
    subtitles: {
        lineHeight: 1.8,
        color: lightColor,
    },
    button: {
        padding: '15px 0',
        width: '80%',
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {
        backgroundColor: 'rgba(230, 230, 230, 0.4)',
        margin: '10px 0',
        width: '80%',
        color: lightColor,
        '& .MuiFormLabel-root.Mui-focused': {
            color: lightColor,
        },
        '& .MuiInputBase-root': {
            color: lightColor,
        },
        '& .MuiFormLabel-root': {
            color: 'rgba(230, 230, 230, 0.6)',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'rgba(230, 230, 230, 0.6)',
            },
            '&:hover fieldset': {
                borderColor: 'rgba(230, 230, 230, 0.4)',
            },
            '&.Mui-focused fieldset': {
                borderColor: lightColor,
            },
        },
    },
}))
