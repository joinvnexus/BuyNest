import { CartItem } from '@/types';

export interface ProductPayload {
  name: string;
  description: string;
  price: number;
  category: string | null;
  stock: number;
}

function parseString(value: FormDataEntryValue | null) {
  return typeof value === 'string' ? value.trim() : '';
}

export function parseProductFormData(formData: FormData): ProductPayload {
  const name = parseString(formData.get('name'));
  const description = parseString(formData.get('description'));
  const category = parseString(formData.get('category'));
  const price = Number(parseString(formData.get('price')));
  const stock = Number(parseString(formData.get('stock')));

  if (!name) {
    throw new Error('Product name is required.');
  }

  if (!Number.isFinite(price) || price <= 0) {
    throw new Error('Price must be greater than 0.');
  }

  if (!Number.isInteger(stock) || stock < 0) {
    throw new Error('Stock must be a non-negative integer.');
  }

  return {
    name,
    description,
    price,
    category: category || null,
    stock,
  };
}

export function validateCartItems(input: unknown): CartItem[] {
  if (!Array.isArray(input) || input.length === 0) {
    throw new Error('Cart is empty.');
  }

  const cartItems = input.filter(Boolean) as CartItem[];

  const isValid = cartItems.every((item) => {
    return (
      typeof item?.id === 'string' &&
      typeof item?.name === 'string' &&
      typeof item?.image === 'string' &&
      typeof item?.price === 'number' &&
      Number.isFinite(item.price) &&
      item.price > 0 &&
      typeof item?.quantity === 'number' &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0
    );
  });

  if (!isValid) {
    throw new Error('Cart contains invalid items.');
  }

  return cartItems;
}

export function validateRegistrationPayload(payload: unknown) {
  const body = (payload ?? {}) as Record<string, unknown>;
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!name || !email || !password) {
    throw new Error('Name, email, and password are required.');
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    throw new Error('Enter a valid email address.');
  }

  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters.');
  }

  return { name, email, password };
}
