// PHONE VALIDATOR
const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 \d{3} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'YOUR NUMBER IS VALID!'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = 'YOUR NUMBER IS NOT VALID'
        phoneResult.style.color = 'red'
    }
}

// TAB SLIDER

const tabContent = document.querySelectorAll('.tab_content_block')
const tabsParent = document.querySelector('.tab_content_items')
const tabs = document.querySelectorAll('.tab_content_item')

const hideTabContent = () => {
    tabContent.forEach((item) => {
        item.style.display = 'none'
    })
    tabs.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (i = 0) => {
    tabContent[i].style.display = 'block'
    tabs[i].classList.add('tab_content_item_active')
}

hideTabContent()
showTabContent()

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((item, i) => {
            if (event.target === item) {
                hideTabContent()
                showTabContent(i)
            }
        })
    }
}

// CONVERTER

// DRY - don`t repeat yourself
// KISS - keep it short and simple

const som = document.querySelector('#som');
const usd = document.querySelector('#usd');
const euro = document.querySelector('#euro'); // Добавляем элемент для евро

const converter = (element, target1, target2, isToUSD, isToEuro) => {
    element.oninput = () => {
        const request = new XMLHttpRequest();
        request.open("GET", "../data/converter.json");
        request.setRequestHeader("Content-type", "application/json");
        request.send();

        request.onload = () => {
            const response = JSON.parse(request.response);
            const inputAmount = parseFloat(element.value);

            if (!isNaN(inputAmount)) {
                if (isToUSD) {
                    target1.value = (inputAmount / response.usd).toFixed(2);
                } else if (isToEuro) {
                    target2.value = (inputAmount / response.euro).toFixed(2);
                } else {
                    target2.value = (inputAmount * response.euro).toFixed(2);
                }
            } else {
               
                target1.value = '';
                target2.value = '';
            }
        };
    };
};

converter(som, usd, euro, true, false); // SOM to USD
converter(usd, som, euro, false, false); // USD to SOM
converter(euro, som, usd, false, true); // EURO to SOM

// CARD SWITCHER

const card = document.querySelector('.card');
const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');
let count = 1;

const updateCard = (data) => {
    card.innerHTML = `
        <p>${data.title}</p>
        <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
        <span>${data.id}</span>
    `;
};

const fetchData = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(response => response.json())
        .then(data => updateCard(data))
        .catch(error => console.error('Error fetching data:', error));
};

const handlePrevClick = () => {
    count = count === 1 ? 200 : count - 1;
    fetchData(count);
};

const handleNextClick = () => {
    count = count === 200 ? 1 : count + 1;
    fetchData(count);
};

btnPrev.onclick = handlePrevClick;
btnNext.onclick = handleNextClick;

fetchData(count);

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error('Error fetching data:', error));


