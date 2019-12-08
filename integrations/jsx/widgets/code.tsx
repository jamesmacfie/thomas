import React, { useState } from 'react';
import { useView, Compiler } from 'react-view';
import RequiresSettingIcon from 'components/requiresSettingsIcon';
import Panel from 'components/panel';
import Button from 'components/button';
import { H1, H2, H3, H4 } from 'components/text';

const defaultCode = `import { useState } from 'react'
import Button from 'button';
import { H2 } from 'text';
import Icon from 'icon';

const Cmp = () => {
  const [count, setCount] = useState(0);
  return <div className="text-center">
    <H2 className="text-white">👋</H2>
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
  console.log('go', widgetConfig.code);
  const params = useView({
    initialCode: widgetConfig.code ? widgetConfig.code : defaultCode,
    scope: {
      Button,
      H1,
      H2,
      H3,
      H4,
      useState
    },
    imports: {
      button: {
        default: 'Button'
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
