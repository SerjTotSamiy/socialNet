import {Route, Routes} from 'react-router-dom'

import Registration from "../regisration/registration";
import Enter from "../enter/enter";
import MyPage from "../myPage/myPage";
import Profile from "../profile/profile";
import Friends from "../friends/friends";
import Messages from "../messages/messages";


function MyRoutes() {
    return <Routes>
        <Route path={"/registration"} element={<Registration/>}/>
        <Route path={"/enter"} element={<Enter/>}/>
        <Route path={"/myPage"} element={<MyPage/>}/>
        <Route path={"/profile"} element={<Profile/>}/>
        <Route path={"/friends"} element={<Friends/>}/>
        <Route path={"/messages"} element={<Messages/>}/>
    </Routes>
}

export default MyRoutes
