import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-blue-500 text-white p-4 flex justify-between">
      <h1 className="font-bold text-lg">Product App</h1>

      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/add">Add Product</Link>
      </div>
    </div>
  );
}

export default Navbar;