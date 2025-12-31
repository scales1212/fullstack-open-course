const Notification = ({message}) => {
    const errorStyle = {
        color: 'red',
        fontStyle: 'italic'
    }
    const updateStyle = {
        color: 'green',
        fontStyle: 'italic'
    }

    if (message === null) {
        return null
    }

    if (message.includes("Error")) {
        return (
            <div style={errorStyle}>
                {message}
            </div>
        )
    }
    else {
        return (
            <div style={updateStyle}>
                {message}
            </div>
        )
    }
}

export default Notification