import {useEffect, useState} from "react";
import {Link} from "react-router-dom";


function Friends() {
    const [friends, setFriends] = useState()
    const [wallMessage, setWallMessage] = useState()

    useEffect(() => {
        fetch('http://localhost:3001/my-friends')
            .then(res => res.json())
            .then(result => {
                const friends = result.friends.map(elem => {
                    return <div key={elem._id}>
                        <Link to={'/friends'} onClick={() => getWallMessage(elem._id)}>{elem.name}</Link>
                    </div>
                })
                setFriends(friends)
            })
    }, [])

    function getWallMessage(id) {
        fetch(`http://localhost:3001/wall-messages/${id}`)
            .then(result => result.json())
            .then(res => {
                const messages = res.text.map(el => {
                    return <p key={el}>{el}</p>
                })
                setWallMessage(<form action={`/wall-messages/${id}`} method={'POST'}>
                    {messages}
                    <input type="text" name={'wallMessage'}/>
                    <input type="hidden" name={'id'} value={id}/>
                    <input type="submit" value={'Send'}/>
                </form>)
            })

    }


    return <div>

        {friends}

        {wallMessage}
        <form action="/add-friend" method="post" className={'registration'}>
            <input type="text" placeholder={"add friend by id"} name={'idFriend'} required={true}/>
            <input type="submit" value={'Add friend'}/>
        </form>
    </div>
}


export default Friends


