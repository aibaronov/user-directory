import React from 'react'
import Header from './Header'
import UserCard from './UserCard'
import data from '../data'

const Main = () => {
    return (
        <>
            <Header/>
            <UserCard data={data}/>
        </>
    )
}

export default Main