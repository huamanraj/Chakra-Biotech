# Backend API Integration Guide

## Setup Complete ✓

The admin frontend has been integrated with the Chakra Bio backend API.

## What's Been Added

### 1. API Layer (`/lib/api/`)

Complete TypeScript API client with modules for:
- **auth.ts** - Authentication (login, verify, logout)
- **blogs.ts** - Blog management
- **categories.ts** - Blog, Product, and Gallery categories
- **comments.ts** - Blog comment moderation
- **company.ts** - Company details management
- **contacts.ts** - Contact form submissions
- **gallery.ts** - Gallery image management
- **hero.ts** - Hero section/carousel management
- **products.ts** - Product catalog management
- **reviews.ts** - Product review moderation
- **stats.ts** - Dashboard statistics
- **upload.ts** - Image upload to Cloudinary
- **config.ts** - API configuration and helpers

### 2. Updated Authentication

The `AuthContext` now uses the real backend API:
- JWT token-based authentication
- Token stored in localStorage
- Auto-refresh and session validation
- Proper logout handling

### 3. Custom Hooks

- **useApi** - Generic hook for API calls with loading states and error handling

### 4. Utilities

- **formatters.ts** - Date, currency, and text formatting helpers

## Environment Setup

1. Create `.env.local` file in the admin-frontend directory:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

2. Make sure the backend is running on port 5000 (or update the URL above)

## Usage Examples

### Using the API in Components

```typescript
'use client'

import { useEffect, useState } from 'react';
import { blogsApi, Blog } from '@/lib/api';
import toast from 'react-hot-toast';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const response = await blogsApi.getAll({ page: 1, limit: 10 });
      setBlogs(response.data.blogs);
    } catch (error) {
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await blogsApi.delete(id);
      toast.success('Blog deleted successfully');
      loadBlogs(); // Reload list
    } catch (error) {
      toast.error('Failed to delete blog');
    }
  };

  // ... rest of component
}
```

### Using the useApi Hook

```typescript
'use client'

import { productsApi } from '@/lib/api';
import { useApi } from '@/lib/hooks/useApi';

export default function ProductForm() {
  const { loading, execute: createProduct } = useApi(
    productsApi.create,
    {
      successMessage: 'Product created successfully!',
      onSuccess: () => {
        // Redirect or refresh
      }
    }
  );

  const handleSubmit = async (data: any) => {
    await createProduct(data);
  };

  // ... rest of component
}
```

### Image Upload

```typescript
import { uploadApi } from '@/lib/api';

const handleImageUpload = async (file: File) => {
  try {
    const response = await uploadApi.uploadImage(file);
    const imageUrl = response.data.url;
    // Use imageUrl in your form
  } catch (error) {
    toast.error('Failed to upload image');
  }
};
```

## API Reference

### Authentication

```typescript
import { authApi } from '@/lib/api';

// Login
const response = await authApi.login({ email, password });

// Verify token
const user = await authApi.verify();

// Logout
authApi.logout();
```

### Blogs

```typescript
import { blogsApi } from '@/lib/api';

// Get all blogs
const blogs = await blogsApi.getAll({ page: 1, limit: 10, search: 'saffron' });

// Get single blog
const blog = await blogsApi.getOne(id);

// Create blog
const newBlog = await blogsApi.create(blogData);

// Update blog
const updated = await blogsApi.update(id, blogData);

// Delete blog
await blogsApi.delete(id);

// Toggle publish status
await blogsApi.togglePublish(id);
```

### Products

```typescript
import { productsApi } from '@/lib/api';

// Get all products
const products = await productsApi.getAll({ page: 1, category: categoryId });

// Create product
const product = await productsApi.create(productData);

// Toggle featured
await productsApi.toggleFeatured(id);
```

### Categories

```typescript
import { blogCategoriesApi, productCategoriesApi, galleryCategoriesApi } from '@/lib/api';

// Blog categories
const categories = await blogCategoriesApi.getAll();
await blogCategoriesApi.create({ name: 'Health Benefits' });

// Product categories
const prodCats = await productCategoriesApi.getAll();

// Gallery categories
const galleryCats = await galleryCategoriesApi.getAll();
```

### Contacts

```typescript
import { contactsApi } from '@/lib/api';

// Get all contacts
const contacts = await contactsApi.getAll({ isRead: false });

// Mark as read
await contactsApi.markAsRead(id);

// Mark as replied
await contactsApi.markAsReplied(id, 'Admin notes here');
```

### Dashboard Stats

```typescript
import { statsApi } from '@/lib/api';

const stats = await statsApi.getDashboardStats();
// Returns: totalProducts, totalBlogs, unreadContacts, etc.
```

## Next Steps

1. **Update Dashboard Page** - Use `statsApi.getDashboardStats()` to show real data
2. **Update Blog Pages** - Replace mock data with `blogsApi` calls
3. **Update Product Pages** - Replace mock data with `productsApi` calls
4. **Update Contact Page** - Use `contactsApi` to manage submissions
5. **Update Gallery** - Use `galleryApi` for image management
6. **Update Hero/Carousel** - Use `heroApi` for carousel management
7. **Update Company Info** - Use `companyApi` for business details

## Error Handling

All API calls throw errors that can be caught:

```typescript
try {
  await blogsApi.create(data);
} catch (error) {
  if (error instanceof Error) {
    toast.error(error.message);
  }
}
```

## TypeScript Support

All API functions are fully typed. Your IDE will provide autocomplete for:
- Request parameters
- Response data structures
- Error types

## Testing

Test the API integration:

1. Start the backend: `cd backend && npm run dev`
2. Start the admin frontend: `cd admin-frontend && npm run dev`
3. Login with your admin credentials from backend `.env`
4. Check browser console for any API errors

## Troubleshooting

### CORS Errors
- Ensure backend CORS is configured for `http://localhost:3001`
- Check `ADMIN_FRONTEND_URL` in backend `.env`

### 401 Unauthorized
- Token may be expired
- Check if backend is running
- Verify admin credentials

### Network Errors
- Ensure backend is running on correct port
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify MongoDB connection

## Production Deployment

Update `.env.local` for production:

```bash
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

Make sure backend CORS allows your production domain!
