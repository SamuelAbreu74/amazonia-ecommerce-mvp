'use client'
import { Product } from "@prisma/client"
import { useCartStore } from "@/store/useCartStore"

interface  AddToCartButtonProps {
    product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {

    const addItem = useCartStore((state) => state.addItem)

    return(
        <button onClick={() => addItem(product)} className="flex justify-center font-bold  py-5 px-5 text-md  bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
            Adicionar ao Carrinho
        </button>
    )
}