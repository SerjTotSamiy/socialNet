import './App.css';
import HomePage from "./components/homePage/homePage";
import {Link, Route, Routes} from "react-router-dom";
import MyRoutes from "./components/routes/routes";


function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Link to="/"> Home</Link>
                <Link to="/registration">Registration</Link>
                <Link to="/enter"> Enter</Link>
            </header>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
            </Routes>
            <MyRoutes/>
        </div>
    );
}

export default App;
