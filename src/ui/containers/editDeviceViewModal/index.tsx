import React from 'react';
import Modal from 'components/modal';
import Form from './form';

interface Props {
  onClose: () => void;
  viewId: number;
}

const EditDeviceViewModal = ({ onClose, viewId }: Props) => (
  <Modal title="Edit view" size="sm" onClose={onClose}>
    <Form onClose={onClose} viewId={viewId} />
  </Modal>
);

export default EditDeviceViewModal;
