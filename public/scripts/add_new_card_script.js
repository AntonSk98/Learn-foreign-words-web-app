const changeColor = () => {
    const newRow = `
        <tr class="sticker">
            <td style="display: none;"><input type="hidden" class="add-new-card__sticker__input add-new-card__custom__input" name="id" placeholder="Type here a word"></td>
            <td><input type="text" class="add-new-card__sticker__input add-new-card__custom__input" name="word" placeholder="Type here a word"></td>
            <td><input type="text" class="add-new-card__sticker__input add-new-card__custom__input" name="translation" placeholder="Here goes the translation"></td>
            <td class="add-new-card__sticker__example"><input type="text" class="add-new-card__sticker__input add-new-card__custom__input" name="example" placeholder="Provide an example"></td>
            <td onclick="removeSticker(this)" class="manage-button">
                <div class="remove">
                    &#10006
                </div>
            </td>
        </tr>`
    const element = document.getElementsByClassName("sticker");
    const lastTrElementIndex = element.length - 1;
    element[lastTrElementIndex].insertAdjacentHTML('afterend', newRow);
}


let headers;
let body;

const submitCard = (newCard, card) => {
    const formElement = document.getElementById("submit_form");
    hideWarningNotification()
    constructBody(formElement, card);
    console.log(body)
    if (validatedSticker(formElement.id, formElement.word, formElement.translation, formElement.example)) {
        let url
        newCard ? url = '/add_new_card' : url = '/edit_card'
        fetchForm(url)
    } else {
        showWarningNotification();
    }
}

const validatedSticker = ((idSection, wordSection, translationSection, exampleSection) => {
    let isStickerValid = true;
    idSection = convertSectionToArray(idSection)
    wordSection = convertSectionToArray(wordSection)
    translationSection = convertSectionToArray(translationSection)
    exampleSection = convertSectionToArray(exampleSection)
    for (let i = 0; i<wordSection.length; i++) {
        if (!wordSection[i].value || !translationSection[i].value) {
            isStickerValid = false
            return;
        }
    }
    return isStickerValid;
})

const getRowsFromStickerField = ((idSection, wordSection, translationSection, exampleSection) => {
    const rows = []
    idSection = convertSectionToArray(idSection)
    console.log(idSection)
    wordSection = convertSectionToArray(wordSection)
    translationSection = convertSectionToArray(translationSection)
    exampleSection = convertSectionToArray(exampleSection)
    for (let i = 0; i<wordSection.length; i++) {
        if(wordSection[i].value && translationSection[i].value)
            rows.push({
                id: idSection[i].value || null,
                word: wordSection[i].value,
                translation: translationSection[i].value,
                example: exampleSection[i].value
            })
    }
    return rows;
})

const convertSectionToArray = (section) => {
    if (!section.length)
        return new Array(section)
    return section
}

const constructBody = (formElement, card) => {
    body = {
        id: card?.id,
        title: formElement.title.value,
        description: formElement.description.value,
        rows: getRowsFromStickerField(formElement.id, formElement.word, formElement.translation, formElement.example),
        createdAt: card?.createdAt,
        progress: card?.progress

    }
}

const showWarningNotification = () => {
    document.getElementById('notification').style.display = 'block';
}

const hideWarningNotification = () => {
    document.getElementById('notification').style.display = 'none';
}

const fetchForm = (url) => {
    headers = {'Content-Type': 'application/json'}
    fetch(url, {method: 'post', headers, body:  JSON.stringify(body)})
        .then(resp => {
            if (resp.ok) {
                document.getElementById('notification-success').style.display = 'block'
                setTimeout(() => {window.location.replace('/all_cards')}, 3000)
            } else {
                document.getElementById('notification-failure').style.display = 'block'
                setTimeout(() => document.getElementById('notification-failure').style.display = 'none', 3000)
            }
        })
        .catch(err => {
            document.getElementById('notification-failure').style.display = 'block'
            setTimeout(() => document.getElementById('notification-failure').style.display = 'none', 3000)
        })
}

const stillSubmitForm = (newCard) => {
    let url;
    hideWarningNotification()
    newCard ? url = '/add_new_card' : url = '/edit_card'
    fetchForm(url)
}

const removeSticker = (stickerTD) => {
   stickerTD.parentNode.remove()
}

const clearSticker = (stickerTd) => {
    Array.from(stickerTd.parentNode.getElementsByTagName("input")).forEach(input => input.value = '')
}