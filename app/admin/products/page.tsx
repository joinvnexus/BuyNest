"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Package2, Pencil, Plus, Trash2 } from 'lucide-react';
import { Product } from '@/types';
import { ProductForm, ProductFormData } from '@/components/admin/product-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'react-hot-toast';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/products');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch products');
      }

      setProducts(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: ProductFormData, files: File[]) => {
    try {
      setSubmitting(true);
      const formData = new FormData();
      files.forEach((file) => formData.append('images', file));
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch('/api/admin/products', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to create product');
      }

      toast.success('Product created');
      setShowForm(false);
      await fetchProducts();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create product');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (data: ProductFormData, files: File[]) => {
    if (!editingProduct) return;

    try {
      setSubmitting(true);
      const formData = new FormData();
      files.forEach((file) => formData.append('images', file));
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch(`/api/admin/products/${editingProduct.id}`, {
        method: 'PUT',
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to update product');
      }

      toast.success('Product updated');
      setEditingProduct(null);
      await fetchProducts();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update product');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setSubmitting(true);
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete product');
      }

      toast.success('Product deleted');
      setShowDeleteConfirm(null);
      await fetchProducts();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete product');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-border/60 bg-card/90 p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex items-center rounded-full border border-border/60 bg-background px-4 py-1 text-sm font-medium text-muted-foreground">
              Catalog management
            </span>
            <h1 className="text-4xl font-semibold tracking-tight">Products</h1>
            <p className="text-muted-foreground">
              Create, review, and update the storefront catalog without leaving the project&apos;s existing visual system.
            </p>
          </div>

          <Dialog
            open={showForm}
            onOpenChange={(open) => {
              setShowForm(open);
              if (!open) {
                setEditingProduct(null);
              }
            }}
          >
            <DialogTrigger asChild>
              <Button
                className="h-12 rounded-full bg-custom-accent hover:bg-blue-600"
                onClick={() => setEditingProduct(null)}
              >
                <Plus className="mr-2 h-4 w-4" />
                New product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl rounded-[2rem] border-border/60 p-0">
              <div className="p-6 sm:p-8">
                <ProductForm onSubmit={handleCreate} loading={submitting} />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[1.5rem] border border-border/60 bg-muted/30 p-5">
            <p className="text-sm text-muted-foreground">Total products</p>
            <p className="mt-2 text-3xl font-semibold">{products.length}</p>
          </div>
          <div className="rounded-[1.5rem] border border-border/60 bg-muted/30 p-5">
            <p className="text-sm text-muted-foreground">In stock units</p>
            <p className="mt-2 text-3xl font-semibold">
              {products.reduce((sum, product) => sum + product.stock, 0)}
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-border/60 bg-muted/30 p-5">
            <p className="text-sm text-muted-foreground">Categories</p>
            <p className="mt-2 text-3xl font-semibold">
              {new Set(products.map((product) => product.category).filter(Boolean)).size}
            </p>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="h-72 animate-pulse rounded-[2rem] bg-muted" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-border/80 bg-card/70 px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-custom-accent/10 text-custom-accent">
            <Package2 className="h-7 w-7" />
          </div>
          <h2 className="mt-6 text-3xl font-semibold">No products yet</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Start the catalog by creating the first product. It will immediately use the same storefront presentation you&apos;ve been polishing.
          </p>
          <Button
            className="mt-8 h-12 rounded-full bg-custom-accent hover:bg-blue-600"
            onClick={() => setShowForm(true)}
          >
            Create first product
          </Button>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-[2rem] border border-border/60 bg-card/90 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] bg-muted">
                <Image
                  src={product.images[0] || '/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-5 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {product.category || 'General'}
                    </p>
                    <h2 className="mt-2 text-xl font-semibold">{product.name}</h2>
                  </div>
                  <span className="rounded-full bg-custom-accent/10 px-3 py-1 text-sm font-medium text-custom-accent">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {product.description || 'No description added yet.'}
                </p>

                <div className="flex items-center justify-between rounded-[1.5rem] border border-border/60 bg-muted/30 px-4 py-3 text-sm">
                  <span className="text-muted-foreground">Stock</span>
                  <span className="font-medium text-foreground">{product.stock}</span>
                </div>

                <div className="flex gap-3">
                  <Dialog
                    open={editingProduct?.id === product.id}
                    onOpenChange={(open) => {
                      setEditingProduct(open ? product : null);
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1 rounded-full">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl rounded-[2rem] border-border/60 p-0">
                      <div className="p-6 sm:p-8">
                        <ProductForm
                          onSubmit={handleEdit}
                          defaultValues={{
                            name: product.name || '',
                            description: product.description || '',
                            price: product.price.toString(),
                            category: product.category || '',
                            stock: product.stock.toString(),
                          }}
                          loading={submitting}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="destructive"
                    className="rounded-full"
                    onClick={() => setShowDeleteConfirm(product.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <Dialog open={!!showDeleteConfirm} onOpenChange={() => setShowDeleteConfirm(null)}>
        <DialogContent className="max-w-md rounded-[2rem] border-border/60 p-0">
          <div className="p-6 sm:p-8">
            <h3 className="text-2xl font-semibold">Delete product?</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              This removes the product from the admin catalog and storefront listing.
            </p>
            <div className="mt-8 flex gap-3">
              <Button
                variant="outline"
                className="flex-1 rounded-full"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1 rounded-full"
                onClick={() => showDeleteConfirm && handleDelete(showDeleteConfirm)}
                disabled={submitting}
              >
                {submitting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
