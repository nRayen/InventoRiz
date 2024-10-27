import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function getProducts(req,res) {
    const products = await prisma.product.findMany();
    return products
}

export async function addProductToBDD(req,res) {
    console.log('add')
}

export async function deleteProductFromBDD(id) {
    const deleteProduct = await prisma.product.delete({
        where : {
            id : id
        },
    })
}

export async function updateProductInBDD(req,res) {
    console.log('update')
}