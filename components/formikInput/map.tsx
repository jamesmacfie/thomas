import React from 'react';
import { LeafletMouseEvent } from 'leaflet';
import Map from 'components/map';

// Te Papa, Wellington
export const defaultValue = [-41.2903355647969, 174.78192731738093];

interface Props {
  form: any;
  name: string;
  value: [number, number];
}

const FormikInputMap = ({ form, name, value, ...props }: Props) => {
  console.log('value', value);
  let valueToUse;
  if (!value || !value[0] || !value[1]) {
    valueToUse = defaultValue;
  } else {
    valueToUse = value;
  }
  const onClick = (e: LeafletMouseEvent) => {
    form.setFieldValue(name, [e.latlng.lat, e.latlng.lng, e.latlng.alt]);
  };
  return <Map onClick={onClick} lat={valueToUse[0]} lng={valueToUse[1]} className="mb-4" {...props} />;
};

export default FormikInputMap;
