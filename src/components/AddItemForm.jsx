"use client";
import { useInventory } from "@/hooks/useInventory";
import { addProductToBDD } from "@/app/libs/prisma";
import React from "react";

const AddItemForm = () => {
	const { addMenu, setAddMenu, inventory, addToInventory } = useInventory();

	if (addMenu === false) {
		return;
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
		<form onSubmit={handleSubmit}>
			
			<div>
				<label htmlFor="name">Nom</label>
				<input type="text" name="name" id="name" required />
			</div>

			<div>
				<label htmlFor="description">Description</label>
				<input type="text" name="description" id="description" />
			</div>

			<div>
				<label htmlFor="quantity" required>Quantité</label>
				<input type="number" name="quantity" id="quantity" />
			</div>

			<div>
				<label htmlFor="price">Prix</label>
				<input type="number" name="price" id="price" />
			</div>

			<button type="submit" className="btn btn-primary">Ajouter</button>
		</form>
	);
};

export default AddItemForm;
