const sendTestEmail = async (e) => {
    e.preventDefault();
    const email = document.querySelector('#test_recipient_email').value;

    const result = await fetch('/auth/sendTestEmail', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await result.json();
    console.log(data);
    
    if (data.errors) {
        for (let error of data.errors)
            createToast('error','Error',error.message);
    } else if (data.testEmail) {
        createToast('success','Email sent to ' + data.testEmail);
    }
}