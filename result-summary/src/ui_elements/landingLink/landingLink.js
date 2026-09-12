
import React from 'react'
import { Link } from 'react-router-dom'

export const LandingLink = ({ children, route }) => {
    return (
        <Link to={route}>
            {children}
        </Link>
    )
}