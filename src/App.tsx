import Header from './components/Header'
import RegenerateWallet from './components/RegenerateWallet'
import Secrets from './components/Secrets'
import Transact from './components/Transact'

function App() {
  return (
    <div>
      <Header />
      <Transact />
      <Secrets />
      <RegenerateWallet />
    </div>
  )
}

export default App
