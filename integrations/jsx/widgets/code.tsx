import React, { useState } from 'react';
import { useView, Compiler } from 'react-view';
import RequiresSettingIcon from 'components/requiresSettingsIcon';
import Panel from 'components/panel';
import Button from 'components/button';
import { H1, H2, H3, H4 } from 'components/text';
import Alert from 'components/alert';
import Icon from 'components/icon';
import IconPill from 'components/iconPill';
import IconSearchList from 'components/iconSearchList';
import Input from 'components/input';
import Label from 'components/label';
import Loader from 'components/loader';
import Map from 'components/map';
import Modal from 'components/modal';
import PanelIcon from 'components/panelIcon';
import PanelMainText from 'components/panelMainText';
import Select from 'components/select';

const defaultCode = `import { useState } from 'react'
import Button from 'button';
import { H2 } from 'text';
import Icon from 'icon';

const Cmp = () => {
  const [count, setCount] = useState(0);
  return <div className="text-center">
    <H2 className="text-primary">👋</H2>
    <p className="mb-4">Clicked: {count}</p>
    <Button
      color="primary"
      onClick={() => setCount(count + 1)}>
        Click me
    </Button>
  </div>
};

export default Cmp;`;

const Code = ({ widgetConfig }: IntegrationWidgetProps) => {
  const params = useView({
    initialCode: widgetConfig.code ? widgetConfig.code : defaultCode,
    scope: {
      Button,
      H1,
      H2,
      H3,
      H4,
      useState,
      Alert,
      Icon,
      IconPill,
      IconSearchList,
      Input,
      Label,
      Loader,
      Map,
      Modal,
      PanelIcon,
      PanelMainText,
      Select
    },
    imports: {
      button: {
        default: 'Button'
      },
      alert: {
        default: 'Alert'
      },
      icon: {
        default: 'Icon'
      },
      iconPill: {
        default: 'IconPill'
      },
      iconSearchList: {
        default: 'IconSearchList'
      },
      input: {
        default: 'Input'
      },
      label: {
        default: 'Label'
      },
      loader: {
        default: 'Loader'
      },
      map: {
        default: 'Map'
      },
      modal: {
        default: 'Modal'
      },
      panelIcon: {
        default: 'PanelIcon'
      },
      panelMainText: {
        default: 'PanelMainText'
      },
      select: {
        default: 'Select'
      },
      text: {
        named: ['H1', 'H2', 'H3', 'H4']
      },
      react: {
        named: ['useState']
      }
    }
  });
  return (
    <Panel {...widgetConfig} className="flex flex-col">
      {widgetConfig.code ? <Compiler {...params.compilerProps} /> : <RequiresSettingIcon />}
    </Panel>
  );
};

export default Code;
