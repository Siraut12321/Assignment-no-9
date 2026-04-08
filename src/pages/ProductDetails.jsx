import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto border p-4 rounded shadow">
      <img
        src={product.thumbnail}
        className="w-full h-60 object-cover"
      />

      <h1 className="text-2xl font-bold mt-3">{product.title}</h1>
      <p className="text-gray-600">{product.description}</p>

      <p className="text-lg font-semibold mt-2">
        Price: ${product.price}
      </p>

      <p className="text-sm text-gray-500">
        Category: {product.category}
      </p>
    </div>
  );
}

export default ProductDetails;