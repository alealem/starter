//@flow
'use strict';

import * as React from 'react';
import * as Formix from '@ekz/formix';
import InputLabel from './InputLabel';
import Button from './Button';

type Props =
    | {|
          label?: React.Node,
          buttonLabel: React.Node,
          buttonIcon: string,
          tooltip?: string,
          theme: $ElementType<React.ElementProps<typeof Button>, 'theme'>,
          displaySelectedFile: boolean,
          file?: ?File,
          accept?: string,
          multiple?: false,
          required?: boolean,
          error?: string,
          disabled?: boolean,
          active?: boolean,
          touched?: boolean,
          onFocus?: () => mixed,
          onBlur?: () => mixed,
          onSelect: (file: File) => mixed
      |}
    | {|
          label?: React.Node,
          buttonLabel: React.Node,
          buttonIcon: string,
          tooltip?: string,
          theme: $ElementType<React.ElementProps<typeof Button>, 'theme'>,
          displaySelectedFile: boolean,
          file?: ?FileList,
          accept?: string,
          multiple: true,
          required?: boolean,
          error?: string,
          disabled?: boolean,
          active?: boolean,
          touched?: boolean,
          onFocus?: () => mixed,
          onBlur?: () => mixed,
          onSelect: (file: FileList) => mixed
      |};

export default class FileSelect extends React.PureComponent<Props> {
    static defaultProps = {
        buttonLabel: 'Auswählen',
        buttonIcon: 'fa fa-search',
        theme: 'primary',
        displaySelectedFile: true
    };

    inputField: ?HTMLInputElement;

    componentDidUpdate() {
        if (this.props.file == null && this.inputField != null) {
            this.inputField.value = '';
        }
    }

    handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
        if (event.currentTarget.files.length === 0) {
            return;
        }

        if (this.props.multiple === true) {
            this.props.onSelect(event.currentTarget.files);
        } else {
            this.props.onSelect(event.currentTarget.files[0]);
        }
    };

    mountInput = (input: ?HTMLInputElement) => {
        this.inputField = input;
    };

    getMultipleFileNames = (file: FileList): string => {
        if (file.length === 0) {
            return '';
        } else if (file.length === 1) {
            return file.item(0).name;
        } else {
            return `${file.item(0).name}, plus ${file.length - 1} files`;
        }
    };

    get fileName(): string {
        let file = this.props.file;

        if (file == null) {
            return '';
        }

        return file instanceof FileList ? this.getMultipleFileNames(file) : file.name;
    }

    render() {
        return (
            <div className="speedcontrol-file-select-upload">
                <label>
                    <input
                        type="file"
                        onChange={this.handleChange}
                        ref={this.mountInput}
                        multiple={this.props.multiple}
                        accept={this.props.accept}
                    />
                    <InputLabel
                        label={this.props.label}
                        error={this.props.error}
                        touched={this.props.touched}
                        active={this.props.active}
                        required={this.props.required}
                    />
                    <div className="file-upload-selector">
                        <Button
                            icon={this.props.buttonIcon}
                            label={this.props.buttonLabel}
                            theme={this.props.theme}
                            // $FlowFixMe */
                            type="span"
                            raised
                        />
                        {this.props.displaySelectedFile && (
                            <span className="selected-file">{this.fileName}</span>
                        )}
                    </div>
                </label>
            </div>
        );
    }
}

type FileSelectFormixProps = {
    field: Formix.FieldRef<?File>,
    validator?: Formix.FieldValidator<?File>,
    label?: React.Node,
    tooltip?: string,
    buttonLabel?: React.Node,
    buttonIcon?: string,
    required?: boolean,
    theme?: $ElementType<React.ElementProps<typeof Button>, 'theme'>,
    displaySelectedFile?: boolean,
    accept?: string
};

export class FileSelectFormix extends React.PureComponent<FileSelectFormixProps> {
    render() {
        return (
            <Formix.Field field={this.props.field} validator={this.props.validator}>
                {fieldBag => (
                    <FileSelect
                        file={fieldBag.value}
                        error={fieldBag.error.getOrUndefined()}
                        disabled={fieldBag.disabled}
                        active={fieldBag.active}
                        touched={fieldBag.touched}
                        onSelect={fieldBag.setValue}
                        onBlur={fieldBag.onBlur}
                        onFocus={fieldBag.onFocus}
                        required={this.props.required}
                        label={this.props.label}
                        tooltip={this.props.tooltip}
                        buttonLabel={this.props.buttonLabel}
                        buttonIcon={this.props.buttonIcon}
                        theme={this.props.theme}
                        displaySelectedFile={this.props.displaySelectedFile}
                        accept={this.props.accept}
                    />
                )}
            </Formix.Field>
        );
    }
}
