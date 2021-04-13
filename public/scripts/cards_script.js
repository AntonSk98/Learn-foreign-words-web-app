const changeColor = () => {
    const newRow = `
        <tr class="sticker">
            <td><input type="text" class="add-new-card__sticker__input add-new-card__custom__input" name="word" placeholder="Type here a word"></td>
            <td><input type="text" class="add-new-card__sticker__input add-new-card__custom__input" name="translation" placeholder="Here goes the translation"></td>
            <td class="add-new-card__sticker__example"><input type="text" class="add-new-card__sticker__input add-new-card__custom__input" name="example" placeholder="Provide an example"></td>
        </tr>`
    const element = document.getElementsByClassName("sticker");
    const lastTrElementIndex = element.length - 1;
    element[lastTrElementIndex].insertAdjacentHTML('afterend', newRow);
}


let url;
let headers;
let body;

const submitForm = () => {
    const formElement = document.getElementById("submit_form");
    hideWarningNotification()
    constructBody(formElement);
    if (validatedSticker(formElement.word, formElement.translation, formElement.example)) {
        fetchForm()
    } else {
        showWarningNotification();
    }
}

const validatedSticker = ((wordSection, translationSection, exampleSection) => {
    let isStickerValid = true;
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

const getRowsFromStickerField = ((wordSection, translationSection, exampleSection) => {
    const rows = []
    wordSection = convertSectionToArray(wordSection)
    translationSection = convertSectionToArray(translationSection)
    exampleSection = convertSectionToArray(exampleSection)
    for (let i = 0; i<wordSection.length; i++) {
        if(wordSection[i].value && translationSection[i].value)
            rows.push({
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

const constructBody = (formElement) => {
    body = {
        title: formElement.title.value,
        description: formElement.description.value,
        rows: getRowsFromStickerField(formElement.word, formElement.translation, formElement.example)
    }
}

const showWarningNotification = () => {
    document.getElementById('notification').style.display = 'block';
}

const hideWarningNotification = () => {
    document.getElementById('notification').style.display = 'none';
}

const fetchForm = () => {
    url = 'add_new_card'
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

const stulSubmitForm = () => {
    hideWarningNotification()
    fetchForm()
}

//shift it to all cards_script
const hideShowTooltip = (value) => {
    const element = document.getElementsByClassName("tooltip")[value];
    const elementVisibility = window.getComputedStyle(element).visibility;
    elementVisibility === 'visible' ? element.style.visibility = 'hidden' : element.style.visibility = 'visible';
}