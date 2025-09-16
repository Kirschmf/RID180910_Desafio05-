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
  return NextResponse.json(livros)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.titulo || !body.num_paginas || !body.isbn || !body.editora) {
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

    return NextResponse.json(novoLivro, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
