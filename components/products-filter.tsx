"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

interface FilterProps {
  onSearch: (query: string) => void;
}

export function ProductsFilter({ onSearch }: FilterProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = () => {
    onSearch(search);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-8 p-6 bg-card rounded-lg">
      <Input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />
      <select 
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="flex-1 max-w-xs p-2 border rounded-lg"
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="books">Books</option>
      </select>
      <div className="flex gap-2">
        <Button onClick={handleSearch}>Search</Button>
        <Button variant="outline">Clear</Button>
      </div>
    </div>
  );
}
