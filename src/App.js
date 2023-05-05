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


function App({}) {

    const [isOpenedSettings, setIsOpenedSettings] = useState(false);
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

    let ws = new WebsocketClient();

    function createWebsocketClient(ip) {
        // const ip = useSelector(state => state.toolkit.newUserIp);
        // console.log("ip " + ip);
        // ws.onClose();
        // ws = ws.createWebsocketClient(ip)
        // console.log(ws);
    }


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
                                <ListUser openDoc={handleChangeOpened} closeDoc={handleChangeClose} isOpenedSettings={isOpenedSettings} setState={setIsOpenedSettings} createWebsocketClient={createWebsocketClient}/>
                                <div className="document-flow">
                                    {
                                        isOpened ?
                                            <CurrentDocument OpenDoc={handleChangeClose} />
                                            :
                                            <ChooseDocument OpenDoc={handleChangeOpened} />
                                    }
                                    <BottomDocument ws={ws} closeDoc={handleChangeClose} />
                                </div>
                                <Messages OpenDoc={handleChangeOpened} ws={ws}  />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>

    );
}

export default App;

// <div className="current-document" dangerouslySetInnerHTML={ { __html: document.ui  } }>
// const document = useSelector(state => state.toolkit.document);
