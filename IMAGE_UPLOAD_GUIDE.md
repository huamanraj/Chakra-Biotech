# ImageUpload Component - Quick Reference Guide

## Import

```typescript
import ImageUpload from "../../components/ImageUpload";
```

## Usage Examples

### 1. Single Image Upload (Required)

```typescript
<ImageUpload
  value={formData.image}
  onChange={(value) => setFormData({ ...formData, image: value as string })}
  label="Category Image"
  required={true}
  multiple={false}
/>
```

**Use Case:** Product categories, blog featured images, single hero images

---

### 2. Single Image Upload (Optional)

```typescript
<ImageUpload
  value={formData.mobileImage}
  onChange={(value) =>
    setFormData({ ...formData, mobileImage: value as string })
  }
  label="Mobile Image (Optional)"
  required={false}
  multiple={false}
/>
```

**Use Case:** Optional mobile variants, alternative images

---

### 3. Multiple Images Upload

```typescript
<ImageUpload
  value={formData.images}
  onChange={(value) => setFormData({ ...formData, images: value as string[] })}
  label="Product Images"
  required={true}
  multiple={true}
  maxFiles={10}
/>
```

**Use Case:** Product galleries, image collections

---

## Form Data Setup

### Single Image

```typescript
const [formData, setFormData] = useState({
  name: "",
  image: "", // Single image URL
  // ... other fields
});
```

### Multiple Images

```typescript
const [formData, setFormData] = useState({
  name: "",
  images: [] as string[], // Array of image URLs
  // ... other fields
});
```

---

## Props Reference

| Prop        | Type                                  | Default | Description                         |
| ----------- | ------------------------------------- | ------- | ----------------------------------- |
| `value`     | `string \| string[]`                  | -       | Current image URL(s)                |
| `onChange`  | `(value: string \| string[]) => void` | -       | Callback when images change         |
| `multiple`  | `boolean`                             | `false` | Allow multiple images               |
| `label`     | `string`                              | -       | Field label text                    |
| `required`  | `boolean`                             | `false` | Mark as required field              |
| `maxFiles`  | `number`                              | `10`    | Max number of files (multiple mode) |
| `className` | `string`                              | `''`    | Additional CSS classes              |

---

## Features

✅ **Automatic Upload:** Files are uploaded immediately upon selection
✅ **Preview:** Displays uploaded images with thumbnails
✅ **Delete:** Remove images with one click (also deletes from Cloudinary)
✅ **Validation:** Checks file type and size
✅ **Loading State:** Shows spinner during upload
✅ **Error Handling:** Displays toast notifications for errors
✅ **Primary Indicator:** First image in multiple mode is marked as primary
✅ **Responsive:** Works on all screen sizes

---

## Supported File Types

- PNG
- JPG/JPEG
- WEBP

**Max File Size:** 5MB per image

---

## Complete Example

```typescript
"use client";

import { useState } from "react";
import ImageUpload from "../../components/ImageUpload";
import toast from "react-hot-toast";

const MyForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    gallery: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Please upload an image");
      return;
    }

    // Submit form with image URLs
    console.log("Form data:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Single Image */}
      <ImageUpload
        value={formData.image}
        onChange={(value) =>
          setFormData({ ...formData, image: value as string })
        }
        label="Featured Image"
        required={true}
        multiple={false}
      />

      {/* Multiple Images */}
      <ImageUpload
        value={formData.gallery}
        onChange={(value) =>
          setFormData({ ...formData, gallery: value as string[] })
        }
        label="Image Gallery"
        required={false}
        multiple={true}
        maxFiles={5}
      />

      <button type="submit">Submit</button>
    </form>
  );
};
```

---

## Troubleshooting

### Images not uploading?

- Check Cloudinary environment variables are set
- Verify backend server is running
- Check browser console for errors
- Ensure file size is under 5MB

### Delete not working?

- Verify the image URL is from Cloudinary
- Check backend upload controller is properly configured
- Ensure proper authentication token is present

### Images not displaying?

- Verify Cloudinary URLs are valid
- Check CORS settings if images are blocked
- Ensure image URLs are saved correctly in state

---

## Migration Guide

### Before (URL Input)

```typescript
<input
  type="url"
  value={formData.image}
  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
  placeholder="Enter image URL"
/>
```

### After (ImageUpload)

```typescript
<ImageUpload
  value={formData.image}
  onChange={(value) => setFormData({ ...formData, image: value as string })}
  label="Image"
  required={true}
  multiple={false}
/>
```

**Note:** No other changes needed! The component handles everything internally.
