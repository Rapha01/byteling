
// Define dataLayer and the gtag function.
/*window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// Set default consent to 'denied' as a placeholder
// Determine actual values based on your own requirements
console.log('setting consent default');
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied'
});*/

const consentManager = {
  untickAllCheckboxes: () => {
    for (checkbox of document.querySelectorAll('.consentCheckbox'))
      if (checkbox.id != 'consent_necessary')
        checkbox.checked = false;
  },
  tickAllCheckboxes: () => {
    for (checkbox of document.querySelectorAll('.consentCheckbox'))
        checkbox.checked = true;
  },
  handleConsentSubmit: () => {
    console.log('handleConsentSubmit');
    gtag('consent', 'update', {
      'ad_storage': 'granted'
    });

  },
  showPopup: () => {
    console.log('showPopup');
    const consentModal = new bootstrap.Modal('#consentModal', {});
    consentModal.show();
  },
  getSettings: () => {
    console.log('getSettings');
    
    return null;
  } 
}

document.addEventListener("DOMContentLoaded", function(e) {
  if (consentManager.getSettings() == null)
    consentManager.showPopup();
});
