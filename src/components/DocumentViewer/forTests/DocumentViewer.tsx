// import React, { useRef, useEffect, useState } from 'react';
// import ViewerFactory from '@skif/document-viewer';
// import { TSchemasFindValue } from '../../../types/backendInterfaces';
// import './DocumentViewer.scss';
//
// export interface IDocumentViewer {
//     dataForView: TSchemasFindValue | null,
//     payload?: Record<string, null> | null,
//     flags?: Array<string>,
//     setViewer?: (viewer: Record<any, any>) => void,
// }
//
// const DocumentViewer: React.FC<IDocumentViewer> = ({
//                                                        dataForView,
//                                                        flags,
//                                                        setViewer,
//                                                        payload = {},
//                                                    }) => {
//     const [viewer] = useState(new ViewerFactory({
//         backend: window.skifWebFrontend.backend,
//         fileDialogPool: window.skifWebFrontend.app!.fileDialogPool,
//     }).create('document-viewer'));
//
//     const viewerRef = useRef<HTMLDivElement>(null);
//
//     useEffect(() => {
//         if (dataForView) {
//             if (setViewer) {
//                 setViewer(viewer);
//             }
//
//             viewerRef.current!.innerHTML = '';
//             viewer.theme = 'light';
//             viewer.render();
//             viewer.show({
//                 html: dataForView.ui,
//                 writeData: JSON.stringify(payload),
//                 flags,
//             });
//         } else {
//             viewer.element.remove();
//         }
//     }, [dataForView]);
//
//     return (
//         <div id="document-viewer" className="DocumentViewer" ref={viewerRef} />
//     );
// };
//
// DocumentViewer.defaultProps = {
//     payload: {},
//     flags: [],
//     setViewer: (viewer) => viewer,
// };
//
// export default DocumentViewer;
