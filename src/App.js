import { BrowserRouter, Switch, Route } from 'react-router-dom' 
import { PostsIndex } from './components/PostsIndex'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route data-testid="link-1" exact path="/" component={PostsIndex} />  
      </Switch>
    </BrowserRouter>
  )
}

export default App
