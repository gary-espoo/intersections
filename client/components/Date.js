import React from 'react';
import isDate from 'date-fns/isDate';
import isBefore from 'date-fns/isBefore';
import isAfter from 'date-fns/isAfter';
class Dated extends React.Component {
    constructor (props){
        super(props);
        this.state={startDate:undefined,
            endDate:undefined}
    };
    dateChange(e,type) {
        switch(type){
            case 'startDate': 
                this.props.onChangeHandler('startDate',e.target.value);
                break;
            case 'endDate': 
            this.props.onChangeHandler('endDate',e.target.value,);
        }   
    }
    render(){
        return (
            <div className="date-period">
                <div className="start-date date">
                    <label>From</label>
                    <input value={this.props.startDate} onChange={(e)=>{this.dateChange(e,'startDate')}} type="datetime-local" />
                </div>
                <div className="end-date date">
                    <label>To</label>
                    <input value={this.props.endDate} onChange={(e)=>{this.dateChange(e,'endDate')}} type="datetime-local" />
                </div>
            </div>
        );
    }
}

export default Dated;