'use client'

import { useCartStore } from "@/store/useCartStore"
import Link from "next/link"

export default function CartWidget() {
    
    const quantityCartItems = useCartStore((state) => state.items).length;
    
    return(
        <div className="flex items-center">
            <Link 
                href="/cart"
                className="flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-lg transition-colors shadow-sm"
            >
                <span className="text-lg leading-none">🛒</span>
                <span className="flex items-center justify-center bg-zinc-800 text-white text-xs font-bold h-5 min-w-5 px-1.5 rounded-full">
                    {quantityCartItems}
                </span>
            </Link>
        </div>
    )
}