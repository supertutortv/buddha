import React from 'react'

const theyear = new Date

const Footer = () => {
    return (
        <footer>
            <div>© {theyear.getFullYear()} Supertutor Media, Inc.</div>
        </footer>
    )
}

export default Footer