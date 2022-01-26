
import React from 'react';
import ReactDOM from "react-dom";

const Home = () => {
  return (
    <div className="home">home page</div>
  )
}

ReactDOM.render(
  <Home />,
  document.querySelector('#app'),
)