import InventoryList from "@/components/InventoryList";
import { InventoryProvider } from "@/hooks/useInventory";
import getProducts from "@/utils/products";


export default async function Home() {

  const inventory = await getProducts();

  return (

    <>
        <InventoryProvider initialInventory={inventory}>
            <h1>InventoRiz</h1>
            <InventoryList/>
        </InventoryProvider>
      </>

  )
}
