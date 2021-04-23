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

const showFailureNotification = () => {
    document.getElementById('notification-failure').style.display = 'block'
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
            showFailureNotification()
        })
        .catch(() => showFailureNotification())
}