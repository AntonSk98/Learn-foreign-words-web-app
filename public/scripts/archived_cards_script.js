const viewCard = card => {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
    document.getElementById('background').style.display = 'block'
    document.getElementById('card-view').style.display = 'block'
    const wordTitle = document.getElementById('word_title_id')
    const translationTitle = document.getElementById('translation_title_id')
    const cardViewStickeBody = document.getElementsByClassName('card-view-sticker-body')[0]
    if (card.rows.length) {
        card.rows.slice().reverse().forEach(row => {
            console.log({...row})
            wordTitle.insertAdjacentHTML('afterend', `<div class='clear-after-close'>${row.word}</div>`)
            translationTitle.insertAdjacentHTML('afterend', `<div class='clear-after-close'>${row.translation}</div>`)
        });
    } else {
        cardViewStickeBody.insertAdjacentHTML('afterend', "<div class='clear-after-close'>This card does not contain any word</div>")
    }
}

const closeView = () => {
    const body = document.getElementsByTagName('body')[0]
    body.style.overflow = 'auto'
    document.getElementById('background').style.display = 'none'
    document.getElementById('card-view').style.display = 'none'
    const clearAfterClose = Array.from(document.getElementsByClassName('clear-after-close'))
    clearAfterClose.forEach(element => {
        element.remove()
    })
}

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