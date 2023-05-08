import React, {useEffect, useRef, useState} from 'react';
import CurrentDocument from "../currentDocument/CurrentDocument";
import {Buffer} from "buffer";
import {setDocumentBody} from "../../toolkitRedux/toolkitSlice";
import {useDispatch} from "react-redux";

const ChooseDocument = ({openDoc, closeDoc}) => {

    const dispatch = useDispatch();
    const [dataFile, setDataFile] = useState();
    const fileInputRef = useRef(null);
    const fileReader = new FileReader();
    const [isLoaded, setIsLoaded] = useState(false);

    fileReader.onloadend = async () => {
        const obj = JSON.parse(JSON.stringify(fileReader.result));
        const json = Buffer.from(obj.substring(29), "base64").toString();
        const result = JSON.parse(json);
        setDataFile(result);
        // console.log("onloadend " + json);
        dispatch(setDocumentBody(json));
        setIsLoaded(true);
        openDoc();
    };

    function handleFileSelect(event) {
        event.preventDefault();
        const fileList = event.target.files[0];
        fileReader.readAsDataURL(fileList);
    }

    function handleClick() {
        fileInputRef.current.click();
    }

    return (
        <>
            <div className="choose-document">
                <div className="choose-document-title">
                    Нет выбранных документов
                </div>
                <div className="choose-document-description">
                    Для отправки документа откройте документы и выберите пользоватея
                </div>
                <button onClick={handleClick} className="choose-document-button">
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                    />
                    Документы
                </button>
            </div>
        </>
    )
}

export default ChooseDocument;