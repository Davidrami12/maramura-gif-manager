export const allowedFormats = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

export function validateFiles(files: File[]): { validFiles: File[], error?: string } {
  const validFiles = files.filter(file => allowedFormats.includes(file.type));
  
  if (validFiles.length !== files.length) {
    return {
      validFiles,
      error: "Uploaded format file incorrect. Valid formats: JPG, PNG and GIF."
    };
  }

  return { validFiles };
}
