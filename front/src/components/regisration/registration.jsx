import './registration.css'


function Registration() {


    async function saveUser() {
        await fetch('http://localhost:3001/save-user', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(FormData)
        })
    }

    return <div>
        <form action='/save-user' name={"registration"} className={"registration"}
              method='post'>
            <input type="text" placeholder={'Username'} name={'username'} required={true}minLength={4}/>
            <input type="text" placeholder={'Password'} name={'password'} required={true} minLength={5}/>
            <input type="submit" value={"Save"} onClick={() => saveUser}/>
        </form>
    </div>


}

export default Registration
