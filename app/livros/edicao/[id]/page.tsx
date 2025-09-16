"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Header from "@/components/header"
import { LivrosService } from "@/lib/livros-service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Livro {
  id: number
  titulo: string
  num_paginas: number
  isbn: string
  editora: string
}

export default function EdicaoLivros() {
  const router = useRouter()
  const params = useParams()
  const livroId = params.id as string

  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [formData, setFormData] = useState({
    titulo: "",
    num_paginas: "",
    isbn: "",
    editora: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const getLivro = async () => {
    try {
      const livro = await LivrosService.getLivro(Number.parseInt(livroId))
      setFormData({
        titulo: livro.titulo,
        num_paginas: livro.num_paginas.toString(),
        isbn: livro.isbn,
        editora: livro.editora,
      })
    } catch (error) {
      alert("Erro ao carregar dados do livro")
      console.error("Erro ao carregar livro:", error)
      router.push("/livros")
    } finally {
      setLoadingData(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const livroData = {
        ...formData,
        num_paginas: Number.parseInt(formData.num_paginas),
      }

      await LivrosService.updateLivro(Number.parseInt(livroId), livroData)
      alert("Livro atualizado com sucesso!")
      router.push("/livros")
    } catch (error) {
      alert("Erro ao atualizar livro")
      console.error("Erro ao atualizar livro:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (livroId) {
      getLivro()
    }
  }, [livroId])

  if (loadingData) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <p className="text-gray-600">Carregando dados do livro...</p>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Edição de Livros</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="id">Id</Label>
                    <Input id="id" type="text" value={livroId} disabled className="bg-gray-100" />
                  </div>

                  <div>
                    <Label htmlFor="titulo">Título</Label>
                    <Input
                      id="titulo"
                      name="titulo"
                      type="text"
                      value={formData.titulo}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="num_paginas">Número de Páginas</Label>
                    <Input
                      id="num_paginas"
                      name="num_paginas"
                      type="number"
                      value={formData.num_paginas}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="isbn">ISBN</Label>
                    <Input
                      id="isbn"
                      name="isbn"
                      type="text"
                      value={formData.isbn}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="editora">Editora</Label>
                    <Input
                      id="editora"
                      name="editora"
                      type="text"
                      value={formData.editora}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                    {loading ? "Atualizando..." : "ATUALIZAR LIVRO"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}
