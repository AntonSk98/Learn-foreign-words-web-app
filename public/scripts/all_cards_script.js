const hideShowTooltip = (value) => {
    const element = document.getElementsByClassName("tooltip")[value];
    const elementVisibility = window.getComputedStyle(element).visibility;
    elementVisibility === 'visible' ? element.style.visibility = 'hidden' : element.style.visibility = 'visible';
}