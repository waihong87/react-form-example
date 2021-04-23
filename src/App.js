import {Switch, Route} from 'react-router-dom'
import Form from './components/Form'

function App() {
  return (
      <Switch>
        <Route exact path="/" component={Form} />
      </Switch>
  );
}

export default App;
