import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { Col, Row } from 'react-bootstrap';
import DatenHour from './DatenHour';
const API_URL = "https://storm-troopers-api-v1-production.up.railway.app/api/v1/sphere/records"
const earthData = [
  {
    type: 'scatter3d',
    mode: 'markers',
    x: [],
    y: [],
    z: [],
    marker: {
      size: 2,
      opacity: 0.8,
      color: '#d35400',
    },
  },
];

const additionalSphereData = [
  {
    type: 'scatter3d',
    mode: 'markers',
    x: [],
    y: [],
    z: [],
    marker: {
      size: 6,
      color: '#c0392b',
    },
  },
];

const ThreeDSphere = () => {
  const [sphereData, setSphereData] = useState({ "x": [], "y": [], "z": [] });
  const numPoints = 40;
  const latitudes = Array.from({ length: numPoints }, (_, i) => (i / (numPoints - 1)) * 180 - 90);
  const longitudes = Array.from({ length: numPoints }, (_, i) => (i / (numPoints - 1)) * 360 - 180);
  const earthradius = 4;
  for (const lat of latitudes) {
    for (const lon of longitudes) {

      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = earthradius * Math.sin(phi) * Math.cos(theta);
      const y = earthradius * Math.sin(phi) * Math.sin(theta);
      const z = earthradius * Math.cos(phi);
      earthData[0].x.push(x);
      earthData[0].y.push(y);
      earthData[0].z.push(z);


    }
  }
  additionalSphereData[0].x = sphereData.x;
  additionalSphereData[0].y = sphereData.y;
  additionalSphereData[0].z = sphereData.z;

  const [sphereSelectedDate, setSphereSelectedDate] = useState(new Date("2023-01-01 00:00:00"));

  const handleDateChange = (date) => {
    setSphereSelectedDate(date);
  };

  const utcTimestamp = new Date(sphereSelectedDate.getTime() - (sphereSelectedDate.getTimezoneOffset() * 60000));


  const timestamps = utcTimestamp.toJSON();
  const cleanedTimestamp = timestamps
    .replace("T", " ")
    .replace("Z", "")
    .replace(/\.\d+$/, "");
  useEffect(() => {
    const queryParams = {
      "timestamps": cleanedTimestamp
    };

    const queryString = new URLSearchParams(queryParams).toString();

    fetch(`${API_URL}?${queryString}`)
      .then((response) => {

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        const sphereRecords = responseData.records;
        for (let i = 0; i < sphereRecords.x; i++) {
          sphereRecords.x[i] /= 16;

        }
        for (let i = 0; i < sphereRecords.y; i++) {
          sphereRecords.y[i] /= 16;

        }
        for (let i = 0; i < sphereRecords.z; i++) {
          sphereRecords.z[i] /= 16;

        }
        setSphereData(sphereRecords);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [sphereSelectedDate])
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Function to update the window width in the state
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  // Add an event listener when the component mounts
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  let sphereW, sphereH;


  if (windowWidth < 768) {
    sphereW = 350;
    sphereH = 350;

  } else {
    sphereW = 800;
    sphereH = 500;
  }


  return (
    <Col lg={8} sm={12} className='align-itself-center'>
      <h2> Three Dimentional View of Magnetic Field Disturbance</h2>
      <DatenHour selectedDate={sphereSelectedDate} handleDateChange={handleDateChange} />
      <Plot className='mt-3'
        data={[...earthData, ...additionalSphereData]}
        layout={{
          scene: {
            aspectmode: 'cube',
          },
          height: sphereH,
          width: sphereW,

          margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0,
          },
        }}
      />

    </Col>
  );
};

export default ThreeDSphere;
