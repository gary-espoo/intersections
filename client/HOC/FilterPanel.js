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

                    <Select onChangeHandler={props.onChangeHandler} data={props.filterProjects } type={'projects'} default="Please Select Project"/>
                    <Select onChangeHandler={props.onChangeHandler} data={props.filterZones }  type={'zones'}  default="Please Select Region/Place"/>
                    <Select onChangeHandler={props.onChangeHandler} data={props.filterIntersections } type={'intersections'} default="Please Select Intersection"/> 
                    
                    <button  onClick={props.onReset} > Reset filter</button> 
                    <button  onClick={props.onSearch} > Search</button> 
                    
                    
                </div>
            </div>
        </div>
    );
}

export default FilterPanel;