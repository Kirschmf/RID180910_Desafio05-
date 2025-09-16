"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import { LivrosService } from "@/lib/livros-service"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Pencil, Trash2 } from "lucide-react"

interface Livro {
  id: number
  titulo: string
  num_paginas: number
  isbn: string
  editora: string
}

export default function Livros() {
  const [livros, setLivros] = useState<Livro[]>([])
  const [loading, setLoading] = useState(true)

  async function getLivros() {
    try {
      const data = await LivrosService.getLivros()
      setLivros(data)
    } catch (error) {
      console.error("Erro ao carregar livros:", error)
    } finally {
      setLoading(false)
    }
  }

  async function deleteLivro(livroId: number) {
    const valida = confirm(`Você realmente deseja remover o livro de ID: ${livroId}?`)
    if (valida) {
      try {
        await LivrosService.deleteLivro(livroId)
        alert("Livro removido com sucesso!")
        getLivros()
      } catch (error) {
        alert("Erro ao remover livro")
        console.error("Erro ao deletar livro:", error)
      }
    }
  }

  useEffect(() => {
    getLivros()
  }, [])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link href="/livros/cadastro">
              <Button className="bg-blue-600 hover:bg-blue-700">Cadastrar Livro</Button>
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">Escolha o seu livro</h1>

          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Carregando livros...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {livros.map((livro) => (
                <Card key={livro.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{livro.titulo}</h3>
                    <p className="text-gray-600 mb-4">{livro.editora}</p>
                    <div className="flex justify-end space-x-2">
                      <Link href={`/livros/edicao/${livro.id}`}>
                        <Button variant="outline" size="sm">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteLivro(livro.id)}
                        className="text-red-600 hover:text-red-700 hover:border-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && livros.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Nenhum livro cadastrado ainda.</p>
              <Link href="/livros/cadastro">
                <Button>Cadastrar primeiro livro</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
