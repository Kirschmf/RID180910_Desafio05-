import { type NextRequest, NextResponse } from "next/server"

interface Livro {
  id: number
  titulo: string
  num_paginas: number
  isbn: string
  editora: string
}

// Mock data storage (in production, use a real database)
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

let nextId = 3

export async function GET() {
  console.log("[v0] API GET /api/livros called")
  try {
    return NextResponse.json(livros)
  } catch (error) {
    console.log("[v0] Error in GET /api/livros:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  console.log("[v0] API POST /api/livros called")
  try {
    const body = await request.json()
    console.log("[v0] Request body:", body)

    // Validate required fields
    if (!body.titulo || !body.num_paginas || !body.isbn || !body.editora) {
      console.log("[v0] Validation failed - missing fields")
      return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 })
    }

    const novoLivro: Livro = {
      id: nextId++,
      titulo: body.titulo,
      num_paginas: Number.parseInt(body.num_paginas),
      isbn: body.isbn,
      editora: body.editora,
    }

    livros.push(novoLivro)
    console.log("[v0] New book created:", novoLivro)

    return NextResponse.json(novoLivro, { status: 201 })
  } catch (error) {
    console.log("[v0] Error in POST /api/livros:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
