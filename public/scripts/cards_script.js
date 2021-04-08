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

const hideShowTooltip = (value) => {
    const element = document.getElementsByClassName("tooltip")[value];
    const elementVisibility = window.getComputedStyle(element).visibility;
    elementVisibility === 'visible' ? element.style.visibility = 'hidden' : element.style.visibility = 'visible';
}