import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-bold">dnc</div>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/livros" className="hover:text-blue-300 transition-colors font-medium">
                  Listar livros
                </Link>
              </li>
              <li>
                <Link href="/livros/cadastro" className="hover:text-blue-300 transition-colors font-medium">
                  Cadastrar livros
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
