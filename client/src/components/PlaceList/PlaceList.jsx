// import React from "react";

// const PlaceList = ({ places, onSelect }) => {
//   console.log(places);
//   return (
//     <div className="sidebar">
//       <h2>Places Found</h2>
//       <ul className="place-list">
//         {places?.length === 0 ? (
//           <p>No places found. Try another search.</p>
//         ) : (
//           places?.map((place) => (
//             <li
//               key={place.properties.xid}
//               onClick={() => onSelect(place.properties.xid)}
//             >
//               {place.properties.name || "Unnamed Place"}
//             </li>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// };

// export default PlaceList;
