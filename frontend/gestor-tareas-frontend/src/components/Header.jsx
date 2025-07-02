import logo from "../assets/logo.png";

export default function Header() {
  return (
    <nav className="sticky top-0 inset-x-0 bg-[#0e0533] text-white shadow-md z-50">
      <div className="max-w-2xl mx-auto px-4 py-2 flex items-center">
        <img
          src={logo}
          alt="Logo"
          className="h-8 w-8 ml-4 mr-3"
        />
        <span className="flex-grow text-center text-xl font-bold">
          Gestor de Tareas
        </span>
      </div>
    </nav>
  );
}
