import {Link} from "react-router-dom";
import MyRoutes from "../routes/routes";

function MyPage() {

    function exit() {
        fetch('http://localhost:3001/exit')
    }

    return <div>
        <nav>
            <p><Link to="/myPage"> My page</Link></p>
            <p><Link to={'/messages'}>Messages</Link></p>
            <p><Link to={'/friends'}>Friends</Link></p>
            <form action="http://localhost:3001/exit">
                <input type="submit" value={"exit"} onClick={() => exit()}/>
            </form>
        </nav>

        <MyRoutes/>
    </div>
}

export default MyPage
