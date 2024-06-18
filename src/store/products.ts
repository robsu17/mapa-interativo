import { create } from 'zustand'

export type Product = {
  tenantId: number
  id: number
  name: string
  description: string
  price: number
  createdAt: string
}

type ProductStore = {
  products: Product[]
  addProducts: (product: Product[]) => void
  addProduct: (product: Product) => void
}

export const useProductsStore = create<ProductStore>((set) => ({
  products: [],
  addProducts: (products) => {
    set(() => ({
      products,
    }))
  },
  addProduct(product) {
    set((state) => ({
      products: [...state.products, product],
    }))
  },
}))
