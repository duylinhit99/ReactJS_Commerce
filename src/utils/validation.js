export const EMAIL_REGEX =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg"];

export function validateEmail(email) {
  return EMAIL_REGEX.test(email);
}

export function getFileExtension(filename) {
  return filename.split(".").pop()?.toLowerCase() ?? "";
}

export function validateImageFile(file, { maxSizeMb = 1, required = true } = {}) {
  if (!file) {
    return required ? "Please select an image file" : null;
  }
  if (file.size > maxSizeMb * 1024 * 1024) {
    return `Please choose a file smaller than ${maxSizeMb}MB`;
  }
  if (!IMAGE_EXTENSIONS.includes(getFileExtension(file.name))) {
    return "Only png, jpg, jpeg files are allowed";
  }
  return null;
}

export function validateImageFiles(
  files,
  { maxCount = 3, maxSizeMb = 1, required = true } = {}
) {
  const list = files?.length ? Array.from(files) : [];
  if (list.length === 0) {
    return required ? "Please select image(s)" : null;
  }
  if (list.length > maxCount) {
    return `You can only upload up to ${maxCount} images`;
  }
  for (const file of list) {
    const err = validateImageFile(file, { maxSizeMb, required: true });
    if (err) return err;
  }
  return null;
}

export function isEmpty(value) {
  return value === "" || value === null || value === undefined;
}
