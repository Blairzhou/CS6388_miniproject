import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import Board from './board';

const container = document.getElementById(VISUALIZER_INSTANCE_ID);
const root = ReactDOMClient.createRoot(container);
//root.render(<p>Hello</p>)

const onUpdateFromControl = (descriptor) => {
    console.log('rendering', descriptor);
    root.render(<Board values={descriptor.values}/>);
}
console.log('connecting to control');
WEBGME_CONTROL.registerUpdate(onUpdateFromControl);