/**
 * Gallery functionality for CareerPath Pro website
 * Handles image filtering, lightbox modal, and gallery interactions
 */

class Gallery {
    constructor() {
        this.currentImageIndex = 0;
        this.filteredItems = [];
        this.allItems = [];
        this.init();
    }

    init() {
        this.setupFilterButtons();
        this.setupLightbox();
        this.setupGalleryItems();
        this.setupKeyboardNavigation();
        this.loadInitialImages();
    }

    /**
     * Setup filter button functionality
     */
    setupFilterButtons() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Filter gallery items
                const filterValue = button.getAttribute('data-filter');
                this.filterGallery(filterValue);
            });
        });
    }

    /**
     * Filter gallery items based on category
     */
    filterGallery(filter) {
        const galleryItems = document.querySelectorAll('.gallery-item');
        this.filteredItems = [];

        galleryItems.forEach((item, index) => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.classList.remove('hide');
                this.filteredItems.push({
                    element: item,
                    index: index,
                    category: category
                });
                
                // Add staggered animation
                setTimeout(() => {
                    item.style.animation = 'slideIn 0.6s ease forwards';
                }, index * 100);
            } else {
                item.classList.add('hide');
            }
        });
    }

    /**
     * Setup lightbox modal functionality
     */
    setupLightbox() {
        const lightbox = document.getElementById('lightbox');
        const closeBtn = document.querySelector('.lightbox-close');
        const prevBtn = document.querySelector('.lightbox-prev');
        const nextBtn = document.querySelector('.lightbox-next');

        // Close lightbox
        closeBtn.addEventListener('click', () => {
            this.closeLightbox();
        });

        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox();
            }
        });

        // Navigation buttons
        prevBtn.addEventListener('click', () => {
            this.previousImage();
        });

        nextBtn.addEventListener('click', () => {
            this.nextImage();
        });
    }

    /**
     * Setup gallery item click handlers
     */
    setupGalleryItems() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        this.allItems = Array.from(galleryItems).map((item, index) => ({
            element: item,
            index: index,
            category: item.getAttribute('data-category'),
            title: item.querySelector('h3').textContent,
            description: item.querySelector('p').textContent,
            image: item.querySelector('.placeholder-svg')
        }));

        this.filteredItems = [...this.allItems];

        galleryItems.forEach((item, index) => {
            const galleryImage = item.querySelector('.gallery-image');
            
            galleryImage.addEventListener('click', () => {
                this.openLightbox(index);
            });

            // Add hover effect enhancement
            item.addEventListener('mouseenter', () => {
                const overlay = item.querySelector('.gallery-overlay');
                overlay.style.opacity = '1';
            });

            item.addEventListener('mouseleave', () => {
                const overlay = item.querySelector('.gallery-overlay');
                overlay.style.opacity = '0';
            });
        });
    }

    /**
     * Setup keyboard navigation
     */
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            const lightbox = document.getElementById('lightbox');
            
            if (lightbox.classList.contains('active')) {
                switch(e.key) {
                    case 'Escape':
                        this.closeLightbox();
                        break;
                    case 'ArrowLeft':
                        this.previousImage();
                        break;
                    case 'ArrowRight':
                        this.nextImage();
                        break;
                }
            }
        });
    }

    /**
     * Open lightbox with specific image
     */
    openLightbox(index) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.querySelector('.lightbox-image');
        const lightboxTitle = document.querySelector('.lightbox-title');
        const lightboxDescription = document.querySelector('.lightbox-description');

        // Find the index in filtered items
        const visibleItems = this.filteredItems;
        const item = this.allItems[index];
        this.currentImageIndex = visibleItems.findIndex(filteredItem => filteredItem.index === index);

        if (this.currentImageIndex === -1) {
            this.currentImageIndex = 0;
        }

        // Set image and info
        this.updateLightboxContent();

        // Show lightbox
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Add fade in animation
        lightbox.style.animation = 'fadeIn 0.3s ease';
    }

    /**
     * Close lightbox
     */
    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    /**
     * Navigate to previous image
     */
    previousImage() {
        if (this.filteredItems.length === 0) return;
        
        this.currentImageIndex = this.currentImageIndex > 0 
            ? this.currentImageIndex - 1 
            : this.filteredItems.length - 1;
        
        this.updateLightboxContent();
    }

    /**
     * Navigate to next image
     */
    nextImage() {
        if (this.filteredItems.length === 0) return;
        
        this.currentImageIndex = this.currentImageIndex < this.filteredItems.length - 1 
            ? this.currentImageIndex + 1 
            : 0;
        
        this.updateLightboxContent();
    }

    /**
     * Update lightbox content
     */
    updateLightboxContent() {
        if (this.filteredItems.length === 0) return;

        const currentItem = this.filteredItems[this.currentImageIndex];
        const lightboxImage = document.querySelector('.lightbox-image');
        const lightboxTitle = document.querySelector('.lightbox-title');
        const lightboxDescription = document.querySelector('.lightbox-description');

        // Create a higher quality version of the SVG for lightbox
        const svg = currentItem.element.querySelector('.placeholder-svg').cloneNode(true);
        svg.setAttribute('width', '600');
        svg.setAttribute('height', '400');
        
        // Convert SVG to data URL
        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
        const svgUrl = URL.createObjectURL(svgBlob);

        lightboxImage.src = svgUrl;
        lightboxImage.alt = currentItem.title;
        lightboxTitle.textContent = currentItem.title;
        lightboxDescription.textContent = currentItem.description;

        // Clean up previous URL
        if (lightboxImage.dataset.prevUrl) {
            URL.revokeObjectURL(lightboxImage.dataset.prevUrl);
        }
        lightboxImage.dataset.prevUrl = svgUrl;
    }

    /**
     * Load initial images (simulate real image loading)
     */
    loadInitialImages() {
        // Show all items initially
        this.filterGallery('all');
        
        // Add entrance animation
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    /**
     * Add new gallery item (for future dynamic content)
     */
    addGalleryItem(itemData) {
        const galleryGrid = document.getElementById('gallery-grid');
        const newItem = this.createGalleryItem(itemData);
        
        galleryGrid.appendChild(newItem);
        this.setupSingleGalleryItem(newItem, this.allItems.length);
        
        this.allItems.push({
            element: newItem,
            index: this.allItems.length,
            category: itemData.category,
            title: itemData.title,
            description: itemData.description,
            image: newItem.querySelector('.placeholder-svg')
        });
    }

    /**
     * Create gallery item element
     */
    createGalleryItem(data) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.setAttribute('data-category', data.category);
        
        item.innerHTML = `
            <div class="gallery-image">
                <svg viewBox="0 0 400 300" class="placeholder-svg">
                    <rect width="100%" height="100%" fill="${data.gradient || 'url(#gradient1)'}"/>
                    ${data.svgContent || ''}
                </svg>
                <div class="gallery-overlay">
                    <i class="fas fa-expand-alt"></i>
                </div>
            </div>
            <div class="gallery-info">
                <h3>${data.title}</h3>
                <p>${data.description}</p>
                <span class="gallery-tag">${data.tag}</span>
            </div>
        `;
        
        return item;
    }

    /**
     * Setup single gallery item
     */
    setupSingleGalleryItem(item, index) {
        const galleryImage = item.querySelector('.gallery-image');
        
        galleryImage.addEventListener('click', () => {
            this.openLightbox(index);
        });
    }

    /**
     * Get gallery statistics
     */
    getGalleryStats() {
        const stats = {
            total: this.allItems.length,
            categories: {}
        };

        this.allItems.forEach(item => {
            const category = item.category;
            stats.categories[category] = (stats.categories[category] || 0) + 1;
        });

        return stats;
    }

    /**
     * Search gallery items
     */
    searchGallery(searchTerm) {
        const filteredItems = this.allItems.filter(item => 
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase())
        );

        this.showSearchResults(filteredItems);
    }

    /**
     * Show search results
     */
    showSearchResults(results) {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            const isMatch = results.some(result => result.element === item);
            
            if (isMatch) {
                item.classList.remove('hide');
            } else {
                item.classList.add('hide');
            }
        });

        this.filteredItems = results;
    }
}

// Utility functions for gallery management
const galleryUtils = {
    /**
     * Create image upload handler (for future implementation)
     */
    setupImageUpload() {
        // This would handle real image uploads in a full implementation
        console.log('Image upload functionality would be implemented here');
    },

    /**
     * Generate gallery item from image file
     */
    createFromImage(file, category, title, description) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const imageData = {
                    src: e.target.result,
                    category: category,
                    title: title,
                    description: description,
                    tag: category.charAt(0).toUpperCase() + category.slice(1)
                };
                
                resolve(imageData);
            };
            
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },

    /**
     * Export gallery data
     */
    exportGalleryData(gallery) {
        const data = {
            items: gallery.allItems.map(item => ({
                category: item.category,
                title: item.title,
                description: item.description
            })),
            stats: gallery.getGalleryStats(),
            exportDate: new Date().toISOString()
        };
        
        return JSON.stringify(data, null, 2);
    }
};

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gallery = new Gallery();
});

// Handle page visibility changes for better performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause any animations or heavy operations
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.classList.contains('active')) {
            // Keep lightbox functional even when page is hidden
        }
    }
});

// Export for use in other files
window.GalleryUtils = galleryUtils;