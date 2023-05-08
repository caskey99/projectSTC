import React, {useEffect} from 'react';

class DocumentViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            document: props.document,
            blank: { ...props.document.blank },
            isValid: false,
            dispatch: props.dispatch
        };
        this.show = this.show.bind(this);
        this.read = this.read.bind(this);
        this.verify = this.verify.bind(this);
    }


    show() {
        const parser = new DOMParser();
        const doc = parser.parseFromString(this.state.document.ui, 'text/html');
        fillFields(doc, flattenObject(this.state.blank));
        function fillFields(ui, blank) {
            ui.querySelectorAll('*').forEach((el) => {
                if (el.id && blank[el.id]) {
                    el.setAttribute("value", blank[el.id]);
                }
            });
        }

        function flattenObject(obj) {
            const result = {};
            function recurse(currentObj, currentKey) {
                if (typeof currentObj !== 'object') {
                    result[currentKey] = currentObj;
                } else {
                    for (let key in currentObj) {
                        const newKey = currentKey ? `${key}` : key;
                        recurse(currentObj[key], newKey);
                    }
                }
            }
            recurse(obj, '');
            return result;
        }

        return <div className="current-document" dangerouslySetInnerHTML={{ __html: doc.body.innerHTML }} />;
    }

    read() {
        writeToBlank(this.state.blank);
        function writeToBlank(obj) {
            for (const key in obj) {
                if(hasNestedObjects(obj[key])) {
                    writeToBlank(obj[key]);
                }
                const element = document.getElementById(key);
                if (element) {
                    obj[key] = element.value;
                }
            }
        }

        function hasNestedObjects(obj) {
            if(obj)
                return Object.keys(obj).some(key => typeof obj[key] === 'object');
            else
                return false;
        }
        // console.log(this.state.blank);
        this.state.document.blank = this.state.blank;
        this.state.dispatch(JSON.stringify(this.state.document));
    }


    verify() {
        const isValid = Object.values(this.state.blank).every(value => value !== null && value !== "");
        this.setState({ isValid });
        return isValid;
    }

    render() {

        return (
            <>
                <button onClick={ () => {this.read()}}>Считать данные</button>
                {/*<button onClick={this.verify}>Проверить</button>*/}
                {/*{this.state.isValid && <p>Данные корректны</p>}*/}
                {this.show()}
            </>
        );
    }
}

export default DocumentViewer;