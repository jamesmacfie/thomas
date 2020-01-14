// TODO - will need something slightly different here if there are not already views created
import React, { useState } from 'react';
import Modal from 'components/modal';
import { H3 } from 'components/text';
import Pills from './pills';
import Form from './form';
import FromExisting from './fromExisting';

interface Props {
  onClose: () => void;
}

const Inner = ({ onClose }: Props) => {
  const [createNew, setCreateNew] = useState<null | boolean>(null);
  const onPillSelect = (key: string) => {
    setCreateNew(key === 'new');
  };

  if (createNew === null) {
    return (
      <>
        <H3>Would you like to add a link to an existing view, or create a new one?</H3>
        <Pills onSelect={onPillSelect} />
      </>
    );
  }

  if (createNew) {
    return <Form onClose={onClose} />;
  }

  // Must be wanting to add an existing view
  return <FromExisting onClose={onClose} />;
};

const AddNewDeviceViewModal = (props: Props) => (
  <Modal title="Add a new view" size="sm" onClose={props.onClose}>
    <Inner {...props} />
  </Modal>
);

export default AddNewDeviceViewModal;
