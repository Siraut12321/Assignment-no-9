import { Link } from "react-router-dom";
import { useProduct } from "../context/ProductContext";

function ProductCard({ product }) {
  const { deleteProduct } = useProduct();

  return (
    <div className="border p-3 rounded shadow">
      <img src={product.thumbnail} className="h-40 w-full object-cover" />

      <h2 className="font-bold mt-2">{product.title}</h2>
      <p>${product.price}</p>

      <div className="flex gap-2 mt-2">
        <Link to={`/product/${product.id}`} className="text-blue-500">
          View
        </Link>

        <Link to={`/edit/${product.id}`} className="text-green-500">
          Edit
        </Link>

        <button
          onClick={() => {
            if (confirm("Delete this product?")) {
              deleteProduct(product.id);
            }
          }}
          className="text-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;