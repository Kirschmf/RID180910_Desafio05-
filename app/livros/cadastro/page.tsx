"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import { LivrosService } from "@/lib/livros-service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CadastroLivros() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const livroData = {
        ...formData,
        num_paginas: Number.parseInt(formData.num_paginas),
      }

      await LivrosService.createLivro(livroData)
      alert("Livro cadastrado com sucesso!")
      router.push("/livros")
    } catch (error) {
      alert("Erro ao cadastrar livro")
      console.error("Erro ao cadastrar livro:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Cadastro de Livros</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    {loading ? "Cadastrando..." : "CADASTRAR LIVRO"}
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
