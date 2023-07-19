import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LogIn from "./Components/LogIn";
import Notes from "./Components/Notes";
import NoteState from "./context/notes/NoteState";
import Navbar from "./Components/Navbar";
import React from "react";
import SideBar from "./Components/SideBar";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>
            <NoteState>
                <Router>
                    <Routes>
                        <Route exact path={"/"} element={<LogIn/>}/>
                        <Route exact path={"/notes"} element={
                            <div className={"relative"}>
                                <Navbar/>
                                <div className={"flex"}>
                                    <SideBar/>
                                    <Notes/>
                                </div>
                            </div>
                        }></Route>
                    </Routes>
                    <ToastContainer
                        position="bottom-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
                </Router>
            </NoteState>
        </>
    );
}

export default App;
