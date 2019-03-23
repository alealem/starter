// @flow

import * as React from 'react';
import * as Formix from '@ekz/formix';
import cx from 'classnames';

type CommonProps = $Exact<{
    label?: React.Node
}>;

type Props = $Exact<{
    ...CommonProps,
    checked: boolean,
    onChange: boolean => mixed
}>;

export class Checkbox extends React.PureComponent<Props> {
    handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
        this.props.onChange(e.currentTarget.checked);
    };

    render() {
        return (
            <label className="speedcontrol-checkbox">
                <input type="checkbox" checked={this.props.checked} onChange={this.handleChange} />
                <div className={cx('checkbox', { checked: this.props.checked })}>
                    <div className="checkbox-icon" />
                </div>
                <span className="checkbox-label">{this.props.label}</span>
            </label>
        );
    }
}

type FormixProps = $Exact<{
    ...CommonProps,
    field: Formix.FieldRef<boolean>,
    validator?: Formix.FieldValidator<boolean>,
    resetWhenUnmounted?: boolean
}>;

export function FormixCheckbox(props: FormixProps) {
    let { field, validator, resetWhenUnmounted, ...rest } = props;
    return (
        <Formix.Field field={field} validator={validator} resetWhenUnmounted={resetWhenUnmounted}>
            {field => <Checkbox {...rest} checked={field.value} onChange={field.setValue} />}
        </Formix.Field>
    );
}
