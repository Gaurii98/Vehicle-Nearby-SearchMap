import React from "react"
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Circle } from "react-google-maps"

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCpRT2Fboqg_A0j-1cb4H5tJBEwmwtgLUA",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 28.6, lng: 77.2 }}
    center = {{ lat: props.latitude, lng: props.longitude }}
  >
    {props.isMarkerShown && props.markers.map((marker,index) =>(
          <Marker 
            key={index}
            position = {marker}
          />  
        
        ))
      }  
  
  <Circle 
      center={{ lat: props.latitude || 0, lng: props.longitude || 0 }}
      radius = {props.radius}
      visible={true}
      options = {{
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35
            }}

    />

    
  </GoogleMap>
)

export default MyMapComponent;