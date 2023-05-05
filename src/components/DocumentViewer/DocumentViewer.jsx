import React from 'react';

class DocumentViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            document: props.document,
            blank: { ...props.document.blank },
            isValid: false
        };
        this.show = this.show.bind(this);
        this.read = this.read.bind(this);
        this.verify = this.verify.bind(this);
    }


    show() {
        const parser = new DOMParser();
        const doc = parser.parseFromString(this.state.document.ui, 'text/html');
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
        console.log(this.state.blank);

    }

    verify() {
        const isValid = Object.values(this.state.blank).every(value => value !== null && value !== "");
        this.setState({ isValid });
        return isValid;
    }

    render() {

        return (
            <>
                <button onClick={ () => {this.read(); }}>Считать данные</button>
                {/*<button onClick={this.verify}>Проверить</button>*/}
                {/*{this.state.isValid && <p>Данные корректны</p>}*/}
                {this.show()}
            </>
        );
    }
}

export default DocumentViewer;