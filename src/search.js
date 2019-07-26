'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import './search.less';

class Search extends React.Component {

  render() {
    return <div class="search-text">Search Text</div>;
  }

}

ReactDom.render(
  <Search />,
  document.getElementById('root')
);