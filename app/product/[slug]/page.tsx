import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

interface PageProps {
    params: Promise<{slug: string}>
}

export default async function ProductDetailsPage({ params, }: PageProps) {
    const { slug } = await params

    const produto = await prisma.product.findUnique({
        where: { slug }
    });

    if(!produto){
        notFound();
    }

    return (
        <main className="flex justify-center items-center max-w-4xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Imagem */}
                <div>
                    <img src={produto.imageUrl} alt={produto.name} className="w-full rounded-lg" />
                </div>
                {/* Infos do produto */}
                <div className="flex flex-col gap-4">
                    <h1 className="text-4xl font-bold">{produto.name}</h1>
                    <p className="text-3xl font-semibold text-green-600">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.price)}</p>
                    <p className="text-gray-600">{produto.description}</p>

                    <AddToCartButton product={produto}/>
                </div>
            </div>
        </main>
    );
}