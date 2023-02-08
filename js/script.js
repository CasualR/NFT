"use strict"
//  бургер
const iconMenu = document.querySelector('.header_burger');

if (iconMenu) {
    const menuBody = document.querySelector('.header_block');
    iconMenu.addEventListener("click", function () {
        document.body.classList.toggle('lock');
        iconMenu.classList.toggle('active');
        menuBody.classList.toggle('active');
    });
}

// Переход бэкграунда
function hoverOnRight() {
    document.getElementById("first").classList.add("active");
}
function hoverOffRight() {
    document.getElementById("first").classList.remove("active");
}


// Счётчик
window.addEventListener("load", windowLoad);


function windowLoad() {
    function digitsCountersInit(digitsCountersItems) {
        let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-digits_counter]");
        if (digitsCounters) {
            digitsCounters.forEach(digitsCounter => {
                digitsCountersAnimate(digitsCounter);
            });
        }
    }

    function digitsCountersAnimate(digitsCounter) {
        let startTimestamp = null;
        const duration = parseInt(digitsCounter.dataset.digitsCounter) ? parseInt(digitsCounter.dataset.digitsCounter) : 1300;
        const startValue = parseInt(digitsCounter.innerHTML);
        const startPosition = 0;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        
        window.requestAnimationFrame(step);
    }
    
    //    digitsCountersInit();


    let options = {
        threshold: 0.3
    }
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetElement = entry.target;
                const digitsCountersItems = targetElement.querySelectorAll("[data-digits_counter]");
                if (digitsCountersItems.length) {
                    digitsCountersInit(digitsCountersItems);
                }
                observer.unobserve(targetElement);
            }
        });
    }, options);

    let sections = document.querySelectorAll('.box_numbers_containers');
    if (sections.length) {
        sections.forEach(section => {
            observer.observe(section);
        });
    }
}



//  Лайк
const iconHeart = document.querySelectorAll('.swiper_heards');

if (iconHeart) {
    iconHeart.forEach(item => {
        item.addEventListener('click', selectHeart)
    })

    function selectHeart() {
        this.classList.toggle('active');
    }
}



// Таймер

const timer = document.querySelectorAll('.live_swiper_timer_container');

const timerFunction = (element) => {
    const hour = element.querySelector('.hour');
    const minutes = element.querySelector('.min');
    const seconds = element.querySelector('.sec');

    const end = new Date(Date.now() + 119.05e5);
    function time() {
        const diff = Math.floor((end - Date.now()) / 1000);
        // console.log(diff);
        const h = Math.floor(diff % (24 * 60 * 60) / (60 * 60));
        const m = Math.floor(diff % (60 * 60) / 60);
        const s = Math.floor(diff % 60);


        hour.textContent = leadingZero(h);
        minutes.textContent = leadingZero(m);
        seconds.textContent = leadingZero(s);
        requestAnimationFrame(time);
    }


    function leadingZero(n) {
        return n < 10 ? `0${n}` : n;
    }
    time();
};
// }

timer.forEach(element => timerFunction(element));




// Свайпер
const swiper_first = new Swiper('.live_swiper', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },

    slidesPerView: 2,

    spaceBetween: 50,

    grabCursor: true,

    breakpoints: {
        1221: {
            slidesPerView: 2.9,
        },
        800: {
            slidesPerView: 2,
        }
    }
   
});


const swiper_second = new Swiper('.popular_swiper', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },

    spaceBetween: 30,

    grabCursor: true,

    breakpoints: {
        1221: {
            slidesPerView: 2.9,
        },
        800: {
            slidesPerView: 2,
        }
    }
});

const swiper_third = new Swiper('.categories_swiper', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },

    slidesPerView: 3.4,

    

    grabCursor: true,

    breakpoints: {
        1221: {

            slidesPerView: 3.4,
        },
        1070: {
            spaceBetween: 90,
            slidesPerView: 3,
        },
        800: {
            slidesPerView: 2.5,
        }
    }
})

//    Скролл

    const scrollButton = document.querySelector('.main_header_button');

    scrollButton.addEventListener('click', setScrollIntoViewOptions);

    function setScrollIntoViewOptions(top) {
        const lessonSelected = document.querySelector('.live');
        const gotoBlock = lessonSelected.getBoundingClientRect().top + scrollY - document.querySelector('.header').offsetHeight + 60;
        
        window.scrollTo({
            top: gotoBlock,
            behavior: "smooth"
        });
    }


    // Гирлянда

    
   let light = document.querySelectorAll('.guide_element_image');
   light.forEach(function () {
        setTimeout(() => {
            let index = 0;
            setInterval(blocks => {
                light[index].classList.remove('active');
              index = (index + 1) % light.length;
              light[index].classList.add('active');
            }, 2500);  
        }, 1000);
    });
    


    // Проявление

    const animItems = document.querySelectorAll('.anim_items');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((window.pageYOffset > animItemOffset - animItemPoint) && window.pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('active');
            } else {
                if (!animItem.classList.contains('anim_no')) {
                animItem.classList.remove('active');
                }
            }
        }
        
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    animOnScroll();
}
    

