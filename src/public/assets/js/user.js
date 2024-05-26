const changePassword = async (e) => {
    e.preventDefault();
    const oldPassword = document.querySelector('#oldPassword').value;
    const newPassword = document.querySelector('#newPassword').value;
    const newPasswordConfirm = document.querySelector('#newPasswordConfirm').value;

    const result = await fetch('/user/changePassword', {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify({ oldPassword, newPassword, newPasswordConfirm }),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await result.json();
    console.log(data);

    if (data.errors) {
        for (let error of data.errors)
            createToast('error','Error',error.message);
    } else {
        createToast('success','Changed Password','Successfully changed password');
        document.querySelector('#oldPassword').value = '';
        document.querySelector('#newPassword').value = '';
        document.querySelector('#newPasswordConfirm').value = '';
    }
}