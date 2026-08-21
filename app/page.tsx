import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const produtos = await prisma.product.findMany();

  return (
    <main className="min-h-screen p-6 md:p-12 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold tracking-tight">Produtos em Destaque</h1>

        {/* Grid de produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {produtos.map((item) => (
            <div
              key={item.id}
              className="flex flex-col border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Container de imagem com proporção fixa */}
              <div className="relative w-full aspect-square bg-slate-100">
                <img
                  className="w-full h-full object-cover"
                  src={item.imageUrl}
                  alt={item.name}
                />
              </div>

              <div className="flex flex-col flex-1 p-4 justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-sm text-slate-600 line-clamp-2">{item.description}</p>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <p className="text-2xl font-bold text-slate-900">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                  </p>

                  <div className="flex gap-2">
                    <Link href={`/product/${item.slug}`} className="flex-1 py-2 px-3 text-sm font-medium border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                      Ver Detalhes
                    </Link>
                    <button className="flex-1 py-2 px-3 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}