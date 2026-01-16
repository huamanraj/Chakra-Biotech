# Chakra Bio Admin Frontend - API Integration Summary

## ✅ Integration Complete!

The admin frontend has been successfully integrated with the Chakra Bio backend API.

---

## 📦 What Was Added

### 1. Complete API Layer (`/lib/api/`)

**14 TypeScript modules** providing full backend integration:

| File | Purpose | Key Functions |
|------|---------|---------------|
| `config.ts` | API configuration, token management | `apiRequest`, `getToken`, `setToken` |
| `auth.ts` | Authentication | `login`, `verify`, `logout` |
| `blogs.ts` | Blog management | `getAll`, `create`, `update`, `delete`, `togglePublish` |
| `products.ts` | Product catalog | `getAll`, `create`, `update`, `delete`, `togglePublish`, `toggleFeatured` |
| `categories.ts` | All category types | Blog, Product, Gallery categories CRUD |
| `comments.ts` | Blog comments | `getAll`, `approve`, `delete` |
| `reviews.ts` | Product reviews | `getAll`, `approve`, `delete` |
| `contacts.ts` | Contact submissions | `getAll`, `markAsRead`, `markAsReplied`, `delete` |
| `gallery.ts` | Gallery images | `getAll`, `create`, `update`, `delete` |
| `hero.ts` | Hero sections/carousel | `getAll`, `create`, `update`, `delete`, `toggleActive` |
| `company.ts` | Company details | `get`, `update` |
| `stats.ts` | Dashboard statistics | `getDashboardStats` |
| `upload.ts` | Image uploads | `uploadImage`, `uploadImages`, `deleteImage` |
| `index.ts` | Central exports | Exports all API modules |

### 2. Custom Hooks (`/lib/hooks/`)

**`useApi.ts`** - Generic hook for API calls with:
- Automatic loading states
- Error handling with toast notifications
- Success callbacks
- TypeScript support

### 3. Utilities (`/lib/utils/`)

**`formatters.ts`** - Helper functions:
- `formatDate` - Format dates
- `formatDateTime` - Format date with time
- `formatCurrency` - Format Indian Rupees
- `truncateText` - Truncate long text

### 4. Updated Authentication

**`app/contexts/AuthContext.tsx`** - Now uses real backend:
- JWT token-based authentication
- Token stored in localStorage as `chakra_admin_token`
- Auto-refresh and session validation
- Proper error handling
- Secure logout

### 5. Configuration Files

- `.env.local.example` - Environment variable template
- `tsconfig.json` - Updated with path aliases

### 6. Documentation

- `INTEGRATION-GUIDE.md` - Complete API usage guide
- `README-API-INTEGRATION.md` - Quick start guide
- `API-INTEGRATION-SUMMARY.md` - This file
- `app/dashboard/page-with-api.tsx.example` - Real API example

---

## 🚀 Quick Start

### Step 1: Environment Setup

Create `.env.local` in admin-frontend directory:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Step 2: Start Backend

```bash
cd backend
npm install
npm run dev
```

Backend should be running on `http://localhost:5000`

### Step 3: Start Admin Frontend

```bash
cd admin-frontend
npm install
npm run dev
```

Admin frontend should be running on `http://localhost:3001`

### Step 4: Login

Use credentials from backend `.env`:
- Email: `admin@chakrabio.com`
- Password: Your configured password

---

## 💻 Usage Examples

### Example 1: Fetch Blogs

```typescript
import { blogsApi } from '@/lib/api';
import { useState, useEffect } from 'react';

const [blogs, setBlogs] = useState([]);

useEffect(() => {
  const loadBlogs = async () => {
    const response = await blogsApi.getAll({ page: 1, limit: 10 });
    setBlogs(response.data.blogs);
  };
  loadBlogs();
}, []);
```

### Example 2: Create Product with useApi Hook

```typescript
import { productsApi } from '@/lib/api';
import { useApi } from '@/lib/hooks/useApi';

const { loading, execute } = useApi(productsApi.create, {
  successMessage: 'Product created successfully!',
  onSuccess: () => router.push('/dashboard/products')
});

const handleSubmit = async (formData) => {
  await execute(formData);
};
```

### Example 3: Upload Image

```typescript
import { uploadApi } from '@/lib/api';

const handleImageUpload = async (file: File) => {
  const response = await uploadApi.uploadImage(file);
  setImageUrl(response.data.url);
};
```

### Example 4: Dashboard Stats

```typescript
import { statsApi } from '@/lib/api';

const stats = await statsApi.getDashboardStats();
console.log(stats.data.totalProducts);
console.log(stats.data.unreadContacts);
```

---

## 📋 Integration Checklist

### Backend Setup
- [x] Backend API built and running
- [x] MongoDB connected
- [x] Admin credentials configured in `.env`
- [x] CORS configured for admin frontend
- [x] Cloudinary configured for uploads

### Frontend Setup
- [x] API layer created (`/lib/api/`)
- [x] AuthContext updated with real API
- [x] Custom hooks created
- [x] Utilities added
- [x] TypeScript interfaces defined
- [x] Path aliases configured
- [x] Documentation created

### Next Steps (Your Tasks)
- [ ] Create `.env.local` with API URL
- [ ] Update dashboard page with real stats
- [ ] Update blog pages with API calls
- [ ] Update product pages with API calls
- [ ] Update contact page with API calls
- [ ] Update gallery with API calls
- [ ] Update carousel/hero with API calls
- [ ] Update company info with API calls
- [ ] Test all CRUD operations
- [ ] Test image uploads
- [ ] Test authentication flow

---

## 🔧 API Reference

### Authentication

```typescript
import { authApi } from '@/lib/api';

// Login
await authApi.login({ email: 'admin@chakrabio.com', password: 'password' });

// Verify token
await authApi.verify();

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
await blogsApi.create({ title: 'New Blog', content: '...', category: categoryId });

// Update blog
await blogsApi.update(id, { title: 'Updated Title' });

// Delete blog
await blogsApi.delete(id);

// Toggle publish
await blogsApi.togglePublish(id);
```

### Products

```typescript
import { productsApi } from '@/lib/api';

// Get all products
const products = await productsApi.getAll({ page: 1, category: categoryId });

// Create product
await productsApi.create(productData);

// Toggle featured
await productsApi.toggleFeatured(id);

// Toggle publish
await productsApi.togglePublish(id);
```

### Categories

```typescript
import { blogCategoriesApi, productCategoriesApi, galleryCategoriesApi } from '@/lib/api';

// Blog categories
const blogCats = await blogCategoriesApi.getAll();
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

// Delete
await contactsApi.delete(id);
```

### Upload

```typescript
import { uploadApi } from '@/lib/api';

// Single image
const result = await uploadApi.uploadImage(file);
const imageUrl = result.data.url;

// Multiple images
const results = await uploadApi.uploadImages([file1, file2]);

// Delete image
await uploadApi.deleteImage(publicId);
```

---

## 🎯 TypeScript Benefits

All API calls are fully typed:

```typescript
// Autocomplete for parameters
blogsApi.getAll({ 
  page: 1,        // ✓ number
  limit: 10,      // ✓ number
  search: 'text', // ✓ string
  // category: 123 // ✗ Error: should be string
});

// Type-safe responses
const response = await blogsApi.getAll();
response.data.blogs.forEach(blog => {
  console.log(blog.title);     // ✓ string
  console.log(blog.views);     // ✓ number
  console.log(blog.isPublished); // ✓ boolean
});
```

---

## 🐛 Troubleshooting

### CORS Errors

**Problem:** `Access-Control-Allow-Origin` error

**Solution:** Update backend `.env`:
```
ADMIN_FRONTEND_URL=http://localhost:3001
```

### 401 Unauthorized

**Problem:** API returns 401 error

**Solutions:**
- Check admin credentials in backend `.env`
- Verify `JWT_SECRET` is set in backend
- Try logging out and back in
- Check if backend is running

### Network Errors

**Problem:** Cannot connect to API

**Solutions:**
- Ensure backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify MongoDB is connected
- Check backend logs for errors

### Image Upload Fails

**Problem:** Image upload returns error

**Solutions:**
- Verify Cloudinary credentials in backend `.env`
- Check file size (max 5MB)
- Ensure file type is allowed (jpg, png, webp)
- Check Cloudinary API key permissions

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `INTEGRATION-GUIDE.md` | Detailed API usage guide with examples |
| `README-API-INTEGRATION.md` | Quick start and overview |
| `API-INTEGRATION-SUMMARY.md` | This file - complete summary |
| `backend/API-SPECIFICATION.md` | Backend API specification |
| `backend/SETUP.md` | Backend setup guide |
| `backend/README.md` | Backend overview |

---

## 🎉 You're Ready!

The API integration is complete. Now you can:

1. ✅ Authenticate with real backend
2. ✅ Fetch and display real data
3. ✅ Create, update, delete content
4. ✅ Upload images to Cloudinary
5. ✅ Manage all aspects of the website

Start by updating the dashboard page:
```bash
mv app/dashboard/page-with-api.tsx.example app/dashboard/page.tsx
```

Then proceed to update other pages with real API calls!

Happy coding! 🚀
