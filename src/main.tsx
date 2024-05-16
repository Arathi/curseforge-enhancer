import ReactDOM from 'react-dom/client';
import { ConfigProvider, theme } from 'antd';
import { unsafeWindow } from '$';

import App from './App';

const container = document.createElement('div');
container.id = 'cfer';
unsafeWindow.document.body.append(container);

ReactDOM.createRoot(container).render(
  <ConfigProvider theme={{ algorithm: theme.darkAlgorithm}}>
    <App />
  </ConfigProvider>,
);
