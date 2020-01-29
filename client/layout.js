import React from 'react';
import FilterPanel from './HOC/FilterPanel';
import Table from './HOC/Table';
import callAPI from './services/callAPI';
import './App.css';
import { isAfter } from 'date-fns';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { startDate:undefined, endDate:undefined, projects:null, zones:null ,intersections:null, data: [], filters: [{ projects: [] }, 
    { zones: [] },{intersections:[]}] }
  };

  async componentDidMount() {
    const data = await callAPI.getInterSection('/api/violations?intersections=1&startTime=121212112&endTime=121212121&projects=1,2');
    const filters = await callAPI.filters();
    this.setState({ data: data.data, filters });
  };
  
  onChangeHandler(type, payload) {
    this.setState({[type]:payload});
  };

  async onSearch() {
    const {startDate,endDate,projects,zones} =this.state;
    if(isAfter(new Date(startDate), new Date(endDate))){
      alert('please check start and end DateTime');
    } else {
      const data = await callAPI.getInterSection(`/api/violations?intersections=1&startTime=121212112&endTime=121212121&projects=${projects}`);
    this.setState({ data: data.data});
    }
  }
  render() {

    return (
      <div className="main-screen">
        <div className='layout-two width40'>
          <FilterPanel filters={this.state.filters} 
          startDate={this.state.startDate} 
          endDate={this.state.endDate} 
          onChangeHandler={this.onChangeHandler.bind(this)}
          onSearch={this.onSearch.bind(this)}
          />
        </div>
        <div className='layout-two width55'>
          <Table tableData={this.state.data} />
        </div>
      </div>
    );
  }

}

export default Layout;
