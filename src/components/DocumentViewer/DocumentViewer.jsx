import React from 'react';
import {Parser} from "html-to-react";

class DocumentViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.document.name,
            type: props.document.type,
            ui: props.document.ui,
            verified: false,
        };
    }

    show = () => {
        // const parser = new Parser();
        // try {
        //     var jsx = parser.parse(this.state.ui);
        // }
        // catch (err) {}
        //
        // return <div className="current-document">{jsx}</div>;
        console.log("ui " + this.state.ui)

        return (<div className="current-document" dangerouslySetInnerHTML={ { __html: this.state.ui  } }></div>);
    }

    read = () => {
    }

    verify = () => {
    }

    render() {
        return (
            <>
                {this.show()}
                {/*<h2>{this.state.name}</h2>*/}
                {/*<p>Type: {this.state.type}</p>*/}
                {/*<button onClick={this.read}>Read</button>*/}
                {/*<button onClick={this.verify}>Verify</button>*/}
                {/*<p>Status: {this.state.verified ? 'Verified' : 'Not verified'}</p>*/}
            </>
        );
    }
}

export default DocumentViewer;