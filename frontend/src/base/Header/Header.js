import logo from '../../resources/images/logo.svg';
import './Header.css';

function Header() {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" height={50} />
      <p>Gerenciamento de Colaboradores</p>
    </header>
  )
}

export default Header;