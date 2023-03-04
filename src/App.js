import Home from './pages/Home'
import logo from './img/logo.png'

function App() {
  return (
    <>
      <div className='w-16 h-16 mt-4 ml-4'>
        <img className='w-full h-auto' src={logo} alt='logo' />
      </div>
      <Home />
    </>
  )
}

export default App
