import React from 'react';	

class TruckTable extends React.Component{

	render(){
		return(
			<div>
				<table>
				<thead>
				<tr><th>Vehicle Number</th><th>Driver Name</th><th>Driver Phone</th></tr> 
				</thead>
				<tbody>
				{Object.keys(this.props.data).map((key,value) => (	
				<tr key = {value}><td>{this.props.data[key].truck_number}<br/><small>{this.props.data[key].truck_type}</small></td><td>{this.props.data[key].driver_name}</td><td>{this.props.data[key].phone_no}</td></tr>)
				)}
				</tbody>
				</table>				
			</div>
		)
		
	}
}	


export default TruckTable;