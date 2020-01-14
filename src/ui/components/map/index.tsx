import React, { useState } from 'react';
import cn from 'classnames';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

interface Props {
  className?: string;
  onClick?: (e: LeafletMouseEvent) => void;
  lat: number;
  lng: number;
  zoom?: number;
}

const ThomasMap = ({ className, lat, lng, onClick, zoom }: Props) => {
  const [zm, setZm] = useState(zoom || 13);
  const onZoomChange = (e: any) => {
    setZm(e.target._zoom);
  };
  return (
    <div className={cn('w-full h-64', className)}>
      <Map
        center={[lat, lng]}
        zoom={zm}
        style={{ height: '100%', width: '100%' }}
        onClick={onClick}
        onZoom={onZoomChange}
      >
        <Marker position={[lat, lng]} />
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </Map>
    </div>
  );
};

export default ThomasMap;
