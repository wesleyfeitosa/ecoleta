import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { FiArrowLeft } from 'react-icons/fi';

import logo from '../../assets/logo.svg';
import api from '../../services/api';

import './styles.css';

interface Point {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const Points: React.FC = () => {
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    api.get<Point[]>('points').then((response) => {
      setPoints(response.data);
    });
  }, []);

  return (
    <div id="page-points">
      <header>
        <img src={logo} alt="Ecoleta" />

        <Link to="/">
          <FiArrowLeft />
          Voltar para Home
        </Link>
      </header>
      <form action="">
        <fieldset>
          <legend>
            <h2>Pontos de Coleta</h2>
          </legend>

          {points.length > 0 && (
            <Map center={initialPosition} zoom={15}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {points.map((point) => (
                <div key={point.id}>
                  <Marker position={[point.latitude, point.longitude]}>
                    <Popup>{point.name}</Popup>
                  </Marker>
                </div>
              ))}
            </Map>
          )}
        </fieldset>
      </form>
    </div>
  );
};

export default Points;
