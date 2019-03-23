// @flow

import * as React from 'react';

type Props = {
    label: React.Node,
    children: React.Node
};

function Fieldset(props: Props) {
    return (
        <fieldset className="speedcontrol-form-fieldset">
            <legend className="speedcontrol-input-label">{props.label}</legend>
            {props.children}
        </fieldset>
    );
}

export default Fieldset;
