/* eslint-disable react/prop-types */


const Map = ({address}) => {
  return (
    <>
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
    </>
  )
}

export default Map