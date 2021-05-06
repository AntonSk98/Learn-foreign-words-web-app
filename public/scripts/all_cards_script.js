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

const importCard = (card) => {

    prepareTextFileToDownload(card)
    hideImportCardButton(card.id)
    
    setTimeout(() => hideDownloadButtonShowImport(card.id), 5000)
}

const hideDownloadButtonShowImport = cardId => {
    const importCardButton = document.getElementById(`import-card-${cardId}`) 
    const downlaodCardLink = document.getElementById(`download-card-${cardId}`)

    downlaodCardLink.style.display = 'none'
    importCardButton.style.display = 'block'
}

const hideImportCardButton = cardId => {
    document.getElementById(`import-card-${cardId}`).style.display = 'none'
}

const prepareTextFileToDownload = card => {
    const txtFile = new Blob([JSON.stringify(card, null, "\t")], {type: 'application/json'})
    const downlaodCardLink = document.getElementById(`download-card-${card.id}`)
    downlaodCardLink.href = URL.createObjectURL(txtFile)
    downlaodCardLink.download = `${card.title || 'noname_card'}.txt`
    downlaodCardLink.style.display = 'block'
}

const learnCard = cardId => {
    window.location.href = `/learn_card/${cardId}`
}