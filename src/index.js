import React from 'react';
import ReactDOM from 'react-dom';
//import '/home/gaurang/Documents/Project/vehicles_nearby/public/index.html';
//import '/home/gaurang/Documents/Project/vehicles_nearby/public/index.css'


import Maps from './Maps.js';
import data from './data.json';
import TruckTable from './TruckTable.js';
import EntLocn from './EntLocn'


class MainCont extends React.Component
	{	

		state = {
				inputValue: '',
				latlng : {latitude:'',longitude:'',radius:''},
				pressed : false,
			};


		onUpdateValue(evt){
			if((evt.target.value) >= 0){
			this.setState({
				inputValue: evt.target.value
			});
			}
			else{
				evt.target.value = '';
				alert("Don't Enter Negative Value");
			}
			
		}
	
		handleClick(){
				console.log('Locate Pressed');
				let rad = (this.state.inputValue)*1000;
				
				let latlng = {...this.state.latlng};
				latlng.radius = rad;
				
				this.setState({latlng});
				console.log(this.state.latlng);
				this.setState({
					pressed : true,
				});				
		}


		myCallBack = (item) => {
				console.log(item);
				let latlng = {...this.state.latlng};
				if(item.lat){				
					latlng.latitude = item.lat;
					latlng.longitude = item.lng;
					this.setState({latlng});
					console.log(this.state.latlng);
				}		
		}
		
		render(){
			const{latlng , pressed} = this.state;
			const {latitude, longitude, radius} = latlng;
			
			let myObj = data;
			console.log(myObj);

			let markers = [];

			Object.keys(myObj).map((key,value)=>(
					markers.push({
						lat:myObj[key].latitude,
						lng:myObj[key].longitude
					})
			));

			console.log(markers);	
			
			console.log("-----------------");
			console.log(latitude);
			console.log(longitude);
			console.log(radius);
			console.log("-----------------");

			console.log(this.state.pressed);

			  
			return(
					<div>
						<h2>Vehicles Nearby </h2>
						  <hr></hr>
						  <div className ="row">
						  <div className ="col-sm-6">
							<form className="form-horizontal" action="">
								<div className="form-group">
									<label className="control-label col-sm-2" htmlFor="location">Enter Location:</label><br/>
									<div className="col-sm-10">
										<EntLocn geoCode = {this.myCallBack} />	
									</div>
								</div>
								<div className="form-group">
									<label className="control-label col-sm-2" htmlFor="radius">Radius:</label><br/>
									<div className="col-sm-10">
										<input className="form-control form-control-sm" min={0} max={250} oninput="validity.valid||(value='');" onChange = {evt => this.onUpdateValue(evt)} id="radius" type = "number" placeholder="Enter radius" />
									</div>
								</div>
								<div className="form-group text-sm-center">
							    <button type="button" id = 'locate' className="btn btn-lg" style = {{marginLeft : 45 , marginTop: 20 , marginBottom: 20}} onClick = {this.handleClick.bind(this)}>Locate</button><br/>
							    </div>
							</form>
						<div className="col-sm-15" style={{overflow : 'hidden',}}>
							<div id="truck_table" style={{width: 100+'%' , height: 40+'vh' , marginLeft: 25 , overflowY: 'scroll' }}>
								{pressed && <TruckTable data={myObj}/>}
							</div>
						</div>
						</div>
						<div className="col-sm-6" >
							<div className="col-sm-12" id="map" style={{width:100+'%' , height:140+'vh'}}>
							{pressed && <Maps 
								latitude = {latitude} 
								longitude = {longitude} 
								radius = {radius} 
								markers={markers}
								pressed={this.state.pressed}
								/>}
							</div>
						</div>
						</div>
					</div>
				);

			this.setState({
				pressed : false,
			});
		}	
	}
		
	ReactDOM.render(
		<MainCont />,
		document.getElementById('root')
	);	

