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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width={30} height={30}><path fill="rgb(5, 45, 0)" d="M24-16C10.7-16 0-5.3 0 8S10.7 32 24 32l45.3 0c3.9 0 7.2 2.8 7.9 6.6l52.1 286.3c6.2 34.2 36 59.1 70.8 59.1L456 384c13.3 0 24-10.7 24-24s-10.7-24-24-24l-255.9 0c-11.6 0-21.5-8.3-23.6-19.7l-5.1-28.3 303.6 0c30.8 0 57.2-21.9 62.9-52.2L568.9 69.9C572.6 50.2 557.5 32 537.4 32l-412.7 0-.4-2c-4.8-26.6-28-46-55.1-46L24-16zM208 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm224 0a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>
                <span className="flex items-center justify-center bg-zinc-800 text-white text-xs font-bold h-5 min-w-5 px-1.5 rounded-full">
                    {quantityCartItems}
                </span>
            </Link>
        </div>
    )
}