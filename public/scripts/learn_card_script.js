const goBack = () => {
    window.location.href = '/all_cards'
}

const improveCardProgress = cardId => {
    const url = `/improve_card_progress/${cardId}`
    fetchRequestImproveOrReduceCard(url)
}

const reduceCardProgress = cardId => {
    const url = `/reduce_card_progress/${cardId}`
    fetchRequestImproveOrReduceCard(url)
}

const showSuccessNotification = () => {
    document.getElementById('notification-success').style.display = 'block'
}

const showFailureNotification = (message) => {
    document.getElementById('notification-failure').style.display = 'block'
    document.getElementById('custom-message').innerText = message
    setTimeout(() => document.getElementById('notification-failure').style.display = 'none', 3000)
}

const fetchRequestImproveOrReduceCard = url => {
    fetch(url, {
        method: 'post'
    })
        .then(resp => {
            if (resp.ok) {
                showSuccessNotification()
                setTimeout(() => goBack(), 3000)
                return
            }
            resp.text().then(failureMessage => showFailureNotification(failureMessage))
        })
        .catch(() => showFailureNotification())
}