import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

import arrow from "./images/icon-arrow.svg";
import background from "./images/pattern-bg-desktop.png";
import icon from "./components/Icon";

const App = () => {
  const [address, setAddress] = useState({
    location: {
      lat: 51.505,
      lng: -0.09,
    },
  });
  const [ipAddress, setIpAddress] = useState("");

  const checkIpAddress =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
  const checkDomain =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;

  useEffect(() => {
    try {
      const initialData = async () => {
        const res = await fetch(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${
            import.meta.env.VITE_REACT_API_KEY
          }&ipAddress=193.62.157.66`
        );
        const data = await res.json();
        console.log(data);
        setAddress(data);
      };
      initialData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const getChangeAddress = async () => {
    const res = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${
        import.meta.env.VITE_REACT_API_KEY
      }&${
        checkIpAddress.test(ipAddress)
          ? `ipAddress=${ipAddress}`
          : checkDomain.test(ipAddress)
          ? `domain=${ipAddress}`
          : ""
      }`
    );
    const data = await res.json();
    setAddress(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getChangeAddress();
  };

  return (
    <>
      <header className="relative h-72 w-full">
        <div className="absolute -z-10 w-full h-full">
          <img
            src={background}
            alt="background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-8 ">
          <h1 className="capitalize text-3xl font-Rubik font-bold text-center text-white mb-8">
            IP adress tracker
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex justify-center max-w-md mx-auto"
          >
            <input
              type="text"
              id="ipAdress"
              placeholder="Search for any IP adress or domain"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              required
              className="px-4 py-3 rounded-l-md w-full text-gray-500 border-none outline-none"
            />
            <button
              type="submit"
              className="bg-black px-4 py-3 hover:bg-opacity-80 rounded-r-md"
            >
              <img src={arrow} alt="arrow" className="" />
            </button>
          </form>
        </div>
      </header>

      {/* Map  */}
      <div className="relative w-full h-[500px]">
        <div className="bg-white rounded-md p-6 mx-20 shadow-lg flex flex-wrap items-center justify-center sm:justify-between gap-2 sm:gap-0 absolute -top-28 sm:-top-16 right-0 left-0 z-10">
          <div className="flex flex-col items-center sm:items-start justify-start p-2">
            <p className="uppercase text-xs text-gray-500 font-semibold text-opacity-70 mb-1">
              IP Adress
            </p>
            <h1 className="text-lg font-semibold">{address?.ip}</h1>
          </div>
          <div className="flex flex-col items-center sm:items-start justify-start p-2">
            <p className="uppercase text-xs text-gray-500 font-semibold text-opacity-70 mb-1">
              Location
            </p>
            <h1 className="text-lg font-semibold sm:text-start text-center">
              {address?.location?.city}, <br />
              {address?.location?.region}
            </h1>
          </div>
          <div className="flex flex-col items-center sm:items-start justify-start p-2">
            <p className="uppercase text-xs text-gray-500 font-semibold text-opacity-70 mb-1">
              Timezone
            </p>
            <h1 className="text-lg font-semibold">
              UTC {address?.location?.timezone}
            </h1>
          </div>
          <div className="flex flex-col items-center sm:items-start justify-start p-2">
            <p className="uppercase text-xs text-gray-500 font-semibold text-opacity-70 mb-1">
              ISP
            </p>
            <h1 className="text-lg font-semibold">{address?.isp}</h1>
          </div>
        </div>

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
      </div>
    </>
  );
};

export default App;
