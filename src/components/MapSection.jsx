/* eslint-disable react/prop-types */
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from './Icon'
import { useEffect } from "react";

const MapSection = ({ address }) => {
  const position = [address?.location?.lat, address?.location?.lng];

  const FlyTo = ({ position }) => {
    const map = useMap();

    useEffect(() => {
      if (
        position &&
        position.length === 2 &&
        !isNaN(position[0]) &&
        !isNaN(position[1])
      ) {
        map.flyTo(position, 13, {
          animate: true,
        });
      }
    }, [map, position]);

    return null;
  };
  return (
    <>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={icon} position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        {position && <FlyTo position={position} />}
      </MapContainer>
    </>
  );
};

export default MapSection;