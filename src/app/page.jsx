import AddItemForm from "@/components/AddItemForm";
import InventoryList from "@/components/InventoryList";
import UpdateItemForm from "@/components/UpdateItemForm";
import { InventoryProvider } from "@/hooks/useInventory";
import { getProducts } from "@/app/libs/prisma";

export default async function Home() {
	const inventory = await getProducts();

	return (
		<>
			<InventoryProvider initialInventory={inventory}>
				<h1 className="text-5xl font-bold text-center">Invento<span className="text-sky-500">Riz</span></h1>
				<InventoryList />
				<AddItemForm />
				<UpdateItemForm />
			</InventoryProvider>
		</>
	);
}
