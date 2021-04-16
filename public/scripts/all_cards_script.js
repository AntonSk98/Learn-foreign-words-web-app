const hideShowTooltip = (value) => {
    const element = document.getElementsByClassName("tooltip")[value];
    const elementVisibility = window.getComputedStyle(element).visibility;
    elementVisibility === 'visible' ? element.style.visibility = 'hidden' : element.style.visibility = 'visible';
}

const archiveCard = (cardId) => {
    fetch(`/archive_card/${cardId}`)
        .then(resp => {
            if (resp.ok) {
                showSuccessNotification()
                setTimeout(() => {window.location.reload()}, 3000)
            } else {
                showFailureNotification()
            }
                
        })
        .catch(err => {
            showFailureNotification()
        })
}

const removeCard = (cardId) => {
    fetch(`/remove_card/${cardId}`)
        .then(resp => {
            if (resp.ok) {
                showSuccessNotification()
                setTimeout(() => {window.location.reload()}, 3000)
            } else {
                showFailureNotification
            }
        })
        .catch(err => {
            showFailureNotification()
        })

}

const showSuccessNotification = () => {
    document.getElementById('notification-success').style.display = 'block'
}

const showFailureNotification = () => {
    document.getElementById('notification-failure').style.display = 'block'
    setTimeout(() => document.getElementById('notification-failure').style.display = 'none', 3000)
}