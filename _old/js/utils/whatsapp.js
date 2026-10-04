// =============================================
// WHATSAPP URL BUILDER
// =============================================

function buildWhatsAppUrl(serviceType, formData, totalAmount) {
  if (typeof SITE_CONFIG === 'undefined') return '#';
  
  const phone = SITE_CONFIG.contact.whatsapp.replace('+', '');
  
  // Get service name
  let serviceName = '';
  if (typeof getServiceById === 'function') {
    const service = getServiceById(serviceType);
    serviceName = service ? service.name : serviceType;
  }
  
  // Build message
  let message = \`Salam! Cleanin Express saytından yazıram.\n\n\`;
  message += \`Xidmət: *\${serviceName}*\n\n\`;
  
  message += \`*Seçimlərim:*\n\`;
  for (const [key, value] of Object.entries(formData)) {
    if (value && value !== '0' && value !== 0 && value !== 'Seçilməyib') {
      message += \`- \${key}: \${value}\n\`;
    }
  }
  
  message += \`\n*Təxmini Qiymət:* \${totalAmount} AZN\n\n\`;
  message += \`Sifariş vermək və detalları dəqiqləşdirmək istəyirəm.\`;
  
  return \`https://wa.me/\${phone}?text=\${encodeURIComponent(message)}\`;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { buildWhatsAppUrl };
}
