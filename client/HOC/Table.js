import React from 'react';
import Select from '../components/Select';

const Table = props => {

    const tempData = {
        avg: 0,
        data: []
    };

    const transformData = (inp, day) => {
        inp.map(item => {
            if (props.day.length>0) {
                console.log(new Date(item.time).getDay())
                if (new Date(item.time).getDay() in day) {

                    tempData.avg += item.speed;
                    tempData
                        .data
                        .push(item);
                }
            } else {
                tempData.avg += item.speed;
                tempData
                    .data
                    .push(item);
            }
        });

        tempData.avg = tempData.avg / tempData.data.length;
        return tempData;
    };
    const days = [
        {
            id: 0,
            name: 'Sunday'
        }, {
            id: 1,
            name: 'Monday'
        }, {
            id: 2,
            name: 'Tuesday'
        }, {
            id: 3,
            name: 'Wednesday'
        }, {
            id: 4,
            name: 'Thursday'
        }, {
            id: 5,
            name: 'Friday'
        }, {
            id: 6,
            name: 'Saturday'
        }
    ];
    // if(props.day && props.day>-1 && props.day<7){
    const {avg, data} = transformData(props.tableData, props.day);

    console.log(data.length)
    return (
        <div className="filter-panel width100">
            <div className="card">
            <h2>Total Violations: {data.length}</h2>
                    <div className="flexCenter">
                        <div className='flex1'>
                            <Select
                                onChangeHandler={props.onChangeHandler}
                                data={days}
                                type={'day'}
                                default="Please select a Day"/>
                        </div>
                        <div className='flex1'>
                            <div>Average Speed {parseFloat(avg).toFixed(2)}
                                km/h</div>
                        </div>
                    </div>
                <h3>Violation List</h3>
                <div className="form">
                    <table>
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Violation Time</th>
                                <th>Violation Speed</th>
                            </tr>
                            {data && data.map((item, idx) => {
                                return (
                                    <tr key={`${item.id}-${idx}`}>
                                        <td>{item.id}</td>
                                        <td>{item.time}</td>
                                        <td>{item.speed}
                                            km/h</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    

                </div>
            </div>
        </div>
    );
}

export default Table;