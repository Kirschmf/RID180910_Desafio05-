interface Livro {
  id?: number
  titulo: string
  num_paginas: number
  isbn: string
  editora: string
}

const getValidBaseUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL

  // If no env var or it doesn't look like a valid URL/path, use default
  if (!envUrl || (!envUrl.startsWith("/") && !envUrl.startsWith("http"))) {
    return "/api"
  }

  return envUrl
}

const BASE_URL = getValidBaseUrl()

console.log("[v0] BASE_URL configured as:", BASE_URL)

export class LivrosService {
  private static async handleResponse(response: Response) {
    console.log("[v0] Response status:", response.status, response.statusText)
    console.log("[v0] Response headers:", Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error")
      console.log("[v0] Error response text:", errorText)
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }

    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      const responseText = await response.text()
      console.log("[v0] Non-JSON response received:", responseText.substring(0, 200))
      throw new Error(`Expected JSON response but got: ${contentType}. Response: ${responseText.substring(0, 100)}...`)
    }

    return response.json()
  }

  private static async makeRequest(url: string, options?: RequestInit) {
    const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url.startsWith("/") ? url : `/${url}`}`
    console.log("[v0] Making request to:", fullUrl)
    console.log("[v0] Request options:", options)

    try {
      const response = await fetch(fullUrl, options)
      return await this.handleResponse(response)
    } catch (error) {
      console.log("[v0] Request failed:", error)
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error(`Não foi possível conectar ao servidor. Verifique se a API está rodando em ${BASE_URL}`)
      }
      throw error
    }
  }

  static async getLivros(): Promise<Livro[]> {
    return this.makeRequest("/livros")
  }

  static async getLivro(id: number): Promise<Livro> {
    return this.makeRequest(`/livros/${id}`)
  }

  static async createLivro(livro: Omit<Livro, "id">): Promise<Livro> {
    return this.makeRequest("/livros", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(livro),
    })
  }

  static async updateLivro(id: number, livro: Omit<Livro, "id">): Promise<Livro> {
    return this.makeRequest(`/livros/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(livro),
    })
  }

  static async deleteLivro(id: number): Promise<void> {
    console.log("[v0] Deleting book with id:", id)
    const fullUrl = `${BASE_URL}/livros/${id}`
    console.log("[v0] Delete URL:", fullUrl)

    const response = await fetch(fullUrl, {
      method: "DELETE",
    })
    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error")
      console.log("[v0] Delete failed:", errorText)
      throw new Error(`Erro ao deletar livro: HTTP ${response.status}: ${errorText}`)
    }
    console.log("[v0] Book deleted successfully")
  }
}
