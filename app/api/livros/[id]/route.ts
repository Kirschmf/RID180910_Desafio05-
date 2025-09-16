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
  console.log("[v0] API GET /api/livros/[id] called with id:", params.id)
  try {
    const id = Number.parseInt(params.id)
    const livro = livros.find((l) => l.id === id)

    if (!livro) {
      console.log("[v0] Book not found with id:", id)
      return NextResponse.json({ error: "Livro não encontrado" }, { status: 404 })
    }

    console.log("[v0] Book found:", livro)
    return NextResponse.json(livro)
  } catch (error) {
    console.log("[v0] Error in GET /api/livros/[id]:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  console.log("[v0] API PUT /api/livros/[id] called with id:", params.id)
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()
    console.log("[v0] PUT request body:", body)

    const livroIndex = livros.findIndex((l) => l.id === id)

    if (livroIndex === -1) {
      console.log("[v0] Book not found for update with id:", id)
      return NextResponse.json({ error: "Livro não encontrado" }, { status: 404 })
    }

    // Validate required fields
    if (!body.titulo || !body.num_paginas || !body.isbn || !body.editora) {
      console.log("[v0] Validation failed for update - missing fields")
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
    console.log("[v0] Book updated:", livroAtualizado)

    return NextResponse.json(livroAtualizado)
  } catch (error) {
    console.log("[v0] Error in PUT /api/livros/[id]:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  console.log("[v0] API DELETE /api/livros/[id] called with id:", params.id)
  try {
    const id = Number.parseInt(params.id)
    const livroIndex = livros.findIndex((l) => l.id === id)

    if (livroIndex === -1) {
      console.log("[v0] Book not found for deletion with id:", id)
      return NextResponse.json({ error: "Livro não encontrado" }, { status: 404 })
    }

    livros.splice(livroIndex, 1)
    console.log("[v0] Book deleted with id:", id)

    return NextResponse.json({ message: "Livro deletado com sucesso" })
  } catch (error) {
    console.log("[v0] Error in DELETE /api/livros/[id]:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
