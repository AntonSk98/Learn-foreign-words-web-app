const viewCard = card => {
    blockBodySetBackground()
    setViewCardContent(card)
}

const blockBodySetBackground = () => {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
    document.getElementById('background').style.display = 'block'
    document.getElementById('card-view').style.display = 'block'
}

const setViewCardContent = (card) => {

    const { cardViewTitle, cardViewDescription, wordTitle, translationTitle, cardViewStickerBody } = getViewCardElements()

    cardViewTitle.innerText = card.title || 'No title provided'
    cardViewDescription.innerText = card.description || 'No description provided'

    if (!card.rows.length) {
        cardViewStickerBody.insertAdjacentHTML('afterend', "<div class='clear-after-close'>This card does not contain any word</div>")
        return;
    }
    
    card.rows.slice().reverse().forEach(row => {
        console.log({...row})
        wordTitle.insertAdjacentHTML('afterend', `<div class='clear-after-close'>${row.word}</div>`)
        translationTitle.insertAdjacentHTML('afterend', `<div class='clear-after-close'>${row.translation}</div>`)
    });
}

const getViewCardElements = () => {
    return {
        cardViewTitle: document.getElementById('card-view-title'),
        cardViewDescription: document.getElementById('card-view-description'),
        wordTitle: document.getElementById('word_title_id'),
        translationTitle: document.getElementById('translation_title_id'),
        cardViewStickerBody: document.getElementsByClassName('card-view-sticker-body')[0]
    }
}

const closeView = () => {
    document.getElementsByTagName('body')[0].style.overflow = 'auto'
    document.getElementById('background').style.display = 'none'
    document.getElementById('card-view').style.display = 'none'
    Array.from(document.getElementsByClassName('clear-after-close'))
        .forEach(element => element.remove())
}