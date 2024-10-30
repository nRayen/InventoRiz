"use client";
import { useInventory } from "@/hooks/useInventory";
import { updateProductInBDD } from "@/app/libs/prisma";
import React from "react";

const UpdateItemForm = () => {
	const { updateMenu, setUpdateMenu, inventory, updateInInventory } =
		useInventory();

	if (updateMenu.open === false) {
		return;
	}

	const handleReset = () => {
		setUpdateMenu({open: false, item: null})
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const id = updateMenu.item.id;

		const updatedItem = {
			id,
			name: document.getElementById("name").value.trim(),
			description: document.getElementById("description").value.trim() || null,
			quantity: parseInt(
				document.getElementById("quantity").value.toString().trim()
			),
			price:
				parseFloat(document.getElementById("price").value.toString().trim()) ||
				0,
		};

		if (updatedItem.name && updatedItem.quantity) {
			updateInInventory(updatedItem);
			setUpdateMenu({ open: false, item: null });

			// Update w/ Prisma
			updateProductInBDD(updatedItem);
		}
	};

	return (
		<form onSubmit={handleSubmit} onReset={handleReset} className="w-1/2 mx-auto">
			<label className="block text-md font-medium mb-2" htmlFor="name">Nom</label>
			<input
				className="mb-4 py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
				type="text"
				name="name"
				id="name"
				defaultValue={updateMenu.item.name}
				required
			/>

			<label className="block text-md font-medium mb-2" htmlFor="description">Description</label>
			<input
				className="mb-4 py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
				type="text"
				name="description"
				id="description"
				defaultValue={updateMenu.item.description}
			/>

			<label className="block text-md font-medium mb-2" htmlFor="quantity" required>
				Quantité
			</label>
			<input
				min={0}
				className="mb-4 py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
				type="number"
				name="quantity"
				id="quantity"
				defaultValue={updateMenu.item.quantity}
			/>

			<label className="block text-md font-medium mb-2" htmlFor="price">Prix</label>
			<input
				min={0}
				step={any}
				className="mb-4 py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
				type="number"
				name="price"
				id="price"
				defaultValue={updateMenu.item.price}
			/>

			<button type="submit" className="w-32 mr-4 p-2 text-white font-bold text-lg bg-sky-500 hover:bg-sky-600  rounded-2xl">Confirmer</button>
			<button type="reset" className="w-32 p-2 text-white font-bold text-lg bg-sky-500 hover:bg-sky-600  rounded-2xl">Annuler</button>
		</form>
	);
};

export default UpdateItemForm;
