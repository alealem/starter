// @flow

import Bluebird from 'bluebird';
import * as React from 'react';
import * as Formix from '@ekz/formix';
import Select from 'react-select';
import InputWrapper from './InputWrapper';

type FormatOptionCallback<T> = (
    option: T,
    {
        context: 'menu' | 'value',
        inputValue: string,
        selectValue: ?T
    }
) => React.Node;

type FilterOptionCallback<T> = (option: T, inputValue: string) => boolean;

type ChangeCallback<T> = (
    value: T,
    opts: {
        action:
            | 'select-option'
            | 'deselect-option'
            | 'remove-value'
            | 'pop-value'
            | 'set-value'
            | 'clear'
            | 'create-option'
    }
) => mixed;

type InputChangeCallback = (
    inputValue: string,
    action: 'set-value' | 'input-change' | 'input-blur' | 'menu-close'
) => void;

type CommonProps<T> = {|
    label?: React.Node,
    required?: boolean,
    error?: string,
    active?: boolean,
    touched?: boolean,
    placeholder?: string,
    inputValue?: string,
    onInputChange?: InputChangeCallback,
    onKeyDown?: (SyntheticKeyboardEvent<HTMLElement>) => mixed,
    getOptionValue?: T => string,
    getOptionLabel?: T => string,
    formatOptionLabel?: FormatOptionCallback<T>,
    filterOption?: FilterOptionCallback<T> | null,
    isOptionDisabled?: T => boolean,
    noOptionsMessage?: ({ inputValue: string }) => ?string,
    hideSelectedOptions?: boolean,
    menuIsOpen?: boolean,
    onMenuOpen?: () => mixed,
    onMenuClose?: () => mixed,
    loadingMessage?: ({ inputValue: string }) => ?string,
    isClearable?: boolean,
    isSearchable?: boolean,
    closeMenuOnSelect?: boolean,
    backspaceRemovesValue?: boolean,
    autoFocus?: boolean
|};

type Props<T: {}> = {|
    value: ?T,
    options: Array<T>,
    onChange: ChangeCallback<T | null>,
    onBlur?: (SyntheticFocusEvent<HTMLElement>) => mixed,
    onFocus?: (SyntheticFocusEvent<HTMLDivElement>) => mixed,
    isLoading?: boolean,
    isDisabled?: boolean,
    ...CommonProps<T>
|};

const styles = {
    control: () => ({}),
    indicatorSeparator: () => ({}),
    menu: () => ({}),
    menuList: () => ({}),
    option: () => ({})
};

export function SingleSelect<T: {}>(props: Props<T>) {
    let { label, required, error, active, touched, ...selectProps } = props;

    return (
        <InputWrapper
            label={label}
            required={required}
            error={error}
            active={active}
            touched={touched}>
            {/* $FlowFixMe */}
            <Select classNamePrefix="speedcontrol-select" styles={styles} isMulti={false} {...selectProps} />
        </InputWrapper>
    );
}

type AsyncProps<T: {}> = {|
    value: ?T,
    loadOptions: ({ inputValue: string }) => Promise<Array<T>>,
    defaultOptions?: Array<T> | true,
    onChange: ChangeCallback<T | null>,
    onBlur?: (SyntheticFocusEvent<HTMLElement>) => mixed,
    onFocus?: (SyntheticFocusEvent<HTMLDivElement>) => mixed,
    isDisabled?: boolean,
    ...CommonProps<T>
|};

export function SingleSelectAsync<T: {}>(props: AsyncProps<T>) {
    const { loadOptions, defaultOptions, ...selectProps } = props;

    const { options, isLoading, handleInputChange } = useAsyncLoader<T>(
        loadOptions,
        props.inputValue,
        defaultOptions,
        props.onInputChange
    );

    return (
        <SingleSelect
            {...selectProps}
            options={options}
            isLoading={isLoading}
            onInputChange={handleInputChange}
        />
    );
}

type FormixProps<T: {}> = {|
    field: Formix.FieldRef<?T>,
    validator?: Formix.FieldValidator<?T>,
    resetWhenUnmounted?: boolean,
    options?: Array<T>,
    isLoading?: boolean,
    ...CommonProps<T>
|};

export function FormixSingleSelect<T: {}>(props: FormixProps<T>) {
    let { field, validator, resetWhenUnmounted, ...selectProps } = props;
    return (
        <Formix.Field field={field} validator={validator} resetWhenUnmounted={resetWhenUnmounted}>
            {fieldBag => (
                <SingleSelect
                    value={fieldBag.value}
                    error={fieldBag.error.getOrUndefined()}
                    active={fieldBag.active}
                    touched={fieldBag.touched}
                    onChange={fieldBag.setValue}
                    onBlur={fieldBag.onBlur}
                    onFocus={fieldBag.onFocus}
                    isDisabled={fieldBag.disabled}
                    {...selectProps}
                />
            )}
        </Formix.Field>
    );
}

type FormixAsyncProps<T: {}> = {|
    field: Formix.FieldRef<?T>,
    validator?: Formix.FieldValidator<?T>,
    resetWhenUnmounted?: boolean,
    loadOptions: ({ inputValue: string }) => Promise<Array<T>>,
    defaultOptions?: Array<T> | true,
    ...CommonProps<T>
|};

export function FormixSingleSelectAsync<T: {}>(props: FormixAsyncProps<T>) {
    let { field, validator, resetWhenUnmounted, ...selectProps } = props;
    return (
        <Formix.Field field={field} validator={validator} resetWhenUnmounted={resetWhenUnmounted}>
            {fieldBag => (
                <SingleSelectAsync
                    value={fieldBag.value}
                    error={fieldBag.error.getOrUndefined()}
                    active={fieldBag.active}
                    touched={fieldBag.touched}
                    onChange={fieldBag.setValue}
                    onBlur={fieldBag.onBlur}
                    onFocus={fieldBag.onFocus}
                    isDisabled={fieldBag.disabled}
                    {...selectProps}
                />
            )}
        </Formix.Field>
    );
}

type MultiProps<T: {}> = {|
    value: Array<T>,
    options: Array<T>,
    onChange: ChangeCallback<Array<T>>,
    onBlur?: (SyntheticFocusEvent<HTMLDivElement>) => mixed,
    onFocus?: (SyntheticFocusEvent<HTMLDivElement>) => mixed,
    isLoading?: boolean,
    isDisabled?: boolean,
    ...CommonProps<T>
|};

export function MultiSelect<T: {}>(props: MultiProps<T>) {
    let { label, required, error, active, touched, ...selectProps } = props;

    return (
        <InputWrapper
            label={label}
            required={required}
            error={error}
            active={active}
            touched={touched}>
            {/* $FlowFixMe */}
            <Select classNamePrefix="speedcontrol-select" styles={styles} isMulti {...selectProps} />
        </InputWrapper>
    );
}

type FormixMultiProps<T: {}> = {|
    field: Formix.FieldRef<Array<T>>,
    validator?: Formix.FieldValidator<Array<T>>,
    resetWhenUnmounted?: boolean,
    options?: Array<T>,
    isLoading?: boolean,
    ...CommonProps<T>
|};

export function FormixMultiSelect<T: {}>(props: FormixMultiProps<T>) {
    let { field, validator, resetWhenUnmounted, ...selectProps } = props;
    return (
        <Formix.Field field={field} validator={validator} resetWhenUnmounted={resetWhenUnmounted}>
            {fieldBag => (
                <MultiSelect
                    value={fieldBag.value}
                    error={fieldBag.error.getOrUndefined()}
                    active={fieldBag.active}
                    touched={fieldBag.touched}
                    onChange={fieldBag.setValue}
                    onBlur={fieldBag.onBlur}
                    onFocus={fieldBag.onFocus}
                    isDisabled={fieldBag.disabled}
                    {...selectProps}
                />
            )}
        </Formix.Field>
    );
}

type MultiAsyncProps<T: {}> = {|
    value: Array<T>,
    loadOptions: ({ inputValue: string }) => Promise<Array<T>>,
    defaultOptions?: Array<T> | true,
    onChange: ChangeCallback<Array<T>>,
    onBlur?: (SyntheticFocusEvent<HTMLDivElement>) => mixed,
    onFocus?: (SyntheticFocusEvent<HTMLDivElement>) => mixed,
    isDisabled?: boolean,
    ...CommonProps<T>
|};

export function MultiSelectAsync<T: {}>(props: MultiAsyncProps<T>) {
    const { loadOptions, defaultOptions, ...selectProps } = props;

    const { options, isLoading, handleInputChange } = useAsyncLoader<T>(
        loadOptions,
        props.inputValue,
        defaultOptions,
        props.onInputChange
    );

    return (
        <MultiSelect
            {...selectProps}
            options={options}
            isLoading={isLoading}
            onInputChange={handleInputChange}
        />
    );
}

type FormixMultiAsyncProps<T: {}> = {|
    field: Formix.FieldRef<Array<T>>,
    validator?: Formix.FieldValidator<Array<T>>,
    resetWhenUnmounted?: boolean,
    loadOptions: ({ inputValue: string }) => Promise<Array<T>>,
    defaultOptions?: Array<T> | true,
    ...CommonProps<T>
|};

export function FormixMultiSelectAsync<T: {}>(props: FormixMultiAsyncProps<T>) {
    let { field, validator, resetWhenUnmounted, ...selectProps } = props;
    return (
        <Formix.Field field={field} validator={validator} resetWhenUnmounted={resetWhenUnmounted}>
            {fieldBag => (
                <MultiSelectAsync
                    value={fieldBag.value}
                    error={fieldBag.error.getOrUndefined()}
                    active={fieldBag.active}
                    touched={fieldBag.touched}
                    onChange={fieldBag.setValue}
                    onBlur={fieldBag.onBlur}
                    onFocus={fieldBag.onFocus}
                    isDisabled={fieldBag.disabled}
                    {...selectProps}
                />
            )}
        </Formix.Field>
    );
}

type AsyncLoader<T> = {|
    options: Array<T>,
    isLoading: boolean,
    handleInputChange: InputChangeCallback
|};

function useAsyncLoader<T: {}>(
    loadOptions: ({ inputValue: string }) => Promise<Array<T>>,
    propsInputValue: ?string,
    defaultOptions: Array<T> | true | void,
    onInputChange: ?InputChangeCallback
): AsyncLoader<T> {
    const [options, setOptions] = React.useState(
        Array.isArray(defaultOptions) ? defaultOptions : []
    );
    const [inputValue, setInputValue] = React.useState('');
    const [isLoading, setLoading] = React.useState(false);

    React.useEffect(() => {
        let value = propsInputValue != null ? propsInputValue : inputValue;
        setLoading(true);
        const promise = Bluebird.resolve(loadOptions({ inputValue: value }))
            .then(setOptions)
            .catch(error => {
                console.error(`Could not load options for ${value}, error: ${error}`);
            })
            .finally(() => {
                setLoading(false);
            });
        return () => promise.cancel();
    }, [loadOptions, inputValue, propsInputValue]);

    const handleInputChange = React.useMemo(
        () => (inputValue, action) => {
            setInputValue(inputValue);
            if (onInputChange != null) {
                onInputChange(inputValue, action);
            }
        },
        [onInputChange]
    );

    return { options, isLoading, handleInputChange };
}
