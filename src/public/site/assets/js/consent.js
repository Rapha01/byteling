


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
