// EmailJS configuration with your actual credentials
export const EMAILJS_CONFIG = {
  serviceId: "service_pp91qpn",
  templateId: "template_r699jld",
  publicKey: "fk_Cf3iPceK5Z32k_",
  contactTemplateId: "template_r699jld", // Using same template for now
}

// Initialize EmailJS
export const initEmailJS = () => {
  if (typeof window !== "undefined") {
    const emailjs = require("@emailjs/browser")
    emailjs.init(EMAILJS_CONFIG.publicKey)
    return emailjs
  }
  return null
}
