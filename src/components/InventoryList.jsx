"use client";
import { useInventory } from "@/hooks/useInventory";
import { deleteProductFromBDD } from "@/app/libs/prisma";
import React, { useState } from "react";

const InventoryList = () => {
	const {
		inventory,
		removeFromInventory,
		setAddMenu,
		addMenu,
		setUpdateMenu,
		updateMenu
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
		console.log('max' + filterMax + '   ' + document.getElementById('maxFilter').value)
	}

	if (addMenu || updateMenu.open) {
		return
	}

	return (
		<>
		<div className="text-lg w-2/3 mx-auto">

			<label className="block text-sm font-medium mb-2" htmlFor="search">Recherche</label>
			<input className="mb-4 py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"  type="text" name="search" id="search" onChange={() => handleSearch()}/>

			<div className="flex gap-4">
				<div className="  items-center w-1/2">
					<label className="block text-sm font-medium mb-2 text-nowrap" htmlFor="minFilter">Stock min.</label>
					<input className="mb-4 py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="number" min={0} name="minFilter" id="minFilter" onChange={() => handleMin()}/>
				</div>
				<div className=" items-center w-1/2">
					<label className="block text-sm font-medium mb-2 text-nowrap" htmlFor="maxFilter">Stock max.</label>
					<input className="mb-4 py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="number" min={0} name="maxFilter" id="maxFilter" onChange={() => handleMax()}/>
				</div>

			</div>
			<button onClick={() => handleAdd()} className="p-2 px-8 w-32 text-white font-bold text-lg bg-sky-500 hover:bg-sky-600  rounded-2xl" >Ajouter</button>
		</div>


		<table className="border-b-slate-400 w-2/3 mx-auto">
			<thead>
				<tr className="text-lg text-left text-slate-800">
					<th className="p-4">Nom</th>
					<th className="p-4">Description</th>
					<th className="p-4">Quantité</th>
					<th className="p-4">Prix</th>
					<th className="p-4"></th>
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
					if (filterMax != 0) {
						if (item.quantity > filterMax) {
							return
						}
					}

					// Vérifier recherche
					if (!item.name.startsWith(searchTerm)) {
						return
					}

					return (
						<tr key={item.id} className="text-lg border-t text-slate-500" >
							<td className="p-4 font-medium text-slate-800">{item.name}</td>
							<td className="p-4">{item.description}</td>
							<td className="p-4">{item.quantity}</td>
							<td className="p-4">{item.price + "€"}</td>
							<td className="font-semibold p-4 text-sky-500  space-x-4 text-right">
								<button className="hover:text-sky-600" onClick={() => {handleUpdate(item)}}>Modifier</button>
								<button className="hover:text-sky-600" onClick={() => handleDelete(item)}>Supprimer</button>
							</td>
						</tr>
					);
				})}
			</tbody>
			</table>
		</>
	);
};

export default InventoryList;
