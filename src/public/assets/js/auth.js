
const register = async (e) => {
    e.preventDefault();

    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const passwordConfirm = document.querySelector('#passwordConfirm').value;
    const termsService = document.querySelector('#termsService').checked;
    
    if (!termsService) {
        createToast('error','Error','Please accept the terms and privacy policy');
        return;
    }

    const result = await fetch('/auth/register', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ username, email, password, passwordConfirm }),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await result.json();
    console.log(data);

    if (data.errors) {
        for (let error of data.errors)
            createToast('error','Error',error.message);
    } else if (data.user) {
        location.assign('/registersuccess');
    }
}

const login = async (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const result = await fetch('/auth/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await result.json();
    console.log(data);

    if (data.errors) {
        for (let error of data.errors)
            createToast('error','Error',error.message);
    } else if (data.user) {
        location.assign('/admin');
    }
}

const logout = async (e) => {
    e.preventDefault();

    const result = await fetch('/auth/logout', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({}),
        headers: { 'Content-Type': 'application/json' }
    });

    location.reload();
}

const verifyEmail = async (userId, code) => {
    const verifyEmailContainer = document.querySelector("#alertContainer");
    const spinnerDiv = document.createElement("div");
    spinnerDiv.setAttribute('class','spinner-border mt-5');
    const spinnerSpan = document.createElement("span");
    spinnerSpan.setAttribute('class','visually-hidden');
    spinnerSpan.innerHTML = 'Loading...';
    spinnerDiv.appendChild(spinnerSpan);
    verifyEmailContainer.appendChild(spinnerDiv);
   
    const result = await fetch('/auth/verifyEmail', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ userId, code }),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await result.json();
    console.log(data);
    
    if (data.errors) {
        for (let error of data.errors)
            createToast('error','Error',error.message);
    } else if (data.message == 'success') {
        const successDiv = document.createElement("div");
        successDiv.setAttribute('class','alert alert-success');
        successDiv.innerHTML = 'Successfully verified email. You can log in now!';
        verifyEmailContainer.appendChild(successDiv);
        createToast('success','Verified Email','Successfully verified email. You can log in now!');
    }
    spinnerDiv.style.display = 'none';
}

const resetPassword = async (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const result = await fetch('/auth/resetPassword', {
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
    } else if (data.message == 'success') {
        const alertContainer = document.querySelector("#alertContainer");
        alertContainer.innerHTML = '';
        const successDiv = document.createElement("div");
        successDiv.setAttribute('class','alert alert-success');
        successDiv.innerHTML = 'Successfully reset password. Check your mails!';
        alertContainer.appendChild(successDiv);
        createToast('success','Reset Password','Successfully reset password. Check your mails!');
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('userId') && searchParams.has('code')) {
        verifyEmail(searchParams.get('userId'), searchParams.get('code'));
    }
});


//document.getElementById("registerForm").addEventListener('submit', register);
//document.getElementById("loginForm").addEventListener('submit', register);
//document.getElementById("logoutForm").addEventListener('submit', register);
//document.getElementById("forgotPasswordForm").addEventListener('submit', register);

