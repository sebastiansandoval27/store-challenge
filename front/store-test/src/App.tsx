import AppRouter from './routers/AppRouter'
import './App.css'
import { StateProvider } from './contexts/stateContext';

function App() {
  return (
    <StateProvider>
      <AppRouter />
    </StateProvider>
  )
}

export default App
