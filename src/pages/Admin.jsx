import React, { useEffect, useRef, useState } from "react";
import useGetData from "../custom-hooks/useGetData";
import blueMarkerIcon from "../assets/Icons/blueMarker.png";
import redMarkerIcon from '../assets/Icons/redMarker.png'
import moment from "moment/moment";

const Admin = () => {
  const { data: attendanceData, loading } = useGetData("attendance");

  console.log(attendanceData, "attendanceData");

  const mapContainerRef = useRef(null);

  useEffect(() => {
    const loadGoogleMapsApi = (callback) => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB2QAGVINWbOD0tnhZbc1VdUB1ngf4nxT8&libraries=places`;
      script.onload = callback;
      document.head.appendChild(script);
    };

    loadGoogleMapsApi(() => {
      const mapOptions = {
        center: { lat: 7.8731, lng: 80.7718 }, // Centered in Sri Lanka (for example, Colombo)
        zoom: 8, // Set the initial zoom level
      };

      const googleMap = new window.google.maps.Map(
        mapContainerRef.current,
        mapOptions
      );

      // Add circle overlay around NSBM (assuming NSBM's latitude and longitude)
      const nsbmLocation = { lat: 6.8213, lng: 80.0416 };
    
      new window.google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map: googleMap,
        center: nsbmLocation,
        radius: 300, // Radius in meters (adjust as needed)
      });

      // Add markers for each coordinate in attendanceData
      attendanceData.forEach((data) => {
        const markerPosition = {
          lat: data.location.latitude,
          lng: data.location.longitude,
        };

        console.log(markerPosition, "markerPosition");
        function calculateDistance(lat1, lon1, lat2, lon2) {
          const R = 6371000; // Radius of the Earth in meters
          const dLat = toRadians(lat2 - lat1);
          const dLon = toRadians(lon2 - lon1);
          const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = R * c;
          return distance;
        }
        
        function toRadians(degrees) {
          return degrees * (Math.PI / 180);
        }
        
        const nsbmLocation = { lat: 6.8213, lng: 80.0416 };
        const circleRadius = 300; // Radius in meters
        

        const infoWindowContent = `<div><strong>${data.studentName}</strong><br />Date: ${ moment(data.time * 1000).format('YYYY-MM-DD HH:mm:ss')}</div>`; // Customize the content based on your data structure
        const infoWindow = new window.google.maps.InfoWindow({
          content: infoWindowContent,
        });

        // Inside your forEach loop
        attendanceData.forEach((data) => {
          const markerPosition = { lat: data.location.latitude, lng: data.location.longitude };
        
          // Calculate the distance between the marker position and circle center in meters
          const distance = calculateDistance(markerPosition.lat, markerPosition.lng, nsbmLocation.lat, nsbmLocation.lng);
        
          // Check if the marker position is inside the circle
          if (distance <= circleRadius) {
            new window.google.maps.Marker({
              position: markerPosition,
              map: googleMap,
              icon: blueMarkerIcon,
            });
          } else {
            new window.google.maps.Marker({
              position: markerPosition,
              map: googleMap,
              icon:redMarkerIcon,
            });
          }

          const marker = new window.google.maps.Marker({
            position: markerPosition,
            map: googleMap,
            icon: distance <= circleRadius ? blueMarkerIcon : redMarkerIcon,
          });
        
          // Add event listener to show info window on marker click
          marker.addListener('click', () => {
            infoWindow.open(googleMap, marker);
          });
        });
        
        
        
      });
    });
  }, [attendanceData]);

  return (
    <div ref={mapContainerRef} style={{ height: "400px", width: "100%" }} />
  );
};

export default Admin;
