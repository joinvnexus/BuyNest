"use client";

import type { Route } from 'next';
import { useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const categories = [
  { value: '', label: 'All categories' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'books', label: 'Books' },
  { value: 'home', label: 'Home' },
];

const sortOptions = [
  { value: 'newest', label: 'Newest first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'name', label: 'Name: A to Z' },
];

export function ProductsFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(searchParams.get('q') ?? '');
  const [category, setCategory] = useState(searchParams.get('category') ?? '');
  const [sort, setSort] = useState(searchParams.get('sort') ?? 'newest');

  const updateUrl = (next: { q?: string; category?: string; sort?: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    const query = next.q ?? search;
    const nextCategory = next.category ?? category;
    const nextSort = next.sort ?? sort;

    if (query.trim()) {
      params.set('q', query.trim());
    } else {
      params.delete('q');
    }

    if (nextCategory) {
      params.set('category', nextCategory);
    } else {
      params.delete('category');
    }

    if (nextSort && nextSort !== 'newest') {
      params.set('sort', nextSort);
    } else {
      params.delete('sort');
    }

    params.delete('page');

    startTransition(() => {
      const queryString = params.toString();
      router.push((queryString ? `${pathname}?${queryString}` : pathname) as Route);
    });
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setSort('newest');
    startTransition(() => {
      router.push(pathname as Route);
    });
  };

  return (
    <div className="rounded-[2rem] border border-border/60 bg-card/80 p-5 shadow-sm backdrop-blur">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-custom-accent/10 text-custom-accent">
          <SlidersHorizontal className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-base font-semibold">Refine your catalog</h2>
          <p className="text-sm text-muted-foreground">
            Search, sort, and jump between curated categories.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_220px_220px_auto] lg:items-end">
        <div className="space-y-2">
          <label htmlFor="catalog-search" className="text-sm font-medium">
            Search
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="catalog-search"
              placeholder="Search products, materials, or categories"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  updateUrl({ q: search });
                }
              }}
              className="h-12 rounded-2xl border-border/70 pl-11"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="catalog-category" className="text-sm font-medium">
            Category
          </label>
          <select
            id="catalog-category"
            value={category}
            onChange={(e) => {
              const value = e.target.value;
              setCategory(value);
              updateUrl({ category: value });
            }}
            className="h-12 w-full rounded-2xl border border-input bg-background px-4 text-sm"
          >
            {categories.map((option) => (
              <option key={option.value || 'all'} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="catalog-sort" className="text-sm font-medium">
            Sort by
          </label>
          <select
            id="catalog-sort"
            value={sort}
            onChange={(e) => {
              const value = e.target.value;
              setSort(value);
              updateUrl({ sort: value });
            }}
            className="h-12 w-full rounded-2xl border border-input bg-background px-4 text-sm"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => updateUrl({ q: search })}
            className="h-12 flex-1 rounded-2xl bg-custom-accent hover:bg-blue-600"
            disabled={isPending}
          >
            {isPending ? 'Applying...' : 'Apply'}
          </Button>
          <Button
            variant="outline"
            onClick={clearFilters}
            className="h-12 rounded-2xl px-4"
          >
            <X className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {categories.slice(1).map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => {
              setCategory(option.value);
              updateUrl({ category: option.value });
            }}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm transition-colors",
              category === option.value
                ? "border-custom-accent/40 bg-custom-accent/10 text-foreground"
                : "border-border/60 bg-background hover:bg-accent"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
