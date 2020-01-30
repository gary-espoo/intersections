import React from 'react';
import {uniqBy} from 'lodash';
import FilterPanel from './HOC/FilterPanel';
import Table from './HOC/Table';
import callAPI from './services/callAPI';
import './App.css';
import {isAfter} from 'date-fns';

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: undefined,
            endDate: undefined,
            projects: null,
            zones: null,
            day: [],
            intersections: null,
            data: [],
            filterProjects: [],
            filterZones: [],
            filterIntersections: []
        };
        this.initData = [];
    };

    async componentDidMount() {
        //Load the Filters for the Filter panel
        this.initData = await callAPI.filters();
        //Get the default list of Violations
        const data = await callAPI.getViolations();

        this.setState({data: data.data, filterProjects: this.initData[0].projects});
    };
    //Populate the filters for Projects, Intersections and zones
    extractFilters(payload, type, data) {
        let retData = [];
        switch (type) {
            case 'zones':
                data[0]
                    .projects
                    .map(item => {
                        if (payload == item.id) {
                            data[1]
                                .zones
                                .map(zoneItem => {
                                    if (item.zones.includes(zoneItem.id)) {
                                        retData.push(zoneItem);
                                    }
                                })
                        }
                    });
                break;
            case 'intersections':
                data[1]
                    .zones
                    .map(item => {
                        if (payload == item.id) {
                            data[2]
                                .intersections
                                .map(intersectionItem => {
                                    if (item.intersections.includes(intersectionItem.id)) {
                                        retData.push(intersectionItem);
                                    }
                                })
                        }
                    });
                break;
            default:
                this.setState({[type]: payload});
        }
        return retData;
    }
    //Callback for all the changes
    onChangeHandler(type, payload) {
        switch (type) {
            case 'projects':
                const zones = uniqBy(payload.map(item=>{
                    return this.extractFilters(item, 'zones', this.initData);
                }).flat(), 'id'); 
                this.setState({[type]: payload, filterZones: zones, zones: null, intersections: null});
                break;
            case 'zones':
                const intersections = uniqBy(payload.map(item=>{
                    return this.extractFilters(item, 'intersections', this.initData);
                }).flat(), 'id');
                
                this.setState({
                    [type]: payload,
                    filterIntersections: intersections,
                    intersections: intersections.length === 1
                        ? intersections[0].id
                        : null
                });
                break;
            default:

                this.setState({[type]: payload});
        }
    };

    async onSearch() {
        const {startDate, endDate, projects, intersections} = this.state;
        
        if (isAfter(new Date(startDate), new Date(endDate))) {

            alert('please check start and end DateTime');

        } else {

            let searchParams = '';
            if (startDate) {
                searchParams = searchParams.concat(`&startTime=${Date.parse(startDate)}`);
            }

            if (endDate) {
                searchParams = searchParams.concat(`&endTime=${Date.parse(endDate)}`);
            }

            if (intersections) {
                searchParams = searchParams.concat(`&intersections=${intersections.toString()}`);
            }
            if (searchParams.length > 0) {
                searchParams = '?' + searchParams.substring(1);

            }

            const data = await callAPI.getViolations(searchParams);
            this.setState({data: data.data});
        }
    }

    onReset() {
        this.setState({
            startDate: undefined,
            endDate: undefined,
            projects: null,
            zones: null,
            intersections: null,
            data: [],
            filterZones: [],
            filterIntersections: []
        });
    }
    render() {

        return (
            <div className="main-screen">
                <div className='layout-two width40'>
                    <FilterPanel
                        filterProjects={this.state.filterProjects}
                        filterZones={this.state.filterZones}
                        filterIntersections={this.state.filterIntersections}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onChangeHandler={this
                        .onChangeHandler
                        .bind(this)}
                        onSearch={this
                        .onSearch
                        .bind(this)}
                        onReset={this
                        .onReset
                        .bind(this)}/>
                </div>
                <div className='layout-two width55'>
                    <Table
                        tableData={this.state.data}
                        day={this.state.day}
                        onChangeHandler={this
                        .onChangeHandler
                        .bind(this)}/>
                </div>
            </div>
        );
    }

}

export default Layout;
