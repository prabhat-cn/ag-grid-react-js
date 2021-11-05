import { Switch, Route, Link } from 'react-router-dom';
import Main from './agGrid/crud/Main';
import PopulateApiData from './agGrid/PopulateApiData';
import QuickFilter from './agGrid/QuickFilter';
import RenderCustomComponent from './agGrid/RenderCustomComponent';
import RowSelectionBasedCondition from './agGrid/RowSelectionBasedCondition';
import ServerSideOperation from './agGrid/ServerSideOperation';
import ShowHideColumn from './agGrid/ShowHideColumn';
import Table from './agGrid/Table';
import './App.css';
import Header from './includes/Header';

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>React AG Grid App</h1>
      <Header />
      <div className="app-inner">
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
          <Route exact path="/showhidecolumn" component={ShowHideColumn} />
          <Route exact path="/quickfilter" component={QuickFilter} />
          <Route
            exact
            path="/serveroperation"
            component={ServerSideOperation}
          />
          <Route exact path="/crud" component={Main} />
          <Route exact path="*">
            404 Page not found!
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
