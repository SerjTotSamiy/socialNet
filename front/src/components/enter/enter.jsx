function Enter() {


    return <form action="/enter" method={"POST"} className={'registration'}>
        <input type="text" name={'username'} placeholder={"name"} required={true} minLength={3}/>
        <input type="text" name={'password'} placeholder={'password'} required={true} minLength={4}/>
        <input type="submit"/>
    </form>
}

export default Enter
