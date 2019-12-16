'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import zipcy from './image/zipcy01.jpg';
import './search.less';

class Search extends React.Component {

  render() {
    return <div class="search-text">
              Search Text add content 12
              <img src={zipcy} />
           </div>;
  }

}

ReactDom.render(
  <Search />,
  document.getElementById('root')
);

