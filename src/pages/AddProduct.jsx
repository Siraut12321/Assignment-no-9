import { useState } from "react";
import { useProduct } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const { addProduct } = useProduct();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    thumbnail: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(form);
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-3"
    >
      <input
        name="title"
        placeholder="Title"
        className="border p-2 w-full"
        onChange={handleChange}
      />

      <input
        name="price"
        placeholder="Price"
        className="border p-2 w-full"
        onChange={handleChange}
      />

      <input
        name="thumbnail"
        placeholder="Image URL"
        className="border p-2 w-full"
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        className="border p-2 w-full"
        onChange={handleChange}
      />

      <button className="bg-blue-500 text-white p-2 w-full">
        Add Product
      </button>
    </form>
  );
}

export default AddProduct;