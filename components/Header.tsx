import Image from "next/image";
import CartWidget from "./CartWidget";

export default function Header() {
    return (
        <header className="flex justify-between items-center w-full bg-amber-50 py-3 px-20">
            <div>
                <Image loading="eager" className="border border-amber-950 rounded-2xl" src="/amazonia-ecommerce-logo.jpeg" width={140} height={100} alt="Logo" />
            </div>
            <div>
                {/* Futura Search Bar */}

                {/* Widget Carrinho */}
                <CartWidget />

            </div>
        </header>
    )
}