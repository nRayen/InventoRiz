import AddItemForm from "@/components/addItemForm";
import InventoryList from "@/components/InventoryList";
import UpdateItemForm from "@/components/UpdateItemForm";
import { InventoryProvider } from "@/hooks/useInventory";
import { getProducts } from "@/app/libs/products";

export default async function Home() {
	const inventory = await getProducts();

	return (
		<>
			<InventoryProvider initialInventory={inventory}>
				<h1>InventoRiz</h1>
				<InventoryList />
				<AddItemForm />
				<UpdateItemForm />
			</InventoryProvider>
		</>
	);
}
