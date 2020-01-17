import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Main from '../../components/Main/Main'
import AuthorizePage from '../../components/AuthorizePage/AuthorizePage'

const Home = () => {
    return (
        <AuthorizePage>
            <div>
                <Navbar />
                <Main />
            </div>
        </AuthorizePage>
    )
}

export default Home
