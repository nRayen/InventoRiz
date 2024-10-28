"use client";
import { useInventory } from "@/hooks/useInventory";
import { deleteProductFromBDD } from "@/app/libs/prisma";
import React, { useState } from "react";

const InventoryList = () => {
	const {
		inventory,
		removeFromInventory,
		setAddMenu,
		setUpdateMenu,
	} = useInventory();

	const handleDelete = async (product) => {
		removeFromInventory(product.id);
		await deleteProductFromBDD(product);
	};

	const handleUpdate = (item) => {
		setUpdateMenu({ open: true, item: item }); // Ouvre edit menu
		setAddMenu(false); // Ferme ajout menu
	};

	const handleAdd = () => {
		setAddMenu(true); // Ouvre ajout menu
		setUpdateMenu({ open: false, item: null }); // Ferme edit menu
	};

	// Manage filters
	let [filterMin, setFilterMin] = useState(0)
	let [filterMax, setFilterMax] = useState(0)
	let [searchTerm, setSearchTerm] = useState("")

	const handleSearch = () => {
		setSearchTerm(document.getElementById('search').value)
	}
	const handleMin = () => {
		setFilterMin(document.getElementById('minFilter').value)
	}
	const handleMax = () => {
		setFilterMax(document.getElementById('maxFilter').value)
	}

	return (
		<>
		<div className="filter text-black">
			<input type="text" name="search" id="search" onChange={() => handleSearch()}/>
			<input type="number" name="minFilter" id="minFilter" onChange={() => handleMin()}/>
			<input type="number" name="maxFilter" id="maxFilter" onChange={() => handleMax()}/>
		</div>
		<table className="table-auto border-collapse w-full">
			<thead>
				<tr className="bg-gray-200 text-center ">
					<th className="font-bold text-2xl ">Nom</th>
					<th className="font-bold text-2xl">Description</th>
					<th className="font-bold text-2xl">Quantité</th>
					<th className="font-bold text-2xl">Prix</th>
					<th className="font-bold text-2xl">Action</th>
				</tr>
			</thead>

			<tbody>
				{inventory.map((item) => {
					// Vérifier minimum
					if (filterMin !== 0) {
						if (item.quantity < filterMin) {
							return
						}
					}

					// Vérifier maximum
					if (filterMax !== 0) {
						if (item.quantity > filterMax) {
							return
						}
					}

					// Vérifier recherche
					if (!item.name.startsWith(searchTerm)) {
						return
					}

					return (
						<tr key={item.id} className="bg-gray-600 even:bg-slate-800">
							<td className="border-t">{item.name}</td>
							<td className="border-t">{item.description}</td>
							<td className="border-t">{item.quantity}</td>
							<td className="border-t">{item.price}</td>
							<td className="border-t">
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
					<td colSpan={5}>
						<button onClick={() => handleAdd()} className="w-full text-red-500 py-4 border-white hover:bg-slate-100" >Ajouter</button>
					</td>
				</tr>
			</tbody>
		</table>
		</>
	);
};

export default InventoryList;
