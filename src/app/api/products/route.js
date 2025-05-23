import { NextResponse } from "next/server";
import { prisma } from "@/app/libs/prisma";


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
        return NextResponse.json({
            error : error.message
        }, {status : 500})
    }
    return NextResponse.json({
        product
    }, {status : 200})
}

// API pour ajouter nouveau
export async function POST(request) {
    const product = await request.json()

    try {
        await prisma.product.create({
            data : product
        })
    } catch (error) {
        return NextResponse.json({
            error : error.message
        }, {status : 500})
    }
    return NextResponse.json({
        product
    }, {status : 200})
}


// API pour modifier
export async function PUT(request) {
    const product = await request.json()

    try {
        await prisma.product.update({
            where : {
                id : product.id
            },
            data : {
                name : product.name,
                description : product.description,
                quantity : product.quantity,
                price : product.price
            }
        })

    } catch (error) {
        return NextResponse.json({
            error : error.message
        }, {status : 500})
    }
    return NextResponse.json({
        product
    }, {status : 200})
}