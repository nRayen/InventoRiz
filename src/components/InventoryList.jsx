"use client";
import { useInventory } from "@/hooks/useInventory";
import { deleteProductFromBDD } from "@/app/libs/prisma";
import React, { useState } from "react";
import DeleteSVG from "./svg/DeleteSVG";
import EditSVG from "./svg/EditSVG";

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
		console.log('max' + filterMax + '   ' + document.getElementById('maxFilter').value)
	}

	return (
		<>
		<div className="filter text-black">
			<input type="text" name="search" id="search" onChange={() => handleSearch()}/>
			<input type="number" min={0} name="minFilter" id="minFilter" onChange={() => handleMin()}/>
			<input type="number" min={0} name="maxFilter" id="maxFilter" onChange={() => handleMax()}/>
		</div>

		<table className="table-auto border-collapse w-full">
			<thead>
				<tr className="bg-indigo-300 text-center h-16">
					<th className="font-bold text-2xl">Nom</th>
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
						<tr key={item.id} className="bg-slate-200 even:bg-slate-300 h-16 text-black text-lg" >
							<td className="border-t text-center h-full">{item.name}</td>
							<td className="border-t text-center">{item.description}</td>
							<td className="border-t text-center">{item.quantity}</td>
							<td className="border-t text-center">{item.price + "€"}</td>
							<td className="border-t text-center h-full">
								<button className="h-full w-12 bg-emerald-500 hover:bg-emerald-600 m-1" onClick={() => {handleUpdate(item)}}><EditSVG/></button>
								<button className="h-full w-12 bg-red-500 hover:bg-red-600 m-1" onClick={() => handleDelete(item)}><DeleteSVG/></button>
							</td>
						</tr>
					);
				})}
				<tr>
					<td colSpan={5} className="h-16">
						<button onClick={() => handleAdd()} className=" h-full w-full text-white font-bold text-lg bg-blue-500 hover:bg-blue-600 mt-4 rounded-2xl" >Ajouter</button>
					</td>
				</tr>
			</tbody>
		</table>
		</>
	);
};

export default InventoryList;
