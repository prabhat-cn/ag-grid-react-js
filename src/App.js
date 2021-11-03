import { Switch, Route, Link } from 'react-router-dom';
import PopulateApiData from './agGrid/PopulateApiData';
import RenderCustomComponent from './agGrid/RenderCustomComponent';
import RowSelectionBasedCondition from './agGrid/RowSelectionBasedCondition';
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
        <Route exact path="/populateapi" component={PopulateApiData} />
        <Route
          exact
          path="/selectionbasedcondition"
          component={RowSelectionBasedCondition}
        />
        <Route exact path="*">
          404 Page not found!
        </Route>
      </Switch>
    </div>
  );
}

export default App;
