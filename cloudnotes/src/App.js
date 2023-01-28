import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LogIn from "./Components/LogIn";
import Notes from "./Components/Notes";
import NoteState from "./context/notes/NoteState";

function App() {
    return (
        <>
            <NoteState>
                <Router>
                    <Routes>
                        <Route exact path={"/"} element={<LogIn/>}/>
                        <Route exact path={"/notes"} element={<Notes/>}></Route>
                    </Routes>
                </Router>
            </NoteState>
        </>
    );
}

export default App;
