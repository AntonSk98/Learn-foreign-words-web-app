const changeColor = () => {
    const newRow = `
        <tr>
            <td><input type="text" class="add-new-card__sticker__input add-new-card__custom__input" name="word" placeholder="Type here a word"></td>
            <td><input type="text" class="add-new-card__sticker__input add-new-card__custom__input" name="translation" placeholder="Here goes the translation"></td>
            <td class="add-new-card__sticker__example"><input type="text" class="add-new-card__sticker__input add-new-card__custom__input" name="example" placeholder="Provide an example"></td>
        </tr>`
    const element1 = document.getElementById("sticker").innerHTML += newRow;
}