/**
 * Form validation and submission handling for Sachii Career Coach contact form
 * Provides real-time validation, error display, and form submission
 */

class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.errors = {};
        
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.setupValidation();
        this.setupSubmission();
    }

    /**
     * Setup real-time validation for form fields
     */
    setupValidation() {
        const fields = this.form.querySelectorAll('input, select, textarea');
        
        fields.forEach(field => {
            // Validate on blur
            field.addEventListener('blur', () => {
                this.validateField(field);
            });

            // Clear errors on input
            field.addEventListener('input', () => {
                this.clearFieldError(field);
            });

            // Special handling for checkboxes
            if (field.type === 'checkbox') {
                field.addEventListener('change', () => {
                    this.validateField(field);
                });
            }
        });
    }

    /**
     * Setup form submission handling
     */
    setupSubmission() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    /**
     * Validate individual field
     */
    validateField(field) {
        const fieldName = field.name;
        const fieldValue = field.value.trim();
        const fieldType = field.type;
        
        // Clear previous error
        delete this.errors[fieldName];

        // Required field validation
        if (field.hasAttribute('required') && !fieldValue) {
            this.setFieldError(field, this.getRequiredMessage(field));
            return false;
        }

        // Specific field validations
        if (fieldValue) {
            switch (fieldName) {
                case 'firstName':
                case 'lastName':
                    if (!this.validateName(fieldValue)) {
                        this.setFieldError(field, 'Please enter a valid name (letters only)');
                        return false;
                    }
                    break;

                case 'email':
                    if (!this.validateEmail(fieldValue)) {
                        this.setFieldError(field, 'Please enter a valid email address');
                        return false;
                    }
                    break;

                case 'phone':
                    if (fieldValue && !this.validatePhone(fieldValue)) {
                        this.setFieldError(field, 'Please enter a valid phone number');
                        return false;
                    }
                    break;

                case 'message':
                    if (fieldValue.length < 10) {
                        this.setFieldError(field, 'Message must be at least 10 characters long');
                        return false;
                    }
                    if (fieldValue.length > 1000) {
                        this.setFieldError(field, 'Message must be less than 1000 characters');
                        return false;
                    }
                    break;
            }
        }

        // Checkbox validation
        if (fieldType === 'checkbox' && field.hasAttribute('required') && !field.checked) {
            this.setFieldError(field, 'This field is required');
            return false;
        }

        // Clear error if validation passes
        this.clearFieldError(field);
        return true;
    }

    /**
     * Validate all form fields
     */
    validateForm() {
        const fields = this.form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    /**
     * Handle form submission
     */
    async handleSubmit() {
        const submitBtn = this.form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const formMessage = this.form.querySelector('#form-message');

        // Validate form
        if (!this.validateForm()) {
            this.showMessage('Please correct the errors below.', 'error');
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-flex';

        try {
            // Collect form data
            const formData = this.collectFormData();
            
            // Simulate form submission (replace with actual API call)
            await this.submitForm(formData);
            
            // Success
            this.showMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
            this.form.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showMessage('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    }

    /**
     * Collect form data
     */
    collectFormData() {
        const formData = new FormData(this.form);
        const data = {};

        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        // Add timestamp
        data.timestamp = new Date().toISOString();
        
        return data;
    }

    /**
     * Submit form data (simulate API call)
     */
    async submitForm(data) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // In a real application, you would send this data to your server
        console.log('Form submitted:', data);
        
        // For demonstration, we'll just log the data
        // Replace this with actual API call:
        /*
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return await response.json();
        */
    }

    /**
     * Set field error
     */
    setFieldError(field, message) {
        this.errors[field.name] = message;
        
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        field.classList.add('error');
        field.style.borderColor = '#dc2626';
    }

    /**
     * Clear field error
     */
    clearFieldError(field) {
        delete this.errors[field.name];
        
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        
        field.classList.remove('error');
        field.style.borderColor = '';
    }

    /**
     * Show form message
     */
    showMessage(message, type) {
        const messageElement = this.form.querySelector('#form-message');
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.className = `form-message ${type}`;
            messageElement.style.display = 'block';
            
            // Scroll to message
            messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Hide message after 5 seconds for success messages
            if (type === 'success') {
                setTimeout(() => {
                    messageElement.style.display = 'none';
                }, 5000);
            }
        }
    }

    /**
     * Get required field message
     */
    getRequiredMessage(field) {
        const fieldName = field.name;
        const messages = {
            firstName: 'First name is required',
            lastName: 'Last name is required',
            email: 'Email address is required',
            message: 'Message is required',
            terms: 'You must agree to the terms and conditions'
        };
        
        return messages[fieldName] || 'This field is required';
    }

    /**
     * Validation helper methods
     */
    validateName(name) {
        const nameRegex = /^[a-zA-Z\s\-']{2,50}$/;
        return nameRegex.test(name);
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePhone(phone) {
        // Remove all non-digit characters
        const cleanPhone = phone.replace(/\D/g, '');
        // Check if it's a valid length (10-15 digits)
        return cleanPhone.length >= 10 && cleanPhone.length <= 15;
    }
}

// Initialize form validation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FormValidator('contact-form');
});
