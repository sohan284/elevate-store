import { useState } from "react";

/**
 * useImageUpload
 *
 * A reusable hook for managing an image file field + live preview.
 * Replaces the duplicated handleFileChange / imagePreview pattern
 * across categories, subcategories, and brands admin pages.
 *
 * @returns
 *   - `imagePreview`   — base64 data-URL string for the <img> src (or null)
 *   - `setImagePreview` — lets you set/clear the preview externally (e.g. on edit-modal open)
 *   - `handleFileChange` — onChange handler for <input type="file">
 *   - `clearImage`     — resets both the preview and returns the cleared image value ("")
 */
export function useImageUpload(initialPreview: string | null = null) {
  const [imagePreview, setImagePreview] = useState<string | null>(initialPreview);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onFile: (file: File) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImagePreview(null);
  };

  return { imagePreview, setImagePreview, handleFileChange, clearImage };
}
