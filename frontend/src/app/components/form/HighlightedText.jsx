// @flow

import * as React from 'react';

type Props = {
    text: string,
    highlight: string
};

export default function HighlightedText({ text, highlight }: Props) {
    return !highlight ? <span>{text}</span> : splitText(text, highlight);
}

function splitText(text, highlight) {
    const regexp = new RegExp(highlight, 'ig');
    const highlightElement = text => <span style={{ backgroundColor: 'yellow' }}>{text}</span>;
    let match;
    let position = 0;
    let result = [];

    do {
        match = regexp.exec(text);
        if (match) {
            result.push(text.substr(position, match.index - position));
            result.push(highlightElement(text.substr(match.index, highlight.length)));
            position = match.index + highlight.length;
        }
    } while (match);

    result.push(text.substr(position, text.length - position));

    return <span>{React.Children.toArray(result)}</span>;
}
