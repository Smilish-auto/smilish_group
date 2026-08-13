import { useState } from "react";
import { Plus, Edit2, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  category: string;
  stock: number;
  status: string;
  featured: boolean;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Classic Agbada Set",
    slug: "classic-agbada-set",
    price: 85000,
    category: "African Wear",
    stock: 12,
    status: "published",
    featured: true,
  },
  {
    id: 2,
    name: "Senator Kaftan",
    slug: "senator-kaftan",
    price: 65000,
    category: "Traditional",
    stock: 8,
    status: "published",
    featured: false,
  },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    price: 0,
    category: "",
    stock: 0,
    status: "draft",
    featured: false,
  });

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      setProducts(
        products.map((p) =>
          p.id === editingId
            ? { ...p, ...formData }
            : p
        )
      );
      toast.success("Product updated");
    } else {
      setProducts([
        ...products,
        {
          id: Math.max(...products.map((p) => p.id), 0) + 1,
          ...formData,
        } as Product,
      ]);
      toast.success("Product created");
    }

    setFormData({
      name: "",
      slug: "",
      price: 0,
      category: "",
      stock: 0,
      status: "draft",
      featured: false,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      slug: product.slug,
      price: product.price,
      category: product.category,
      stock: product.stock,
      status: product.status,
      featured: product.featured,
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure?")) {
      setProducts(products.filter((p) => p.id !== id));
      toast.success("Product deleted");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus size={16} className="mr-2" />
          {showForm ? "Cancel" : "Add Product"}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit Product" : "New Product"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  placeholder="Slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                />
                <Input
                  type="number"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  required
                />
                <Input
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
                <Input
                  type="number"
                  placeholder="Stock"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                />
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="border rounded-md px-3 py-2"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                Featured
              </label>
              <Button type="submit" className="w-full">
                {editingId ? "Update" : "Create"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4">
        {filtered.map((product) => (
          <Card key={product.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.slug}</p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span>₦{product.price.toLocaleString()}</span>
                    <span className="text-gray-500">Stock: {product.stock}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      product.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {product.status}
                    </span>
                    {product.featured && (
                      <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-700">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(product)}
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center text-gray-500">
            No products found
          </CardContent>
        </Card>
      )}
    </div>
  );
}
