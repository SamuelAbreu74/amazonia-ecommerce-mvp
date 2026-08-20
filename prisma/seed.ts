import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.product.deleteMany();

    await prisma.product.createMany({
        data: [
            {
                name: "Camiseta Tech Dry Fit",
                slug: "camiseta-tech-dry-fit",
                description: "Camiseta leve e respirável ideal para uso diário e treinos.",
                price: 89.90,
                imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=500",
            },
            {
                name: "Tênis Running Ultra",
                slug: "tenis-running-ultra",
                description: "Tênis com amortecimento de alta performance para corridas.",
                price: 299.90,
                imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
            },
            {
                name: "Mochila Impermeável Urban",
                slug: "mochila-impermeavel-urban",
                description: "Mochila espaçosa com compartimento para notebook de até 15 polegadas.",
                price: 159.90,
                imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
            },
        ],
    });

    console.log("Seed executado com sucesso!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });