// EmailJS Configuration
// Replace these values with your actual EmailJS credentials
export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'your_service_id',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'your_template_id',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key',
}

// Email template parameters mapping
export const EMAIL_TEMPLATE_PARAMS = {
  from_name: 'from_name',
  from_email: 'from_email',
  phone: 'phone',
  organisation: 'organisation',
  message: 'message',
  to_email: 'synergeektechnologies@gmail.com', // Your company email
}
