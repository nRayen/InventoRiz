import { NextResponse } from "next/server";
import { prisma } from "@/utils/products";


// API pour supprimer
export async function DELETE(request) {
    const product = await request.json()

    try {
        await prisma.product.delete({
            where : {
                id : product.id
            },
        })

    } catch (error) {
        console.error(error.message)
    }
    return NextResponse.json({
        product
    })
}

// API pour ajouter nouveau
export async function POST(request) {
    const product = await request.json()

    try {
        const deleteProduct = await prisma.product.delete({
            where : {
                id : product.id
            },
        })

    } catch (error) {
        console.error(error.message)
    }
    return NextResponse.json({
        product
    })
}


// API pour modifier
export async function PATCH(request) {
    const product = await request.json()

    try {
        const deleteProduct = await prisma.product.delete({
            where : {
                id : product.id
            },
        })

    } catch (error) {
        console.error(error.message)
    }
    return NextResponse.json({
        product
    })
}