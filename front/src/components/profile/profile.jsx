function Profile() {
    return <form action="/update-profile" method="post" className={'registration'}>
        <input type="text" name={"age"} placeholder={"age"} required={true} minLength={2}/>
        <input type="text" name={"city"} placeholder={"city"} required={true} minLength={2}/>
        <input type="text" name={"country"} placeholder={"country"} required={true} minLength={3}/>
        <input type="submit"/>
    </form>
}


export default Profile
