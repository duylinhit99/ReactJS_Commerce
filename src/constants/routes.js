export const ACCOUNT_SIDEBAR_PATHS = [
  "account",
  "my-product",
  "/product/add",
  "/product/edit",
];

export function shouldShowAccountMenu(pathname) {
  return ACCOUNT_SIDEBAR_PATHS.some((segment) => pathname.includes(segment));
}
