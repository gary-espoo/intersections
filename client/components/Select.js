import React from 'react';

const Select = props => {
    if(props.data.length>0){ 
        return (
            <div className="select-options">
                <select onChange={e=>{
                            props.onChangeHandler(props.type,e.target.value);
                        }} defaultValue={props.default} >
                    <option value={props.default} disabled>{props.default}</option>
                    {props.data.map((item, idx) => {
                        return <option 
                        
                        key={idx} value={item.id}>{item.name}</option>
                    })}
                </select>
            </div>
        );
    } else {
        return <React.Fragment/>
    }
    
}

export default Select;
