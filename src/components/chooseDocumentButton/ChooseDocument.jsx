import React, { useState } from 'react';
import CurrentDocument from "../currentDocument/CurrentDocument";

const ChooseDocument = ({OpenDoc}) => {
    return (
        <>
            <div className="choose-document">
                <div className="choose-document-title">
                    Нет выбранных документов
                </div>
                <div className="choose-document-description">
                    Для отправки документа откройте документы и выберите пользоватея
                </div>
                <button onClick={OpenDoc} className="choose-document-button">
                    Документы
                </button>
            </div>
        </>
    )
}

export default ChooseDocument;