function createToast(type,title,message) {
    const toastDiv = document.createElement("div");
    toastDiv.setAttribute('class','toast');
    toastDiv.setAttribute('role','alert');
    toastDiv.setAttribute('aria-live','assertive');
    toastDiv.setAttribute('aria-atomic','true');

    const toastHeaderDiv = document.createElement("div");
    toastHeaderDiv.setAttribute('class','toast-header');
    const titleEl = document.createElement("strong");
    titleEl.innerHTML = title;
    titleEl.setAttribute('class','me-auto');
    toastHeaderDiv.appendChild(titleEl);
    const timeEl = document.createElement("small");
    timeEl.setAttribute('class','text-muted');
    timeEl.innerHTML = 'just now';
    toastHeaderDiv.appendChild(timeEl);
    const dismissEl = document.createElement("button");
    dismissEl.setAttribute('type','button');
    dismissEl.setAttribute('class','btn-close');
    dismissEl.setAttribute('data-bs-dismiss','toast');
    dismissEl.setAttribute('aria-label','Close');
    toastHeaderDiv.appendChild(dismissEl);
    toastDiv.appendChild(toastHeaderDiv);

    const toastBodyDiv = document.createElement("div");
    toastBodyDiv.setAttribute('class','toast-body');
    toastBodyDiv.innerHTML = message;
    toastDiv.appendChild(toastBodyDiv);

    let toastContainer = document.querySelector('#toastContainer');
    if (!toastContainer) {
        const toastContainerDiv = document.createElement("div");
        toastContainerDiv.setAttribute('class','toast-container position-fixed top-0 end-0 p-3');
        toastContainerDiv.setAttribute('id','toastContainer');
        document.querySelector('body').appendChild(toastContainerDiv);
    }

    document.querySelector('#toastContainer').appendChild(toastDiv);
    const toast = new bootstrap.Toast(toastDiv);
    toast.show();
}