import React, {useEffect, useRef, useState} from "react";
import './styles/index.css';
import BottomDocument from "./components/BottomDocument/BottomDocument";
import ChooseDocument from "./components/chooseDocumentButton/ChooseDocument";
import CurrentDocument from "./components/currentDocument/CurrentDocument";
import ListUser from "./components/listUsers/ListUser";
import Messages from "./components/listMessages/listMessages";
import {useDispatch, useSelector} from "react-redux";
import {setValueMsg} from "./toolkitRedux/toolkitSlice";
import {WebsocketClient} from "./WebsocketClient";


function App() {
    const [isOpened, setIsOpened] = useState(false);

    function handleChangeOpened()  {
        setIsOpened((prevState) => {
            return prevState = true;
        })
    }
    function handleChangeClose() {
        setIsOpened((prevState) => {
            return prevState = false;
        })
    }

    const ws = new WebsocketClient();

    ws.onOpen();

    ws.onMessage();

    ws.onClose();

    ws.onError();

    return (
        <>
            <div className="App">
                <div className="container">
                    <main className="main">
                        <div className="main-container">
                            <div className="work-flow">
                                <ListUser openDoc={handleChangeOpened} closeDoc={handleChangeClose} />
                                <div className="document-flow">
                                    {
                                        isOpened ?
                                            <CurrentDocument openDoc={handleChangeClose} />
                                            :
                                            <ChooseDocument openDoc={handleChangeOpened} closeDoc={handleChangeClose} />
                                    }
                                    <BottomDocument ws={ws} closeDoc={handleChangeClose} />
                                </div>
                                <Messages OpenDoc={handleChangeOpened} closeDoc={handleChangeClose} ws={ws}  />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>

    );
}

export default App;

