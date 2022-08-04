import Header from './components/Header'
import RegenerateWallet from './components/RegenerateWallet'
import PrivateKey from './components/PrivateKey'
import Mnemonic from './components/Mnemonic'
import Transact from './components/Transact'

function App() {
  return (
    <div>
      <Header />
      <Transact />
      <PrivateKey />
      <Mnemonic />
      <RegenerateWallet />
    </div>
  )
}

export default App
