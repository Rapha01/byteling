window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', consentManager.getSettings());

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
    newConsentState = {
      'functionality_storage': document.querySelector('#consent_necessary').checked ? 'granted' : 'denied',
      'personalization_storage': document.querySelector('#consent_necessary').checked ? 'granted' : 'denied',
      'security_storage': document.querySelector('#consent_necessary').checked ? 'granted' : 'denied',
      'ad_storage': document.querySelector('#consent_marketing').checked ? 'granted' : 'denied',
      'ad_user_data': document.querySelector('#consent_marketing').checked ? 'granted' : 'denied',
      'ad_personalization': document.querySelector('#consent_marketing').checked ? 'granted' : 'denied',
      'analytics_storage': document.querySelector('#consent_analytical').checked ? 'granted' : 'denied',
    };
    
    setCookie('consent', JSON.stringify(newConsentState), 180);
    gtag('consent', 'update', newConsentState);
  },
  showPopup: () => {
    const consentModal = new bootstrap.Modal('#consentModal', {});
    consentModal.show();
  },
  getSettings: () => {
    if (getCookie('consent') == '') {
      return {
        'functionality_storage': 'denied',
        'personalization_storage': 'denied',
        'security_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied'
      }
    } else {
      return JSON.parse(getCookie('consent'));
    } 
  }
}


document.addEventListener("DOMContentLoaded", function(e) {
  if (getCookie('consent') == '')
    consentManager.showPopup();
});
