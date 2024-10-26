import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export default async function getProducts(req,res) {
    const products = await prisma.product.findMany();
    return products
}