import { type NextRequest, NextResponse } from "next/server"

interface Livro {
  id: number
  titulo: string
  num_paginas: number
  isbn: string
  editora: string
}

// Mock data storage (same as in route.ts - in production, use a shared database)
const livros: Livro[] = [
  {
    id: 1,
    titulo: "Dom Casmurro",
    num_paginas: 256,
    isbn: "9788525406958",
    editora: "Globo",
  },
  {
    id: 2,
    titulo: "O Cortiço",
    num_paginas: 304,
    isbn: "9788520925188",
    editora: "Saraiva",
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const livro = livros.find((l) => l.id === id)

  if (!livro) {
    return NextResponse.json({ error: "Livro não encontrado" }, { status: 404 })
  }

  return NextResponse.json(livro)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()

    const livroIndex = livros.findIndex((l) => l.id === id)

    if (livroIndex === -1) {
      return NextResponse.json({ error: "Livro não encontrado" }, { status: 404 })
    }

    // Validate required fields
    if (!body.titulo || !body.num_paginas || !body.isbn || !body.editora) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 })
    }

    const livroAtualizado: Livro = {
      id,
      titulo: body.titulo,
      num_paginas: Number.parseInt(body.num_paginas),
      isbn: body.isbn,
      editora: body.editora,
    }

    livros[livroIndex] = livroAtualizado

    return NextResponse.json(livroAtualizado)
  } catch (error) {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const livroIndex = livros.findIndex((l) => l.id === id)

  if (livroIndex === -1) {
    return NextResponse.json({ error: "Livro não encontrado" }, { status: 404 })
  }

  livros.splice(livroIndex, 1)

  return NextResponse.json({ message: "Livro deletado com sucesso" })
}
