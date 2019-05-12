import React from 'react'

const theyear = new Date

const Footer = () => {
    return (
        <footer>©{theyear.getFullYear()}</footer>
    )
}

export default Footer