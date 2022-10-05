import React, { useState, useEffect, useCallback } from 'react';

export default function Select({
  label,
  value = '',
  id,
  onChange,
  options = [],
  selectValueKey = 'name',
  selectLabelKey = 'name',
  initialOption = '-Select-',
  ...props
}) {
  const [opts, setOpts] = useState([]);

  useEffect(() => {
    Promise.resolve(options).then((response) => setOpts(response));
  }, [options]);

  const customLayout = useCallback(
    (text, opt) => {
      const label = text.map((t) => opt[t]);
      return label.join(', ');
    },
    [selectLabelKey]
  );

  return (
    <div className="formgroup">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        type="text"
        className="form-control form-select-sm"
        name={id}
        {...{ value, id }}
        onChange={(e) => onChange(e)}
        {...props}
      >
        <option value="0">{initialOption}</option>
        {opts?.map((opt, idx) => (
          <option key={idx} value={opt[selectValueKey]}>
            {Array.isArray(selectLabelKey)
              ? customLayout(selectLabelKey, opt)
              : opt[selectLabelKey]}
          </option>
        ))}
      </select>
    </div>
  );
}
