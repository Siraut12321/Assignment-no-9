import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const BASE_URL = "https://dummyjson.com/products";

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL);

      let apiProducts = res.data.products;

      const localData = JSON.parse(localStorage.getItem("products")) || [];

      const merged = apiProducts.map((p) => {
        const local = localData.find((lp) => lp.id === p.id);
        return local ? local : p;
      });

      setProducts(merged);
    } catch (err) {
      setError("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const deleteProduct = async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    setProducts(products.filter((p) => p.id !== id));
  };

  // ADD
  const addProduct = async (product) => {
    const res = await axios.post(`${BASE_URL}/add`, product);
    setProducts([...products, res.data]);
  };

  // UPDATE
  const updateProduct = async (id, updated) => {
    const res = await axios.put(`${BASE_URL}/${id}`, updated);
    setProducts(products.map(p => p.id === id ? res.data : p));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        search,
        setSearch,
        deleteProduct,
        addProduct,
        updateProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);