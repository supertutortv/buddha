import React from 'react'

const STDialogCentered = ({error,children}) => {
    return (
        <section className="stDialogCentered">
            <header className="stDialogCenteredHeader">
                <img src="/assets/img/sttv_logo.png" />
            </header>
            <div className="stDialogCenteredInset z-depth-1">
                {children}
                <div className="stFormErrors">{error.message}</div>
            </div>
        </section>
    )
}

export default STDialogCentered