import React from "react"
import MyMapComponent from './MyMapComponent.js';

class Maps extends React.PureComponent {
  state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    return (
      <React.Fragment>
       {this.props.latitude && <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        latitude = {parseFloat(this.props.latitude)}
        longitude = {parseFloat(this.props.longitude)}
        radius = {parseFloat(this.props.radius)}
        markers = {this.props.markers}
      />}
      </React.Fragment>
    )

  }
}

export default Maps;