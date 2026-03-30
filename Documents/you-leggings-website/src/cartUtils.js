import { CART_STORAGE_KEY } from './data.js';

export function slugifyProductName(name) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function parseMoney(value) {
  const amount = String(value || '').replace(/[^0-9]/g, '');
  return amount ? parseInt(amount, 10) : 0;
}

export function formatMoney(value) {
  return `INR ${Number(value || 0).toLocaleString('en-IN')}`;
}

export function normalizeCartItems(items) {
  const normalized = [];
  const itemMap = new Map();
  (Array.isArray(items) ? items : []).forEach((item) => {
    const slug = String(item?.slug || '').trim();
    const size = String(item?.size || '').trim().toUpperCase();
    const color = String(item?.color || '').trim().toLowerCase();
    const qty = Math.max(1, Number(item?.qty) || 1);
    const key = `${slug}|${size}|${color}`;
    if (itemMap.has(key)) {
      itemMap.get(key).qty += qty;
      return;
    }
    const safeItem = {
      slug,
      name: item?.name || '',
      image: item?.image || '',
      price: Number(item?.price) || 0,
      size: size || 'M',
      color: item?.color || 'Standard',
      qty,
    };
    itemMap.set(key, safeItem);
    normalized.push(safeItem);
  });
  return normalized;
}

export function getStoredCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? normalizeCartItems(parsed) : [];
  } catch {
    return [];
  }
}

export function setStoredCart(items) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(normalizeCartItems(items)));
  } catch {}
}

export function getCartCount() {
  return getStoredCart().reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
}
