import React from 'react';
import FilterPanel from './HOC/FilterPanel';
import Table from './HOC/Table';
import callAPI from './services/callAPI';
// import lib from '../helper/lib';
import './App.css';
import { isAfter } from 'date-fns';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      startDate:undefined, 
      endDate:undefined, 
      projects:null, 
      zones:null ,
      day:null,
      intersections:null, 
      data: [], 
      filterProjects: [] , 
      filterZones: [] , 
      filterIntersections:[]
    };
    this.initData=[];
  };

  async componentDidMount() {
    const data = await callAPI.getInterSection('/api/violations?intersections=1&startTime=121212112&endTime=121212121&projects=1,2');
    this.initData = await callAPI.filters();
    this.setState({ data: data.data, filterProjects:this.initData[0].projects });
  };
  extractInit(payload,type, data){
    let retData = [];
    switch(type){
      case 'zones':
         data[0].projects.map(item=>{
          if(payload==item.id){
            data[1].zones.map(zoneItem => {
              if(item.zones.includes(zoneItem.id)){
                retData.push(zoneItem);
              }
            })
          } 
        });
        break;
        case 'intersections':
          data[1].zones.map(item=>{
           if(payload==item.id){
             data[2].intersections.map(intersectionItem => {
               if(item.intersections.includes(intersectionItem.id)){
                 retData.push(intersectionItem);
               }
             })
           } 
         });
         break;
      default:
        this.setState({[type]:payload});
    }
    return retData;
  }
  onChangeHandler(type, payload) {
    switch(type){
      case 'projects':
        const zones = this.extractInit(payload,'zones',this.initData);
        this.setState({[type]:payload, filterZones:zones, zones:null, intersections:null});
        break;
      case 'zones':
        const intersections = this.extractInit(payload,'intersections',this.initData);
        this.setState({[type]:payload,
          filterIntersections:intersections, 
          intersections: intersections.length===1? intersections[0].id:null
        });
        break;
      default:
        console.log('panna: ', payload);

        this.setState({[type]:payload});
    }
  };

  async onSearch() {
    const {startDate,endDate,projects, intersections} =this.state;
    if(isAfter(new Date(startDate), new Date(endDate))){
      alert('please check start and end DateTime');
    } else {
      const data = await callAPI.getInterSection(`/api/violations?intersections=${intersections}&startTime=${Date.parse(startDate)}&endTime=${Date.parse(endDate)}&projects=${projects}`);
    this.setState({ data: data.data});
    }
  }

   onReset() {
    this.setState({
      startDate:undefined, 
      endDate:undefined, 
      projects:null, 
      zones:null ,
      intersections:null, 
      data: [], 
      filterZones: [] , 
      filterIntersections:[]});
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
          onChangeHandler={this.onChangeHandler.bind(this)}
          onSearch={this.onSearch.bind(this)}
          onReset={this.onReset.bind(this)}
          />
        </div>
        <div className='layout-two width55'>
          <Table tableData={this.state.data} day={this.state.day} onChangeHandler={this.onChangeHandler.bind(this)}/>
        </div>
      </div>
    );
  }

}

export default Layout;
