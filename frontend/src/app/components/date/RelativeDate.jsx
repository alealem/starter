// @flow

import * as React from 'react';
import Moment from 'moment';
import type { DateTime } from 'luxon';

type Props = {
    date: DateTime
};

function RelativeDate(props: Props) {
    return <span className="speedcontrol-relative-date">{Moment(props.date.toISO()).fromNow()}</span>;
}

export default RelativeDate;
