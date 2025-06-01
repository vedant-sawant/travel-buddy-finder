// import React, { useEffect, useState } from "react";

// const API_KEY = "5ae2e3f221c38a28845f05b61cc8824bf3e4458d19a3a81b39d7aa80";

// const PlaceDetails = ({ xid }) => {
//   const [details, setDetails] = useState(null);

//   useEffect(() => {
//     console.log(xid);
//     if (!xid) return;

//     fetch(
//       `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${API_KEY}`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         setDetails(data);
//         console.log(data);
//       })
//       .catch((error) => console.error("Error fetching place details:", error));
//   }, [xid]);

//   return (
//     <div className="main">
//       <h2>Place Details</h2>
//       {details ? (
//         <div className="poi-container">
//           {details.preview && (
//             <img src={details.preview.source} alt={details.name} />
//           )}
//           <h3>{details.name}</h3>
//           <p>
//             {details.wikipedia_extracts
//               ? details.wikipedia_extracts.text
//               : "No description available."}
//           </p>
//           <a href={details.otm} target="_blank" rel="noopener noreferrer">
//             More Info
//           </a>
//         </div>
//       ) : (
//         <p>Select a place to view details</p>
//       )}
//     </div>
//   );
// };

// export default PlaceDetails;
