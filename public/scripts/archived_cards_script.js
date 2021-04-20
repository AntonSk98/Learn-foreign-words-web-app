const unarchiveCard = cardId => {
    fetch(`/unarchive_card/${cardId}`)
        .then(resp => {
            if(resp.ok)
                triggerSuccessfulScenario()
            else
                triggerFailureScenario()
        })
        .catch(err => {
            triggerFailureScenario()
        })

}

const removeCard = cardId => {
    fetch(`/remove_card/${cardId}`)
        .then(resp => {
            if (resp.ok) {
                triggerSuccessfulScenario()
            } else {
                triggerFailureScenario()
            }
        })
        .catch(err => {
            triggerFailureScenario()
        })
}

const triggerSuccessfulScenario = () => {
    document.getElementById('notification-success').style.display = 'block'
    setTimeout(()=> window.location.reload(), 3000)
}

const triggerFailureScenario = () => {
    document.getElementById('notification-failure').style.display = 'block'
    setTimeout(() => document.getElementById('notification-failure').style.display = 'none', 3000)
}