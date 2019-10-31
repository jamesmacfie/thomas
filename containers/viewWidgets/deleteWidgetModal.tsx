import React, { useContext, useState } from 'react';
import { StoreContext as ViewsStoreContext } from 'stores/views';
import Button from 'components/button';
import Modal from 'components/modal';
import Alert from 'components/alert';
import logger from 'utils/logger';

interface Props {
  viewId: number;
  widgetId: number;
  onClose: () => void;
}

const DeleteWidgetModal = ({ onClose, viewId, widgetId }: Props) => {
  const viewsStore = useContext(ViewsStoreContext);
  const [error, setError] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const del = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    logger.debug('Archiving widget', { viewId, widgetId });
    try {
      setSubmitting(true);
      await viewsStore.deleteWidget(viewId, widgetId);
      onClose();
    } catch (error) {
      logger.error('Error archiving widget', { error });
      setError(`Error archiving widget: ${error.message}`);
      setSubmitting(false);
    }
  };

  return (
    <Modal title="Delete widget" size="sm" onClose={onClose}>
      {!!error.length && (
        <Alert type="ERROR" className="mb-4">
          {error}
        </Alert>
      )}
      <p className="mb-4">Are you sure you want to delete this widget?</p>
      <Button disabled={submitting} color="danger" onClick={del}>
        Delete
      </Button>
    </Modal>
  );
};

export default DeleteWidgetModal;
