"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export interface ProductFormData {
  name: string;
  description: string;
  price: string;
  category: string;
  stock: string;
}

interface ProductFormProps {
  onSubmit: (data: ProductFormData, files: File[]) => void;
  defaultValues?: ProductFormData;
  loading?: boolean;
}

const emptyValues: ProductFormData = {
  name: '',
  description: '',
  price: '',
  category: '',
  stock: '',
};

export function ProductForm({ onSubmit, defaultValues, loading = false }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>(defaultValues || emptyValues);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    setFormData(defaultValues || emptyValues);
    setFiles([]);
  }, [defaultValues]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData, files);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">
          {defaultValues ? 'Edit product' : 'Create product'}
        </h3>
        <p className="text-sm text-muted-foreground">
          Keep product data clean, descriptive, and aligned with the storefront presentation.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Product name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
            required
            className="h-12 rounded-2xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(event) => setFormData({ ...formData, category: event.target.value })}
            className="h-12 rounded-2xl"
            placeholder="electronics, home, books..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (USD)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(event) => setFormData({ ...formData, price: event.target.value })}
            required
            className="h-12 rounded-2xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            type="number"
            value={formData.stock}
            onChange={(event) => setFormData({ ...formData, stock: event.target.value })}
            required
            className="h-12 rounded-2xl"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(event) => setFormData({ ...formData, description: event.target.value })}
          rows={5}
          className="rounded-[1.5rem]"
          placeholder="Write concise product copy that matches the storefront tone."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="images">Product images</Label>
        <Input
          id="images"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="rounded-2xl file:mr-4 file:rounded-full file:border-0 file:bg-custom-accent file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-600"
        />
        <p className="text-sm text-muted-foreground">
          {files.length > 0
            ? `${files.length} image${files.length === 1 ? '' : 's'} selected`
            : 'Upload fresh product images or leave empty to keep the current one.'}
        </p>
      </div>

      <Button
        type="submit"
        className="h-12 w-full rounded-full bg-custom-accent hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? 'Saving product...' : defaultValues ? 'Save changes' : 'Create product'}
      </Button>
    </form>
  );
}
