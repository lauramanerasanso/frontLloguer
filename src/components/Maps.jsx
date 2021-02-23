import React, { Component } from 'react'
import Leaflet from 'leaflet';
import { MapContainer, TileLayer, Circle} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import "../Mapa.css";

Leaflet.Icon.Default.imagePath =
'../node_modules/leaflet'

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});



export default class Maps extends Component {
state = {
    
    zoom: 12,
}


render() {
    const lila = { color: '#976acd' }
  
   
    const position = [this.props.lat, this.props.lng]
    return (
    <MapContainer center={position} zoom={this.state.zoom}>
        <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
         <Circle center={position} pathOptions={lila} radius={1000} />
    </MapContainer>
    )
}
}