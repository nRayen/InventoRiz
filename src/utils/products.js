import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function getProducts(req,res) {
    const products = await prisma.product.findMany();
    return products
}

export async function addProductToBDD(req,res) {
    console.log('add')
}

// export async function deleteProductFromBDD(id) {

// }
export const deleteProductFromBDD = async (item) => {
    console.log('test')
    try {
        const response = await fetch("/api/products", {
            // headers: {
            //     Accept: "application/json",
            //     method: "DELETE"
            // },
            method: "DELETE",
            body: JSON.stringify(item)
        })

        if (response) {
            const data = await response.json()
            console.log(data)
        }
    } catch (error) {
        console.log(error)
    }
}


export async function updateProductInBDD(req,res) {
    console.log('update')
}