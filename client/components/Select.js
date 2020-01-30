import React from 'react';

const Select = props => {
    if (props.data.length > 0) {
        return (
            <div className="select-options">
                <select 
                multiple
                    onChange={e => {
                        const options = e.target.options;
                        let value = [];
                        for (let i = 0, l = options.length; i < l; i++) {
                          if (options[i].selected) {
                            value.push(options[i].value);
                          }
                        }
                    props.onChangeHandler(props.type, value);
                }}
                    defaultValue={props.default}>
                    <option value={props.default} disabled>{props.default}</option>
                    {props
                        .data
                        .map((item, idx) => {
                            return <option key={idx} value={item.id}>{item.name}</option>
                        })}
                </select>
            </div>
        );
    } else {
        return <React.Fragment/>
    }

}

export default Select;
