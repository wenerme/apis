import React, { Component } from 'react';
import JSONEditor from 'jsoneditor/dist/jsoneditor-minimalist';
// import 'jsoneditor/dist/jsoneditor.css';
// import './fixAce.css';
// import '!!css-loader?module!./jsoneditor.css'

const modes = {
  tree: 'tree',
  view: 'view',
  form: 'form',
  code: 'code',
  text: 'text',
};

export type Mode = 'tree' | 'view' | 'form' | 'code' | 'text';

const values = Object.values(modes);

modes['allValues'] = values;

export class JsonEditor extends Component<JsonEditorProps, any> {
  static defaultProps = {
    tag: 'div',
    mode: modes.tree,
    history: false,
    search: true,
    navigationBar: true,
    statusBar: true,
  };
  /**
   * @type TJsonEditorModes
   */
  static modes = modes;
  htmlElementRef;
  jsonEditor;
  err;
  lastValue;

  constructor(props) {
    super(props);

    this.htmlElementRef = null;
    this.jsonEditor = null;

    this.handleChange = this.handleChange.bind(this);
    this.setRef = this.setRef.bind(this);
    this.collapseAll = this.collapseAll.bind(this);
    this.expandAll = this.expandAll.bind(this);
    this.focus = this.focus.bind(this);
  }

  componentDidMount() {
    const { allowedModes, innerRef, htmlElementProps, tag, onChange, ...rest } = this.props;

    this.createEditor({
      ...rest,
      modes: allowedModes,
    });
  }

  // eslint-disable-next-line react/sort-comp
  componentDidUpdate({
    allowedModes,
    schema,
    name,
    theme,
    schemaRefs,
    innerRef,
    htmlElementProps,
    tag,
    onChange,
    ...rest
  }) {
    if (this.jsonEditor) {
      if (theme !== this.props.theme) {
        this.createEditor({
          ...rest,
          theme,
          modes: allowedModes,
        });
      } else {
        if (schema !== this.props.schema || schemaRefs !== this.props.schemaRefs) {
          this.jsonEditor.setSchema(schema, schemaRefs);
        }

        if (name !== this.jsonEditor.getName()) {
          this.jsonEditor.setName(name);
        }
      }
    }
  }

  shouldComponentUpdate({ htmlElementProps, value }) {
    if (this.lastValue !== value) {
      this.jsonEditor?.set(value);
    }
    return htmlElementProps !== this.props.htmlElementProps;
  }

  componentWillUnmount() {
    if (this.jsonEditor) {
      this.jsonEditor.destroy();
      this.jsonEditor = null;
    }
  }

  setRef(element) {
    this.htmlElementRef = element;
    if (this.props.innerRef) {
      this.props.innerRef(element);
    }
  }

  createEditor({ value, ...rest }: any) {
    if (this.jsonEditor) {
      this.jsonEditor.destroy();
    }

    this.jsonEditor = new JSONEditor(this.htmlElementRef, {
      onChange: this.handleChange,
      ...rest,
    });

    this.lastValue = value;
    this.jsonEditor.set(value);
  }

  handleChange() {
    if (this.props.onChange) {
      try {
        const text = this.jsonEditor.getText();
        if (text === '') {
          this.props.onChange(null);
        }

        const currentJson = this.jsonEditor.get();
        this.lastValue = currentJson;
        if (this.props.value !== currentJson) {
          this.props.onChange(currentJson);
        }
      } catch (err) {
        this.err = err;
      }
    }
  }

  collapseAll() {
    if (this.jsonEditor) {
      this.jsonEditor.collapseAll();
    }
  }

  expandAll() {
    if (this.jsonEditor) {
      this.jsonEditor.expandAll();
    }
  }

  focus() {
    if (this.jsonEditor) {
      this.jsonEditor.focus();
    }
  }

  render() {
    const { htmlElementProps, tag } = this.props;

    return React.createElement(tag, {
      ...htmlElementProps,
      ref: this.setRef,
    });
  }
}

export interface JsonEditorProps {
  value?: object | any[];
  /// Set the editor mode.
  mode?: Mode;
  /// Initial field name for the root node
  name?: string;
  /// Validate the JSON object against a JSON schema.
  schema?: object;
  /// Schemas that are referenced using the $ref property
  schemaRefs?: object;

  /**
   * Set a callback function
   * triggered when the contents of the JSONEditor change.
   * Called without parameters. Will only be triggered on changes made by the user.
   * Return new json.
   */
  onChange?: Function;
  /**
   * Set a callback function triggered when an error occurs.
   * Invoked with the error as first argument.
   * The callback is only invoked for errors triggered by a users action,
   * like switching from code mode to tree mode or clicking
   * the Format button whilst the editor doesn't contain valid JSON.
   */
  onError?: Function;
  /**
   * Set a callback function
   * triggered right after the mode is changed by the user.
   */
  onModeChange?: Function;

  /**
   * Provide a version of the Ace editor.
   * Only applicable when mode is code
   */
  ace?: object;
  /**
   * Provide a instance of ajv,
   * the library used for JSON schema validation.
   */
  ajv?: object;
  /**
   * Set the Ace editor theme,
   * uses included 'ace/theme/jsoneditor' by default.
   */
  theme?: string;

  /**
   * Enables history,
   * adds a button Undo and Redo to the menu of the JSONEditor. Only applicable when
   * mode is 'tree' or 'form'
   */
  history?: boolean;
  /**
   * Adds navigation bar to the menu
   * the navigation bar visualize the current position on the
   * tree structure as well as allows breadcrumbs navigation.
   */
  navigationBar?: boolean;
  /**
   * Adds status bar to the buttom of the editor
   * the status bar shows the cursor position and a count of the selected characters.
   * Only applicable when mode is 'code' or 'text'.
   */
  statusBar?: boolean;
  /**
   * Enables a search box in
   * the upper right corner of the JSONEditor.
   */
  search?: boolean;

  /**
   * Create a box in the editor menu where
   * the user can switch between the specified modes.
   */
  allowedModes?: Mode[];

  /// Html element, or react element to render
  tag?: string | React.ElementType;
  ///  html element custom props
  htmlElementProps?: object;
  /// callback to get html element reference
  innerRef?: Function;
}
