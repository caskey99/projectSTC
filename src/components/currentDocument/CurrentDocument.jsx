import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setDocumentBody, setValueDoc} from "../../toolkitRedux/toolkitSlice";
import DocumentViewer from "../DocumentViewer/DocumentViewer";

const CurrentDocument = ({isSend}) => {

    const dispatch = useDispatch();
    const document = (useSelector(state => state.toolkit.documentBody));
    const valuesMsg = (useSelector(state => state.toolkit.valuesMsg));
    const currMsg = useSelector(state => state.toolkit.currentMessage);

    function setDocument(doc){
        dispatch(setDocumentBody(doc));
    }

    return (
        document !== '' && document !== null
            ?
            <DocumentViewer document={JSON.parse(document)} dispatch={setDocument} isSend={isSend}  />
            //<DocumentViewer dataForView={JSON.parse(document.toString())} payload={JSON.parse(document.toString()).blank} />
            :
            valuesMsg.length
            ?
                <DocumentViewer document={JSON.parse(JSON.parse(currMsg).body)} dispatch={setDocument} isSend={isSend}  />
                :
                <div>pusto</div>
        //
        // <div className="current-document">
        //     <div className="current-document-title">
        //         <h3>Приказ о перевозке №9</h3>
        //         <div className="icon">
        //             <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        //                 <path fillRule="evenodd" clipRule="evenodd" d="M7.29409 8L0 0.705911L0.705911 0L8 7.29409L15.2941 0L16 0.705911L8.70591 8L16 15.2941L15.2941 16L8 8.70591L0.705911 16L0 15.2941L7.29409 8Z" fill="#45494D"/>
        //             </svg>
        //         </div>
        //     </div>
        //     <div className="current-document-container">
        //         <div className="current-document-container-identity">
        //             <span>идентификатор распоряжения</span>
        //             <input type="text" id="message" placeholder="Placeholder"/>
        //             <span className="identity-subtitle">Текст пояснения</span>
        //         </div>
        //         <div className="current-document-container-project">
        //             <span>Проект</span>
        //             <select name="" id="" >
        //                 <option value="">Не задано</option>
        //             </select>
        //         </div>
        //         <div className="current-document-container-timer">
        //             <span className="timer-subtitle">Длительность</span>
        //             <input type="time" step="2"/>
        //             <span className="timer-metric">сек</span>
        //         </div>
        //         <div className="current-document-container-nameObject">
        //             <span>Наименование объекта</span>
        //             <input type="text" placeholder="Placeholder"/>
        //         </div>
        //
        //         <div className="drop-down-menu">
        //             <div className="drop-down-menu-value">
        //                 Имя по умолчанию
        //             </div>
        //             <select className="drop-down-menu-selection-field" required="required">
        //                 <option className="drop-down-menu-selection-field-value-disabled" value="">Не выбрано</option>
        //                 <option className="drop-down-menu-selection-field-value" value="">Выбрано</option>
        //                 <option className="drop-down-menu-selection-field-value" value="">Не выбрано</option>
        //             </select>
        //         </div>
        //     </div>
        // </div>
    )
}

export default CurrentDocument;