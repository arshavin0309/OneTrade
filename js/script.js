document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        loop: true,
        slidesPerView: 1,
        spaceBetween: 60,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });

    // окно с предупреждением о куки
    function getCookie(name) {
        let matches = document.cookie.match(
            new RegExp(
                '(?:^|; )' +
                name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
                '=([^;]*)'
            )
        )
        return matches ? decodeURIComponent(matches[1]) : undefined
    }

    function setCookie(name, value, options = {}) {
        options = {
            path: '/',
            ...options,
        }

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString()
        }

        let updatedCookie =
            encodeURIComponent(name) + '=' + encodeURIComponent(value)

        for (let optionKey in options) {
            updatedCookie += '; ' + optionKey
            let optionValue = options[optionKey]
            if (optionValue !== true) {
                updatedCookie += '=' + optionValue
            }
        }

        document.cookie = updatedCookie
    }

    if (!getCookie('cookies')) {
        document.querySelector('.cookies').style = 'display: flex'
    }

    document.querySelector('.cookies .btn').addEventListener('click', () => {
        document.querySelector('.cookies').style = 'display: none'
        setCookie('cookies', 'true', { 'max-age': 3600 * 24 * 365 })
    })

    // плавная прокрутка до якоря
    const anchors = document.querySelectorAll('a[href*="#"]')

    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()

            const blockID = anchor.getAttribute('href').substr(1)

            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        })
    }

    let header = document.querySelector('header');
    let exitBtn = document.querySelector('header .exit');
    let menuItems = document.querySelectorAll('header .menu-item');

    document.querySelector('.burger').addEventListener('click', () => {
        header.classList.add('menu-active');
        document.querySelector('body').style = 'margin-top: 91px'
        exitBtn.style = 'display: block'

        exitBtn.addEventListener('click', () => {
            header.classList.remove('menu-active');
        document.querySelector('body').style = 'margin-top: 0'
            exitBtn.style = 'display: none'
        })
    });

    for (let i = 0; i < menuItems.length; i++) {
        menuItems[i].addEventListener('click', () => {
            header.classList.remove('menu-active');
        document.querySelector('body').style = 'margin-top: 0'
            exitBtn.style = 'display: none'
        });
    };
});