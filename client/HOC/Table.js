import React from 'react';

const Table = props => {
    return (
        <div className="filter-panel width100">
            <div className="card">
                <h2>Violation List</h2>
                <div className="form">
                    <table>
                        <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Violation Time</th>
                            <th>Violation Speed</th>
                        </tr>
                        {props.tableData.map((item,idx)=>{
                            return (<tr key={`${item.id}-${idx}`}>
                                <td>{item.id}</td>
                                <td>{item.time}</td>
                                <td>{item.speed}</td>
                            </tr>);
                        })}
                        </tbody>
                    </table>

                    <button>Reset filter</button>
                </div>
            </div>
        </div>
    );
}

export default Table;