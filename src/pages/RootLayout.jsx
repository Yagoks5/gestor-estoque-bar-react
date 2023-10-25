import { Link, Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <header>
        <Link to="/" className="Logo">
          REACT STOCK
        </Link>
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/items">Items</Link>
        </nav>
      </header>
      <div>
        <Outlet />
      </div>
      <footer>Feito com REACT e React Router</footer>
    </>
  );
}