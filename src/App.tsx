import "./styles/App.css";
import "./styles/index.css";

import Card from "./components/Card";

import {getStates} from "../public/backend/location";

console.log(await getStates())

const App = () => {

  return (
    <div className="app">
      <Card />
    </div>
  );
};

export default App;
