"use client";
import { useInventory } from "@/hooks/useInventory";
import { deleteProductFromBDD } from "@/app/libs/products";
import React from "react";

const InventoryList = () => {
	const {
		inventory,
		addToInventory,
		removeFromInventory,
		setAddMenu,
		setUpdateMenu,
	} = useInventory();

	const handleDelete = async (product) => {
		removeFromInventory(product.id);
		await deleteProductFromBDD(product);
	};

	const handleUpdate = (item) => {
		setUpdateMenu({ open: true, item: item });
		setAddMenu(false);
	};

	const handleAdd = () => {
		setAddMenu(true);
		setUpdateMenu({ open: false, item: null });
	};

	return (
		<table>
			<thead>
				<tr>
					<th>Nom</th>
					<th>Description</th>
					<th>Quantité</th>
					<th>Prix</th>
					<th>Action</th>
				</tr>
			</thead>

			<tbody>
				{inventory.map((item) => {
					return (
						<tr key={item.id}>
							<td>{item.name}</td>
							<td>{item.description}</td>
							<td>{item.quantity}</td>
							<td>{item.price}</td>
							<td>
								<button
									onClick={() => {
										handleUpdate(item);
									}}
								>
									Modifier
								</button>
								<button onClick={() => handleDelete(item)}>Supprimer</button>
							</td>
						</tr>
					);
				})}
				<tr>
					<td>
						<button onClick={() => handleAdd()}>Ajouter</button>
					</td>
				</tr>
			</tbody>
		</table>
	);
};

export default InventoryList;
