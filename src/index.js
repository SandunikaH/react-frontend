import React from 'react';
import ReactDOM from 'react-dom';

import './css/index.css';
import POS from './POS'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<POS/>, document.getElementById('root'));

serviceWorker.unregister();
