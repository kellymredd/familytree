export default function CheckboxGroup({
  value = [],
  name,
  onChange = noop,
  children,
}) {
  function handleOnChange({ target }) {
    const { checked, value: eventValue } = target;
    let updated = [...value];
    const newValue = Number(eventValue);
    if (checked) {
      updated.push(newValue);
    } else {
      updated = updated.filter((c) => c !== newValue);
    }

    return onChange(updated);
  }

  function getCheckboxProps(checkboxValue) {
    return {
      name,
      value: checkboxValue,
      onChange: handleOnChange,
      checked: !!value.includes(checkboxValue),
    };
  }

  return children(getCheckboxProps);
}
