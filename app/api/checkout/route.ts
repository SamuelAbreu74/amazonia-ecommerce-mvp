import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const orderBody = await req.json();

        const { cartItems } = orderBody

        
        // Extrair os IDs
        const productsIds: string[] = cartItems.map((item: {id: string}) => item.id);

        // Consultar os produtos que tem o mesmo id no banco
        const products = await prisma.product.findMany({
            where: {
                id: {
                    in: productsIds,
                },
            },
        });

        // Calcular o valor total da compra (de acordo com a quantidade de itens e o valor de cada um respectivamente)
        const totalValue = products.reduce((acc, product) => {
            const actualQuantity = cartItems.find((item: {id: string}) => item.id === product.id)

            return acc + (actualQuantity.quantity * product.price);
        }, 0);

        // Funçao para inserir no banco
        const cartData = await prisma.order.create({
            data:{ 
                total: totalValue,
                items: {
                    create: cartItems.map((item: {id: string, quantity: number}) => {
                        const dbProduct = products.find(p => p.id === item.id);  

                        return {
                            productId: item.id,
                            quantity: item.quantity,
                            price: dbProduct?.price || 0,
                        }
                    })
                } 

            }

        })







        return NextResponse.json({
            message: 'Pedido criado com sucesso.',
            order: cartData
        }, { status: 200 });


    } catch (error) {
        return NextResponse.json({
            error: 'O JSON enviado esta invalido.'
        }, { status: 400 });
    }
}