"use client";

import { useState } from 'react';
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

export function ProductForm({ onSubmit, defaultValues, loading = false }: ProductFormProps) {
  const [formData, setFormData] = useState(defaultValues || {
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
  });
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, files);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({...formData, stock: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows={4}
        />
      </div>
      <div>
        <Label htmlFor="images">Product Images</Label>
        <Input
          id="images"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-custom-accent file:text-white hover:file:bg-blue-600"
        />
        <p className="text-sm text-muted-foreground mt-1">
          {files.length > 0 && `${files.length} files selected`}
        </p>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Saving...' : 'Save Product'}
      </Button>
    </form>
  );
}

