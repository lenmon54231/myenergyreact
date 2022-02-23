import "./App.css";
import {
  useRoutes,
} from "react-router-dom";
import routeBasic from './router/index'

function App() {
 
  const routeList = useRoutes(routeBasic)
  return (
<div>
      {routeList}
</div>
  );
}

export default App;
