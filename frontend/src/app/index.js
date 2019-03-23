// @flow

import Bluebird from 'bluebird';
import React from 'react';
import { render } from 'react-dom';
import ReactModal from 'react-modal';
import Root from '@root/modules/Root';

Bluebird.config({
    cancellation: true
});

const rootId = 'speedcontrol';
const rootElement = document.getElementById(rootId);
ReactModal.setAppElement(rootElement);

if (rootElement == null) {
    throw new Error(`#${rootId} could not be found`);
}

render(<Root />, rootElement);
