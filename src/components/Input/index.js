import React from 'react';
import _ from 'lodash';
// import NumberFormat from 'react-number-format';
import KEY_CODES from './KEY_CODES';
import Icon from '../Icon';
import b_ from 'b_';
import cn from 'classnames';
import './style.scss';

const b = b_.lock(`Input`);

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focused     : false,
      isSelectOpen: false,
      touched     : this.props.touched,
    };

    this.inputRef = React.createRef();
    this.inputRefNumber = React.createRef();
    this.containerRef = React.createRef();
    this.activeSelectItem = React.createRef();
  }

  componentDidMount() {
    if (_.includes([`select`, `search`], this.getControlType())) {
      document.addEventListener(`mousedown`, this.handleClickOutsideSelect);
    }
  }

  componentDidUpdate({ value: valuePrev }) {
    if (this.props.value !== valuePrev) this.validate();
  }

  componentWillUnmount() {
    if (_.includes([`select`, `search`], this.getControlType())) {
      document.removeEventListener(`mousedown`, this.handleClickOutsideSelect);
    }
  }

  handleClickOutsideSelect = event => {
    if (
      this.state.isSelectOpen
      && this.containerRef
      && (this.containerRef.current || this.inputRef.current)
      && (
        !this.containerRef.current.contains(event.target)
        || (this.inputRef.current && this.inputRef.current.contains(event.target))
      )
    ) {
      if (this.inputRef.current && this.inputRef.current.contains(event.target)) {
        event.stopPropagation();
        event.preventDefault();
      }
      this.closeSelect();
    }
  }

  onChange = event => {
    this.props.onChange(this.props.normalize(event.target.value));
  }

  onSelect = ({ label, value }) => {
    this.setSearch(label);
    this.props.onChange(value);
    this.closeSelect();
    this.props.onOptionSelect(value);
  }

  setSearch = event => this.setState({
    search: _.isString(event) ? event : event.target.value,
  });

  onKeyDown = event => {
    if (event.keyCode === KEY_CODES.ENTER && this.props.type !== `textarea`) event.preventDefault();
  }

  onKeyUp = event => {
    const { onCtrlEnterPress, onEnterPress } = this.props;

    if (onCtrlEnterPress && event && event.keyCode === KEY_CODES.ENTER && event.ctrlKey) onCtrlEnterPress();
    if (onEnterPress && event && event.keyCode === KEY_CODES.ENTER && !event.ctrlKey) onEnterPress();
  }

  closeSelect = () => {
    this.setState({ isSelectOpen: false }, this.blur);
  }

  openSelect = () => {
    this.setState({ isSelectOpen: true }, () => {
      if (this.props.scrollIntoActiveOption && this.activeSelectItem && this.activeSelectItem.current) {
        this.activeSelectItem.current.scrollIntoView();
      }
    });
  }

  clear = () => this.props.onChange(``);

  blur = () => {
    if (this.inputRef && _.isFunction(this.inputRef.blur)) this.inputRef.blur();
    if (_.get(this.inputRef, `current`) && _.isFunction(this.inputRef.current.blur)) this.inputRef.current.blur();
    if (this.inputRefNumber && _.isFunction(this.inputRefNumber.blur)) this.inputRefNumber.blur();
    this.setState({ focused: false }, this.validate);
  }

  focus = async () => {
    const { disabled, name, setTouched } = this.props;
    if (disabled) return;

    if (_.includes([`select`, `search`], this.getControlType())) this.openSelect();
    if (this.inputRef && _.isFunction(this.inputRef.focus)) this.inputRef.focus();
    if (_.get(this.inputRef, `current`) && _.isFunction(this.inputRef.current.focus)) this.inputRef.current.focus();
    if (this.inputRefNumber && _.isFunction(this.inputRefNumber.focus)) this.inputRefNumber.focus();
    this.setState({ focused: true, touched: true }, () => setTouched(name));
  }

  onInputClick = () => {
    if (!this.state.isSelectOpen) this.focus();
  }

  validate = () => {
    const { clearableSelect, validate, value } = this.props;
    if (clearableSelect && _.isEmpty(value)) this.setState({ search: null });

    if (!_.isFunction(validate)) return;
    this.setState({ invalid: !validate(value) });
  }

  getControlType = () => {
    if (this.props.select) return `select`;
    if (this.props.searchable) return `search`;
    if (this.props.type === `file`) return `file`;
    if (this.props.type === `textarea`) return `textarea`;
    return _.includes([`number`, `tel`], this.props.type) ? `number` : `text`;
  }

  getControl = () => {
    let Control = `input`;

    // if (this.getControlType() === `number`) Control = NumberFormat;
    if (this.props.type === `textarea`) Control = `textarea`;

    return Control;
  }

  getControlProps = () => {
    const type = this.getControlType();
    const controlProps = {
      onChange: this.onChange,
    };

    const { options, searchable, value } = this.props;

    switch (type) {
      case `number`:
        controlProps.getInputRef = this.inputRef;
        controlProps.type = `tel`;
        break;
      case `search`:
        controlProps.onChange = event => {
          this.setSearch(event);
          this.props.onChange(event);
        };
        controlProps.value = this.state.search || _.get(_.find(options, { value }), `label`, ``);
        break;
      case `select`:
        controlProps.onChange = searchable ? this.setSearch : this.onChange;
        controlProps.type = `text`;
        controlProps.readOnly = true;
        controlProps.ref = this.inputRef;
        controlProps.value = this.state.search || _.get(_.find(options, { value }), `label`, ``);
        break;
      case `textarea`:
        controlProps.ref = this.inputRef;
        controlProps.rows = 2;
        break;
      default:
        controlProps.ref = this.inputRef;
        break;
    }

    return controlProps;
  }

  render() {
    /* eslint-disable no-unused-vars */
    const {
      after,
      autoComplete,
      className,
      clearable,
      controlClassName,
      customPlaceholder: CustomPlaceholder,
      disabled,
      focusedClassName,
      forceShowPlaceholder,
      invalidClassName,
      label,
      labelClassName,
      labelExternal,
      name,
      noLabel,
      noZoomClassName,
      omitName,
      options,
      placeholder,
      searchable,
      // selectClassName,
      selectItemClassName,
      size,
      type,
      value,
    } = this.props;
    /* eslint-enable no-unused-vars */
    const {
      focused,
      invalid,
      isSelectOpen,
      search,
      touched,
    } = this.state;
    const Control = this.getControl();
    const controlProps = this.getControlProps();
    const controlType = this.getControlType();

    const optionsFiltered = (search && searchable)
      ? _.filter(options, option => _.includes(_.toLower(option.label), _.toLower(_.trim(search))))
      : options;

    const showCustomPlaceholder = CustomPlaceholder
      && (value === `` || forceShowPlaceholder);

    const isLabelFocused = focused || !!value || value === 0;

    return (
      <React.Fragment>
        {labelExternal && (<label className={labelClassName}>{label}</label>)}
        <div
          className={cn(
            b({
              clearable,
              focused,
              invalid : touched && invalid,
              size,
              textarea: type === `textarea`,
              type    : controlType,
            }),
            className,
            touched && invalid ? invalidClassName : ``,
          )}
          onClick={this.onInputClick}
          ref={this.containerRef}
        >
          {!noLabel && !labelExternal && (
            <label
              className={cn(
                b(`label`, {
                  asPlaceholder: !placeholder && !CustomPlaceholder,
                  focused      : isLabelFocused,
                  size         : (!placeholder && !CustomPlaceholder),
                }),
                labelClassName,
                isLabelFocused && focusedClassName,
              )}
            >
              {label}
            </label>
          )}
          <Control
            autoComplete={autoComplete}
            className={cn(
              b(`control`),
              controlClassName,
              noZoomClassName,
            )}
            disabled={disabled}
            name={omitName ? undefined : name}
            onBlur={this.blur}
            onFocus={this.focus}
            onKeyDown={this.onKeyDown}
            placeholder={placeholder}
            value={value}
            {...(controlType === `textarea` ? {} : { type: controlType })}
            {...controlProps}
          />
          {showCustomPlaceholder && (
            <CustomPlaceholder
              className={b(`custom-placeholder`)}
              onClick={this.focus}
              value={value}
            />
          )}
          {clearable && (
            <Icon
              className={b(`clear-icon`, { visible: !!value })}
              icon='close-small'
              onClick={this.clear}
            />
          )}
          {controlType === `select` && (
            <Icon
              className={b(`select-icon`, { isSelectOpen })}
              icon='arrow-bottom'
              onClick={isSelectOpen ? this.closeSelect : null}
            />
          )}
          {searchable && (
            <Icon
              className={b(`search-icon`)}
              icon='search'
            />
          )}
          {isSelectOpen && (
            <ul
              className={b(`select`)}
              style={_.size(optionsFiltered) < 4 ? { maxHeight: _.size(optionsFiltered) * 40 + 2 } : {}}
            >
              {_.map(optionsFiltered, option => {
                const active = option.value === value;
                return (
                  <li
                    className={cn(b(`select-item`, { active }), selectItemClassName)}
                    key={option.value}
                    onClick={() => this.onSelect(option)}
                    ref={active ? this.activeSelectItem : _.noop}
                  >
                    {option.label}
                  </li>
                );
              })}
            </ul>
          )}
          {after}
        </div>
      </React.Fragment>
    );
  }
}

Input.defaultProps = {
  autoComplete          : `off`,
  className             : ``,
  clearable             : false,
  controlClassName      : ``,
  disabled              : false,
  focusedClassName      : ``,
  forceShowPlaceholder  : false,
  invalid               : false,
  invalidClassName      : ``,
  isLoading             : false,
  labelExternal         : false,
  noLabel               : false,
  normalize             : _.identity,
  noZoomClassName       : ``,
  omitName              : false,
  onChange              : _.noop,
  onOptionSelect        : _.noop,
  onRef                 : _.noop,
  placeholder           : ``,
  readOnly              : false,
  scrollIntoActiveOption: false,
  searchable            : false,
  select                : false,
  selectClassName       : ``,
  selectItemClassName   : ``,
  setTouched            : _.noop,
  size                  : `m`,
  submit                : _.noop,
  touched               : false,
  type                  : `text`,
  value                 : ``,
};

export default Input;
