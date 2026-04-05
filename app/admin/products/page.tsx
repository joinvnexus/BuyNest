"use client";

import { useState, useEffect } from 'react';
import { ProductForm } from '@/components/admin/product-form';
import { ProductFormData } from '@/components/admin/product-form';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { toast } from 'react-hot-toast';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch('/api/admin/products');
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  const handleCreate = async (data: ProductFormData, files: File[]) => {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const res = await fetch('/api/admin/products', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      toast.success('Product created');
      setShowForm(false);
      fetchProducts();
    } else {
      toast.error('Failed to create product');
    }
  };

  const handleEdit = async (data: ProductFormData, files: File[]) => {
    if (!editingProduct) return;

    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('id', editingProduct.id);

    const res = await fetch(`/api/admin/products/${editingProduct.id}`, {
      method: 'PUT',
      body: formData,
    });

    if (res.ok) {
      toast.success('Product updated');
      setEditingProduct(null);
      fetchProducts();
    } else {
      toast.error('Failed to update product');
    }
  };

  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleDeleteConfirm = async (id: string) => {
    setShowDeleteConfirm(id);
  };

  const handleDeleteYes = async (id: string) => {
    const res = await fetch(`/api/admin/products/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      toast.success('Product deleted');
      fetchProducts();
    } else {
      toast.error('Failed to delete product');
    }
    setShowDeleteConfirm(null);
  };

  if (loading) return <div>Loading products...</div>;

  return (
    <>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Products ({products.length})</h1>
          <Dialog open={showForm} onOpenChange={setShowForm}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingProduct(null)}>
                + New Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <ProductForm 
                onSubmit={handleCreate}
                loading={loading}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group bg-card border p-6 rounded-xl hover:shadow-lg transition-all">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-xl line-clamp-1">{product.name}</h3>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setEditingProduct(product)}
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <ProductForm 
                        onSubmit={handleEdit}
                        defaultValues={{
                          name: product.name || '',
                          description: product.description || '',
                          price: product.price.toString(),
                          category: product.category || '',
                          stock: product.stock.toString(),
                        }}
                        loading={loading}
                      />
                    </DialogContent>
                  </Dialog>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteConfirm(product.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center text-sm">
                <span>${product.price}</span>
                <span className="font-medium">Stock: {product.stock}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!showDeleteConfirm} onOpenChange={() => setShowDeleteConfirm(null)}>
        <DialogContent>
          <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
          <p className="text-muted-foreground mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setShowDeleteConfirm(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => handleDeleteYes(showDeleteConfirm!)}>
              Delete Product
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products ({products.length})</h1>
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProduct(null)}>
              + New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <ProductForm 
              onSubmit={handleCreate}
              loading={loading}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group bg-card border p-6 rounded-xl hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-xl line-clamp-1">{product.name}</h3>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditingProduct(product)}
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <ProductForm 
                      onSubmit={handleEdit}
                      defaultValues={{
                        name: product.name || '',
                        description: product.description || '',
                        price: product.price.toString(),
                        category: product.category || '',
                        stock: product.stock.toString(),
                      }}
                      loading={loading}
                    />
                  </DialogContent>
                </Dialog>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDeleteConfirm(product.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
            <p className="text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
            <div className="flex justify-between items-center text-sm">
              <span>${product.price}</span>
              <span className="font-medium">Stock: {product.stock}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

