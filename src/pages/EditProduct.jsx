import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useProduct } from "../context/ProductContext";

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { updateProduct } = useProduct();

    const [form, setForm] = useState({
        id: "",
        title: "",
        price: "",
        description: "",
        thumbnail: "",
    });

    const [success, setSuccess] = useState("");

    useEffect(() => {
        // 🔥 FIRST CHECK LOCAL STORAGE
        const localData = JSON.parse(localStorage.getItem("products")) || [];
        const localProduct = localData.find((p) => p.id == id);

        if (localProduct) {
            setForm(localProduct);
        } else {
            axios
                .get(`https://dummyjson.com/products/${id}`)
                .then((res) => setForm(res.data));
        }
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 🔥 UPDATE CONTEXT (UI UPDATE)
        updateProduct(Number(id), form);

        // 🔥 SAVE TO LOCAL STORAGE
        let localData = JSON.parse(localStorage.getItem("products")) || [];

        const exists = localData.find((p) => p.id == id);

        if (exists) {
            localData = localData.map((p) =>
                p.id == id ? { ...form, id: Number(id) } : p
            );
        } else {
            localData.push({ ...form, id: Number(id) });
        }

        localStorage.setItem("products", JSON.stringify(localData));

        // ✅ SUCCESS MESSAGE
        setSuccess("Product updated successfully!");

        // 🔁 REDIRECT AFTER 1.5s
        setTimeout(() => {
            navigate("/");
        }, 1500);
    };

    return (
        <div className="max-w-md mx-auto">
            {success && (
                <p className="bg-green-200 text-green-800 p-2 mb-3 text-center rounded">
                    {success}
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    placeholder="Title"
                />

                <input
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    placeholder="Price"
                />

                <input
                    name="thumbnail"
                    value={form.thumbnail}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    placeholder="Image URL"
                />

                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    placeholder="Description"
                />

                <button className="bg-green-500 text-white p-2 w-full hover:bg-green-600">
                    Update Product
                </button>
            </form>
        </div>
    );
}

export default EditProduct;