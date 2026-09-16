/** Shared React hooks — data fetching lives here; services stay UI-free. */

// --- Preferences / UI ---
export * from './use-preferences';
export * from './use-page-title';
export * from './use-debounced-value';

// --- Catalog / books ---
export * from './use-book-query';
export * from './use-books-query';
export * from './use-featured-books-query';
export * from './use-book-filters';
export * from './use-book-search-query';
export * from './use-catalog-books';
export * from './use-save-book-mutation';
export * from './use-delete-book-mutation';
export * from './use-upload-book-cover-mutation';
export * from './use-track-recently-viewed';

// --- Cart / checkout ---
export * from './use-cart-query';
export * from './use-cart-books-queries';
export * from './use-add-to-cart-mutation';
export * from './use-update-cart-item-mutation';
export * from './use-remove-cart-item-mutation';
export * from './use-clear-cart-mutation';
export * from './use-checkout-mutation';

// --- Orders ---
export * from './use-order-query';
export * from './use-orders-query';
export * from './use-pay-order-mutation';
export * from './use-update-order-status-mutation';

// --- Favorites / reviews / reports ---
export * from './use-favorites-query';
export * from './use-toggle-favorite-mutation';
export * from './use-remove-favorite-mutation';
export * from './use-reviews-query';
export * from './use-create-review-mutation';
export * from './use-update-review-mutation';
export * from './use-issues-query';
export * from './use-create-issue-mutation';
export * from './use-update-issue-status-mutation';

// --- Auth / profile / users ---
export * from './use-update-profile-mutation';
export * from './use-users-query';
export * from './use-delete-user-mutation';
export * from './use-toggle-user-active-mutation';

// --- Admin / analytics / RBAC / discounts ---
export * from './use-dashboard-summary-query';
export * from './use-low-stock-query';
export * from './use-recent-orders-query';
export * from './use-revenue-query';
export * from './use-top-books-query';
export * from './use-orders-by-status-query';
export * from './use-roles-query';
export * from './use-permissions-query';
export * from './use-discounts-query';
export * from './use-save-discount-mutation';
export * from './use-delete-discount-mutation';
