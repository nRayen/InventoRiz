"use client";
import { useInventory } from "@/hooks/useInventory";
import { addProductToBDD } from "@/app/libs/prisma";
import React from "react";

const AddItemForm = () => {
	const { addMenu, setAddMenu, inventory, addToInventory } = useInventory();

	if (addMenu === false) {
		return;
	}

	const handleReset = () => {
		setAddMenu(false)
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const id =
			inventory.reduce(
				(max, item) => (item.id > max.id ? item : max),
				inventory[0]
			).id + 1;

		const newItem = {
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

		if (newItem.name && newItem.quantity) {
			addToInventory(newItem);
			addProductToBDD(newItem);
			setAddMenu(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} onReset={handleReset} className="w-1/2 mx-auto">

			<div className="mb-4">
				<label className="block text-md font-medium mb-2" htmlFor="name">Nom</label>
				<input className="py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="text" name="name" id="name" required />
			</div>

			<div className="mb-4">
				<label className="block text-md font-medium mb-2" htmlFor="description">Description</label>
				<input className="py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="text" name="description" id="description" />
			</div>

			<div className="mb-4">
				<label className="block text-md font-medium mb-2" htmlFor="quantity" required>Quantité</label>
				<input className="py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="number" name="quantity" id="quantity" />
			</div>

			<div className="mb-4">
				<label className="block text-md font-medium mb-2" htmlFor="price">Prix</label>
				<input className="py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="number" name="price" id="price" />
			</div>

			<button type="submit" className="w-32 mr-4 p-2 text-white font-bold text-lg bg-sky-500 hover:bg-sky-600  rounded-2xl">Confirmer</button>
			<button type="reset" className="w-32 p-2 text-white font-bold text-lg bg-sky-500 hover:bg-sky-600  rounded-2xl" >Annuler</button>
		</form>
	);
};

export default AddItemForm;
