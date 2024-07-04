import { useState } from "react";
import { updateProducts } from "../api/products";

const UpdateProduct = ({ product, onUpdate, onHide }) => {
  const [productId, setProductId] = useState(product.product_id);
  const [productName, setProductName] = useState(product.product_name);
  const [quantity, setQuantity] = useState(product.quantity);
  const [unit, setUnit] = useState(product.unit);
  const [price, setPrice] = useState(product.price);
  const [error, setError] = useState(null);

  const handleUpdate = async () => {
    if (!productName || !quantity || !unit || !price) {
      setError("Some fields are empty");
      return;
    }

    const response = await updateProducts(productId, productName, quantity, unit, price);
    console.log(response);
    onUpdate(response); // Call the onUpdate callback with the updated product
    onHide(); // Hide the update form
  }

  return (
    <>
      <div className="h-[150px] bg-white flex mt-20 justify-center  items-center">
        <form class="w-[390px] mt-20 h-15  bg-white rounded-lg ml-auto shadow-lg" action="">
          <div className="rounded border border-blue-700 p-5 w-[390px] h-[390px]">

            <h1 className="font-bold py-2 text-black text-center">Update Product</h1>
            {/*... */}
            <div className="flex gap-3 m-8">
              <label className="text-gray-700 font-bold text-xs">Product ID: </label>
              <input value={productId} onChange={(e) => setProductId(e.target.value)} className="rounded border border-grey-400 text-black" type="text" disabled />
            </div>

            {/*... */}

            <div className="flex gap-3 m-5">
              <label className="text-gray-700 text-xs font-bold">New Product Name: </label>
              <input value={productName} onChange={(e) => setProductName(e.target.value)} className="rounded border border-grey-400 text-black" type="text" />
            </div>

            <div className="flex gap-3 m-5">
              <label className="text-xs font-bold">New Quantity: </label>
              <input value={quantity} onChange={(e) => setQuantity(e.target.value)} className="rounded border border-grey-400 text-black" type="text" />
            </div>

            <div className="flex gap-3 m-5">
              <label className="text-xs font-bold">New Unit: </label>
              <input value={unit} onChange={(e) => setUnit(e.target.value)} className="rounded border border-grey-400 text-black" type="text" />
            </div>

            <div className="flex gap-3 m-5">
              <label className="text-xsd font-bold text-xs">New Price: </label>
              <input value={price} onChange={(e) => setPrice(e.target.value)} className="rounded border border-grey-400 text-black" type="text" />
            </div>

            {error && <div className="text-red-500">{error}</div>}

            <div className="flex justify-center">
              <button onClick={handleUpdate} className="py-1 px-5 bg-black text-white p-5 ml-auto rounded hover:bg-blue-400 hover:text-white m-2">Update</button>
            </div>
          </div>
        </form>
      </div>

    </>
  )
}

export default UpdateProduct;