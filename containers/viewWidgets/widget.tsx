import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext as IntegrationStoreContext } from 'stores/integrations';
import { StoreContext as UIStoreContext } from 'stores/ui';
import Icon from 'components/icon';
import integrationWidget from './integrationWidgets';
import logger from 'utils/logger';
import { toJS } from 'mobx';
import DeleteWidgetModal from './deleteWidgetModal';
import EditWidgetModal from './editWidgetModal';

interface Props {
  widget: IntegrationWidget;
}

const getWidgetSettings = (systemIntegration: SystemIntegration, widget: IntegrationWidget) => {
  if (!systemIntegration.widgets || !systemIntegration.widgets.length) {
    return null;
  }

  const integrationWidget = systemIntegration.widgets.find(w => w.slug === widget.widgetSlug);
  if (!integrationWidget) {
    return null;
  }

  return integrationWidget.settings && integrationWidget.settings.length ? integrationWidget.settings : null;
};

const Widget = observer(({ widget }: Props) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const integrationStore = useContext(IntegrationStoreContext);
  const uiStore = useContext(UIStoreContext);
  const integration = integrationStore.integrations[widget.integrationId];
  const systemIntegration = integrationStore.systemIntegrations[widget.integrationSlug];
  const widgetSettings = getWidgetSettings(systemIntegration, widget);
  const canEdit = !!widgetSettings;
  const onPencilClick = () => {
    logger.debug('On <Widget /> edit click', { id: widget.id });
    setEditModalVisible(true);
    console.log(toJS(integrationStore.systemIntegrations));
  };

  const onTrashClick = () => {
    logger.debug('On <Widget /> delete click', { id: widget.id });
    setDeleteModalVisible(true);
  };

  // TODO - there's a case where integrationStore.integrations[i.integrationId].config could return undefined
  const Cmp = integrationWidget(widget);

  const editClasses =
    'cursor-pointer p-1 h-6 w-6 absolute text-grey-darker hover:text-blue border border-grey-light bg-grey-lighter rounded-full flex items-center justify-center';

  return (
    <>
      {uiStore.editMode && (
        <>
          {canEdit && (
            <div onClick={onPencilClick} className={`${editClasses} pin-edit`}>
              <Icon icon="pen" containerClassName="flex" className="text-xs current-stroke" />
            </div>
          )}
          <div onClick={onTrashClick} className={`${editClasses} pin-delete`}>
            <Icon icon="trash" containerClassName="flex" className="text-xs current-stroke" />
          </div>
        </>
      )}
      <Cmp
        key={widget.id}
        widgetId={widget.id}
        integrationId={widget.integrationId}
        widgetConfig={widget.config}
        integrationConfig={integration ? integration.config : null}
      />
      {deleteModalVisible && (
        <DeleteWidgetModal onClose={() => setDeleteModalVisible(false)} viewId={widget.viewId} widgetId={widget.id} />
      )}
      {editModalVisible && widgetSettings && (
        <EditWidgetModal widget={widget} config={widgetSettings} onClose={() => setEditModalVisible(false)} />
      )}
    </>
  );
});

export default Widget;
