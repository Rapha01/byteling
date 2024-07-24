const sendContactForm = async (e) => {
    e.preventDefault();

    const name = document.querySelector('#contact_name');
    const email = document.querySelector('#contact_email');
    const phone = document.querySelector('#contact_phone');
    const message = document.querySelector('#contact_message');
    
    if (email.value != '' && !validateEmail(email.value)) {
        createToast('error','Error','Bitte eine korrekte Email angeben');
        return;
    }

    if (email.value == '' && phone.value == '') {
        createToast('error','Error','Bitte zumindest eine Art der Kontaktaufnahme (Email oder Telephon) angeben.');
        return;
    }

    const contactFormModal = new bootstrap.Modal('#contactFormModal', {});
    const contactFormSubmitText = document.querySelector('#contactFormSubmitText');
    const contactFormSubmitSpinner = document.querySelector('#contactFormSubmitSpinner');
    const contactFormSubmitButton = document.querySelector('#contactFormSubmitButton');
    contactFormSubmitSpinner.classList.remove("d-none");
    contactFormSubmitText.classList.add("d-none");
    contactFormSubmitButton.classList.add("disabled");

    const result = await fetch('/util/sendContactForm', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ name: name.value, email: email.value, phone: phone.value, message: message.value }),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await result.json();
    console.log(data);

    if (data.errors) {
        for (let error of data.errors)
            createToast('error','Error',error.message);
    } else if (data.data && data.data.sent == true) {
        contactFormModal.show();
        name.value = '';
        email.value = '';
        phone.value = '';
        message.value = '';
    }
    contactFormSubmitButton.classList.remove("disabled");
    contactFormSubmitSpinner.classList.add("d-none");
    contactFormSubmitText.classList.remove("d-none");
}

const subscribeNewsletter = async (e) => {
    e.preventDefault();

    const email = document.querySelector('#newsletter_email');
    if (!validateEmail(email.value)) {
        createToast('error','Error','Bitte eine korrekte Email angeben');
        return;
    }

    const newsletterFormModal = new bootstrap.Modal('#newsletterFormModal', {});
    const newsletterFormSubmitText = document.querySelector('#newsletterFormSubmitText');
    const newsletterFormSubmitSpinner = document.querySelector('#newsletterFormSubmitSpinner');
    const newsletterFormSubmitButton = document.querySelector('#newsletterFormSubmitButton');
    newsletterFormSubmitSpinner.classList.remove("d-none");
    newsletterFormSubmitText.classList.add("d-none");
    newsletterFormSubmitButton.classList.add("disabled");
    
    const result = await fetch('/util/subscribeNewsletter', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ email: email.value }),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await result.json();
    console.log(data);
    
    if (data.errors) {
        for (let error of data.errors)
            createToast('error','Error',error.message);
    } else if (data.data && data.data.sent == true) {
        newsletterFormModal.show();
        email.value = '';
    }

    newsletterFormSubmitButton.classList.remove("disabled");
    newsletterFormSubmitSpinner.classList.add("d-none");
    newsletterFormSubmitText.classList.remove("d-none");
}