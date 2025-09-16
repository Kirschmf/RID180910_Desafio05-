import Header from "@/components/header"

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Biblioteca Central Online - Livros</h1>
            <p className="text-lg text-gray-600 mb-8">Sistema de gerenciamento de biblioteca online</p>
          </div>
        </div>
      </main>
    </>
  )
}
