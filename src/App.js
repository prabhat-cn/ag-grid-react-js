import { Switch, Route, Link } from 'react-router-dom';
import RenderCustomComponent from './agGrid/RenderCustomComponent';
import Table from './agGrid/Table';
import './App.css';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>React AG Grid App</h1>
      <Header />
      <Switch>
        <Route exact path="/" component={Table} />
        <Route
          exact
          path="/rendercustomcomponent"
          component={RenderCustomComponent}
        />
      </Switch>
    </div>
  );
}

export default App;
