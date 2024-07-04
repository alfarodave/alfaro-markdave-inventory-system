import { useEffect, useState } from "react";
import { getProducts, updateProducts, deleteProducts, addProducts } from "../api/products";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    const response = await getProducts();
    setProducts(response);
  };

  const handleUpdate = async (product) => {
    const response = await updateProducts(product);
    console.log(response);
    setProducts(products.map((p) => (p.product_id === product.product_id ? product : p)));
  };

  const handleDelete = async (productId) => {
    const response = await deleteProducts(productId);
    console.log(response);
    setProducts(products.filter((p) => p.product_id !== productId));
  };

  const handleAddProduct = async (newProduct) => {
    const response = await addProducts(newProduct);
    setProducts([...products, response]);
    setShowAddProduct(false); // Hide the AddProduct component after submission
    await getAllProducts(); // Refetch the products from the database
  };

  const handleShowAddProduct = () => {
    setShowAddProduct(true);
  };

  const handleHideAddProduct = () => {
    setShowAddProduct(false);
  };

  const handleUpdateProduct = (product) => {
    setEditingProduct(product);
  };
  const handleHideUpdateProduct = () => {
    setShowAddProduct(false);
  };
  {
    editingProduct && (
      <UpdateProduct
        product={editingProduct}
        onUpdate={handleUpdate}
        onHide={() => setEditingProduct(null)}
      />
    )
  }
  
  return (
    <>  
    
    <body className="bg-white h-screen">
    
      <div className="container mx-auto p-4 pt-6 md:p-1 lg:p-10">
      <div className="text-4xl bg-blend-lighten text-center text-white font-bold bg-black py-5">My Product Inventory</div>

      <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
        <thead>
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Product Id</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Product Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Quantity</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Unit</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Price</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className=" divide-y divide-black">
          {products.map((element, index) => {
            return (
              <tr key={index}>
                <td>{element.product_id}</td>
                <td>{element.product_name}</td>
                <td>{element.quantity}</td>
                <td>{element.unit}</td>
                <td>{element.price}</td>
                <td>
                  <button
                    className="p-2 rounded bg-black text-white hover:bg-blue-400"
                    onClick={() => {
                      setEditingProduct(element);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="p-2 rounded bg-black text-white hover:bg-blue-400"
                    onClick={() => handleDelete(element.product_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {editingProduct && (
        <UpdateProduct
          product={editingProduct}
          onUpdate={handleUpdate}
          onHide={() => setEditingProduct(null)}
        />
      )}

      <div className="m-5">
        <button className="p-2 rounded bg-black text-white hover:bg-blue-400" onClick={handleShowAddProduct}>
          Add Product
        </button>
      </div>

      {showAddProduct && (
        <AddProduct
          onAddProduct={handleAddProduct}
          onHide={handleHideAddProduct}
        />
      )}
      </div>
      </body>
    </>
  );
};

export default Inventory;