import {useEffect, useState} from "react";
import './messages.css'

function Messages() {
    const [users, setUsers] = useState();


    useEffect(() => {
        fetch('http://localhost:3001/current-user-friends')
            .then(res => res.json())
            .then(result => {
                const timeUsers = result.users.map(elem => {
                    return <div key={elem._id} className={'currentMessages'}>
                        <p>{elem.name}</p>
                        <form action={"/write-message"} method={"POST"}>
                            <textarea name="message"/>
                            <input type="submit"/>
                            <input type="hidden" value={elem._id} name={'id'}/>
                        </form>
                    </div>
                })
                setUsers(timeUsers)
            })
    }, [])




    return <div>
        {users}
    </div>
}


export default Messages
