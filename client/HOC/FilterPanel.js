import React from 'react';
import Date from '../components/Date';
import Select from '../components/Select';

function FilterPanel( props) {
    return (
        <div className="filter-panel">
            <div className="card">
                <h2>Filters Panel</h2>
                <div className="form">
                    <Date onChangeHandler={props.onChangeHandler} startDate={props.startDate} endDate={props.endDate}  />

                    <Select onChangeHandler={props.onChangeHandler} data={props.filters[0].projects } type={'projects'} default="Please Select Project"/>
                    <Select onChangeHandler={props.onChangeHandler} data={props.filters[1].zones }  type={'zones'}  default="Please Select Region/Place"/>
                    <Select onChangeHandler={props.onChangeHandler} data={props.filters[2].intersections } type={'intersections'} default="Please Select Intersection"/> 
                    
                    <button>Reset filter</button> 
                    <button onClick={props.onSearch}>search</button>
                    
                </div>
            </div>
        </div>
    );
}

export default FilterPanel;