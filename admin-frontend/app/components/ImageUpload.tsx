"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { uploadApi } from "@/lib/api";
import toast from "react-hot-toast";

interface ImageUploadProps {
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  label?: string;
  required?: boolean;
  maxFiles?: number;
  className?: string;
}

export default function ImageUpload({
  value,
  onChange,
  multiple = false,
  label,
  required = false,
  maxFiles = 10,
  className = "",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const images = Array.isArray(value) ? value : value ? [value] : [];

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check max files limit
    if (multiple && images.length + files.length > maxFiles) {
      toast.error(`You can only upload up to ${maxFiles} images`);
      return;
    }

    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map((file) =>
        uploadApi.uploadImage(file)
      );
      const results = await Promise.all(uploadPromises);
      const urls = results.map((r) => r.data.url);

      if (multiple) {
        onChange([...images, ...urls]);
      } else {
        onChange(urls[0]);
      }

      toast.success(
        `${files.length} image${
          files.length > 1 ? "s" : ""
        } uploaded successfully!`
      );
    } catch (error: any) {
      toast.error(error.message || "Failed to upload images");
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = async (index: number) => {
    const imageToRemove = images[index];

    // Extract public ID from Cloudinary URL
    try {
      const urlParts = imageToRemove.split("/");
      const fileWithExt = urlParts[urlParts.length - 1];
      const publicId = `chakra-bio/uploads/${fileWithExt.split(".")[0]}`;

      // Delete from Cloudinary
      await uploadApi.deleteImage(publicId);
    } catch (error) {
      console.error("Failed to delete image from Cloudinary:", error);
    }

    // Remove from state
    if (multiple) {
      onChange(images.filter((_, i) => i !== index));
    } else {
      onChange("");
    }
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-admin-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Upload Area */}
      <div className="border-2 border-dashed border-admin-300 rounded-lg p-6 hover:border-saffron-400 transition-colors">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
          id="image-upload-input"
          disabled={uploading || (!multiple && images.length >= 1)}
        />
        <label
          htmlFor="image-upload-input"
          className={`flex flex-col items-center cursor-pointer ${
            uploading || (!multiple && images.length >= 1)
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          {uploading ? (
            <>
              <Loader2 className="w-10 h-10 text-saffron-500 mb-3 animate-spin" />
              <span className="text-sm text-admin-600 font-medium">
                Uploading...
              </span>
            </>
          ) : (
            <>
              <Upload className="w-10 h-10 text-admin-400 mb-3" />
              <span className="text-sm text-admin-600 font-medium">
                {!multiple && images.length >= 1
                  ? "Image uploaded"
                  : "Click to upload image(s)"}
              </span>
              <span className="text-xs text-admin-500 mt-1">
                PNG, JPG, WEBP up to 5MB{" "}
                {multiple && `(max ${maxFiles} images)`}
              </span>
            </>
          )}
        </label>
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div
          className={`grid ${
            multiple
              ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
              : "grid-cols-1"
          } gap-4 mt-4`}
        >
          {images.map((url, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-admin-100 border border-admin-200">
                <img
                  src={url}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle"%3EError%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
              {multiple && index === 0 && (
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-saffron-500 text-white text-xs rounded-full">
                  Primary
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Empty State for Multiple */}
      {multiple && images.length === 0 && (
        <div className="mt-4 p-4 bg-admin-50 rounded-lg border border-admin-200 flex items-center justify-center">
          <ImageIcon className="w-5 h-5 text-admin-400 mr-2" />
          <span className="text-sm text-admin-500">No images uploaded yet</span>
        </div>
      )}
    </div>
  );
}
