export const getImageUrl = (url) => {
    if (!url) return '';

    // If it's already a full URL (Cloudinary or otherwise), return as is
    if (url.startsWith('http')) {
        return url;
    }

    // If it's a relative path from the backend (e.g., "uploads/...")
    const API_URL = import.meta.env.VITE_API_URL || '';

    // Remove "/api" from the end of the API URL to get the base backend URL
    const baseUrl = API_URL.replace(/\/api\/?$/, '');

    // Ensure the URL starts with a slash
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;

    return `${baseUrl}${cleanUrl}`;
};
