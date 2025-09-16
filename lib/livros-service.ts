interface Livro {
  id?: number
  titulo: string
  num_paginas: number
  isbn: string
  editora: string
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

export class LivrosService {
  private static async handleResponse(response: Response) {
    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error")
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }
    return response.json()
  }

  private static async makeRequest(url: string, options?: RequestInit) {
    try {
      const response = await fetch(url, options)
      return await this.handleResponse(response)
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error(`Não foi possível conectar ao servidor. Verifique se a API está rodando em ${BASE_URL}`)
      }
      throw error
    }
  }

  static async getLivros(): Promise<Livro[]> {
    return this.makeRequest(`${BASE_URL}/livros`)
  }

  static async getLivro(id: number): Promise<Livro> {
    return this.makeRequest(`${BASE_URL}/livros/${id}`)
  }

  static async createLivro(livro: Omit<Livro, "id">): Promise<Livro> {
    return this.makeRequest(`${BASE_URL}/livros`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(livro),
    })
  }

  static async updateLivro(id: number, livro: Omit<Livro, "id">): Promise<Livro> {
    return this.makeRequest(`${BASE_URL}/livros/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(livro),
    })
  }

  static async deleteLivro(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/livros/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error")
      throw new Error(`Erro ao deletar livro: HTTP ${response.status}: ${errorText}`)
    }
  }
}
