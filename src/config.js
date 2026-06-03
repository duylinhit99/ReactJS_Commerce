export const API_PUBLIC_BASE = "http://127.0.0.1:8000";

export const API_BASE_UPLOAD = `${API_PUBLIC_BASE}/upload/product`;

export const BLOG_IMAGE_BASE = `${API_PUBLIC_BASE}/upload/Blog/image`;

export const USER_AVATAR_BASE = `${API_PUBLIC_BASE}/upload/user/avatar`;

export function productImageUrl(userId, fileName) {
  return `${API_BASE_UPLOAD}/${userId}/${fileName}`;
}

export function blogImageUrl(fileName) {
  return `${BLOG_IMAGE_BASE}/${fileName}`;
}

export function userAvatarUrl(fileName) {
  return `${USER_AVATAR_BASE}/${fileName}`;
}
