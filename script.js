const themeBtn = document.getElementById('screen-mode-btn');


const darkMode = () => {
    const lightDarkIcon = document.querySelector('.screen-mode-icon');
    const lightModeIconURL = '/assets/light-mode-icon.svg';
    const darkModeIconURL = '/assets/dark-mode-icon.svg';
    const screenModeText = document.getElementById('screen-mode-name');
    const searchIcon = document.querySelector('.search-icon');
    const socialIcons = document.querySelectorAll('i');
    document.body.classList.toggle('darkmode');

    if (lightDarkIcon.style.filter === '' && searchIcon.style.filter === '') {
        lightDarkIcon.style.filter = '';
        searchIcon.style.filter = 'invert(1)';
        lightDarkIcon.src = lightModeIconURL;
        screenModeText.innerText = 'Light Mode';

        socialIcons.forEach((icon) => {
            icon.classList.toggle('social-icons')
        })
    } else {
        lightDarkIcon.style.filter = '';
        searchIcon.style.filter = '';
        lightDarkIcon.src = darkModeIconURL;
        screenModeText.innerText = 'Dark Mode';
    }

}

themeBtn.addEventListener('click', () => {
    darkMode();
})
