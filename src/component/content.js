const Content = (props) => {
    return(
        <>
        <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw'
        }}>
            <p style={{
                color: 'white',
                fontSize: '30px'
            }}> Witaj {props.user.username}! To jest treść widoczna po zalogowaniu się 😊</p>

            <button onClick={() => props.logout()}>Wyloguj</button>
        </div>
        </>
    )
}

export default Content