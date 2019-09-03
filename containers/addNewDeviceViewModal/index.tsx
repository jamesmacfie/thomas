import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { StoreContext as DeviceStoreContext } from 'stores/device';
import { StoreContext as DeviceViewStoreContest } from 'stores/deviceViews';
import Modal from 'components/modal';
import Button from 'components/button';
import IconPill from 'components/iconPill';
import FormikInput from 'components/formikInput';
import { H3 } from 'components/text';
import { createDeviceView } from 'validations/deviceView';

interface CreateNewFormProps {
  onClose: () => void;
}

interface PillProps {
  onSelect: (key: string) => void;
}

interface Props {
  onClose: () => void;
}

const CreateNewForm = observer(({ onClose }: CreateNewFormProps) => {
  const deviceStore = useContext(DeviceStoreContext);
  const deviceViewStore = useContext(DeviceViewStoreContest);
  return (
    <Formik
      initialValues={{}}
      validationSchema={createDeviceView}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        // TODO - this should live inside the device view store
        await fetch(`/device/${deviceStore.getDeviceId()}/view`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            ...values,
            createNewView: true
          })
        })
          .then(res => res.json())
          .then(deviceView => {
            deviceViewStore.addDeviceView(deviceView);
            setSubmitting(false);
            onClose();
          });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <FormikInput name="name" label="Name" />
          <FormikInput name="icon" label="Icon" />
          <Button color="primary" type="submit" disabled={isSubmitting}>
            Save
          </Button>
        </form>
      )}
    </Formik>
  );
});

const Pills = ({ onSelect }: PillProps) => {
  const pills = [
    {
      key: 'existing',
      icon: 'floppy',
      name: 'Existing'
    },
    {
      key: 'new',
      icon: 'armchair',
      name: 'New'
    }
  ];

  return <IconPill onSelect={onSelect} pills={pills} />;
};

const Inner = ({ onClose }: Props) => {
  const [createNew, setCreateNew] = useState<null | boolean>(null);
  // const [viewId, setViewId] = useState<null | number>(null);
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
    return <CreateNewForm onClose={onClose} />;
  }

  // Must be wanting to add an existing view
  return <p>List all the existing views</p>;
};

const AddNewDeviceViewModal = (props: Props) => (
  <Modal title="Add a new view" size="sm" onClose={props.onClose}>
    <Inner {...props} />
  </Modal>
);

export default AddNewDeviceViewModal;
