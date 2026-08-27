'use client'
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Cart() {

    const [isMounted, setIsMounted] = useState(false);

    // Busca os itens no carrinho
    const items = useCartStore((state) => state.items)
    const totalItemsQuantity = items.reduce((total, item) => total + item.quantity, 0);
    const removeItem = useCartStore((state) => state.removeItem)
    const addItem = useCartStore((state) => state.addItem)
    const reduceItem = useCartStore((state) => state.reduceQuantity)



    const emptyCart = items.length === 0;

    useEffect(() => {
        setIsMounted(true);
    }, []);


    if (!isMounted) {
        return <p>Carregando carrinho...</p>;
    }

    const totalValue = items.reduce((accumulator, product) => {
        const productValue = product.quantity * product.price;

        return accumulator + productValue;
    }, 0);




    // Requisiçao para Checkout
    const handleCheckout = async () => {

        const response = await fetch("http://localhost:3000/api/checkout", {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({ cartItems: items })
        });
        
        const result = await response.json();
        console.log('Salvo com sucesso: ', result);

    } 


    return (
        <section className="w-full p-20 items-center">
            {/* Carrinho Vazio */}
            {emptyCart ? (
                <div className="border-2 border-emerald-700 bg-emerald-50 rounded-2xl p-10 gap-5 flex flex-col justify-center items-center">
                    <div className="flex flex-col items-center">
                        <h1 className="font-bold text-3xl">Seu carrinho esta vazio!</h1>
                        <p className="text-sm">Aproveite as ofertas e adicione ao carrinho.</p>
                    </div>
                    <Link className="border p-3 rounded-2xl bg-emerald-400 hover:bg-emerald-800 hover:text-white transition" href="/">Ver Ofertas</Link>
                </div>
            ) : (
                // Carrinho com Items
                <div className="flex justify-between gap-5 space-y-4">
                    <div className="flex flex-col w-full gap-5">
                        <div>
                            <Link href="/">
                                <p className="w-fit hover:text-emerald-500"><span className="text-3xl">←</span>Voltar</p>
                            </Link>
                            <h1 className="text-2xl font-bold mb-6">Meu Carrinho</h1>
                        </div>
                        {/* Sessao principal */}
                        {items.map((item) => (
                            <div key={item.id} className="flex gap-4 border border-slate-200 bg-white rounded-2xl p-4 shadow-sm items-center">
                                <img
                                    className="w-24 h-24 object-cover rounded-lg bg-slate-100"
                                    src={item.imageUrl}
                                    alt={item.name}
                                />
                                <div className="flex flex-col flex-1 gap-1">
                                    <h2 className="font-bold text-lg">{item.name}</h2>
                                    <div className="flex gap-5">
                                        <button onClick={() => reduceItem(item.id)}>
                                            <svg className="cursor-pointer hover:stroke-red-600" viewBox="0 0 25 25" width={25} height={25} fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <path opacity="0.5" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="#E01B24"></path>
                                                    <path d="M15 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25Z" fill="#E01B24"></path>
                                                </g>
                                            </svg>
                                        </button>
                                        <p>Quantidade: {item.quantity}</p>
                                        <button onClick={() => addItem(item)}>
                                            <svg className="cursor-pointer hover:stroke-emerald-600" viewBox="0 0 25 25" width={25} height={25} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="#26a269"></path> <path d="M12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z" fill="#26a269"></path> </g></svg>
                                        </button>
                                    </div>
                                    <div className="flex gap-5">
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="w-fit text-red-500 hover:text-red-700 font-semibold text-sm mt-1 cursor-pointer"
                                        >
                                            Remover
                                        </button>
                                    </div>
                                </div>
                                <div className="font-bold text-green-600 text-xl">
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Resumo da compra */}
                    <div className="border rounded flex flex-col gap-5 justify-start w-fit h-fit text-nowrap p-10">
                        <div>
                            <h1 className="font-bold text-2xl">Resumo do pedido</h1>
                            <div className="flex justify-between">
                                <small>Valor dos produtos ({totalItemsQuantity}): </small>
                                <small className="text-green-600">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalValue)}</small>
                            </div>
                        </div>
                        <div className="flex  gap-2">
                            <div className="border rounded-2xl p-2 bg-emerald-500 flex justify-center items-center cursor-pointer">
                                <button onClick={handleCheckout} className="cursor-pointer">Finalizar compra</button>
                            </div>
                            <div className="border rounded p-2 bg-red-100 flex justify-center items-center cursor-pointer">
                                <button className="cursor-pointer">Cancelar</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            )}
        </section>
    );
}