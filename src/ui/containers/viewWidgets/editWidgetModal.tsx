import React, { useState, useContext } from 'react';
import { Formik, Field } from 'formik';
import { observer } from 'mobx-react-lite';
import { object } from 'yup';
import { StoreContext as IntegrationStoreContext } from 'stores/integrations';
import { StoreContext as ViewsStoreContext } from 'stores/views';
import Button from 'components/button';
import Modal from 'components/modal';
import Alert from 'components/alert';
import Label from 'components/label';
import FormikInput from 'components/formikInput';
import { createSchema } from 'utils/yupSchemaFromJson';
import logger from 'utils/logger';

interface SaveProps {
  onClick: () => void;
  submitting: boolean;
}

interface Props {
  widget: IntegrationWidget;
  config: FormConfig[];
  initialValues?: any;
  onClose: () => void;
}

const Save = ({ submitting }: SaveProps) => {
  return (
    <Button color="primary" padding={false} type="submit" disabled={submitting}>
      <span className="px-6 py-2 inline-block">Save</span>
    </Button>
  );
};

const WidgetConfigForm = observer(({ widget, onClose, config }: Props) => {
  const [error, setError] = useState<string>('');
  const integrationstore = useContext(IntegrationStoreContext);
  const viewsStore = useContext(ViewsStoreContext);
  const validationSchema = config.reduce(createSchema, {});
  const validateAgainst = object().shape(validationSchema);

  const configInitialValues: { [key: string]: string | number } = {};
  Object.values(config).forEach(c => {
    if (c.defaultValue) {
      configInitialValues[c.key] = c.defaultValue;
    }
  });

  return (
    <Modal title="Edit widget" size="sm" onClose={onClose}>
      {!!error.length && (
        <Alert type="ERROR" className="mb-4">
          {error}
        </Alert>
      )}
      <Formik
        initialValues={{
          ...configInitialValues,
          ...widget.config
        }}
        validationSchema={validateAgainst}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={async (values, { setSubmitting }) => {
          logger.debug('Submitting <IntegrationConfigForm />', { values });
          setError('');
          setSubmitting(true);
          try {
            await viewsStore.updateWidget(widget.viewId, {
              widgetId: widget.id,
              config: values
            });
            await integrationstore.fetch();
            onClose();
          } catch (error) {
            logger.error('Error saving integration', { error });
            setSubmitting(false);
            setError(error.message);
          }
        }}
      >
        {({ values, isSubmitting, handleSubmit }) => {
          console.log('VALUES', values);
          return (
            <form onSubmit={handleSubmit} className="pr-4">
              {config.map(c => (
                <FormikInput
                  key={c.key}
                  name={c.key}
                  values={c.values}
                  defaultValue={c.defaultValue}
                  value={values[c.key]}
                  label={c.label}
                  type={c.type}
                />
              ))}
              <Label className="flex">
                <span className="flex-grow">Transparent background</span>
                <Field name="transparentBackground" type="checkbox" />
              </Label>
              <Save submitting={isSubmitting} onClick={() => {}} />
            </form>
          );
        }}
      </Formik>
    </Modal>
  );
});

export default WidgetConfigForm;
