import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function getProducts() {
    const products = await prisma.product.findMany();
    return products
}

export async function addProductToBDD(product) {
    console.log('add')
    try {
        const response = await fetch("/api/products", {
            method: "POST",
            body: JSON.stringify(product)
        })

        if (response) {
            const data = await response.json()
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteProductFromBDD = async (product) => {
    try {
        const response = await fetch("/api/products", {
            method: "DELETE",
            body: JSON.stringify(product)
        })

        if (response) {
            const data = await response.json()
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updateProductInBDD(product) {
    try {
        const response = await fetch("/api/products", {
            method: "PUT",
            body: JSON.stringify(product)
        })

        if (response) {
            const data = await response.json()
        }
    } catch (error) {
        console.log(error)
    }
}