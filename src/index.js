import React from "react";
import ReactDOM from "react-dom";

import style from "./style.css"

import { hot } from 'react-hot-loader/root'
const App = () => <div className={style.lediv}>Hello React!</div>
export default hot(App)

ReactDOM.render(<App/>, document.getElementById("index"));
