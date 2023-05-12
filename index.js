const wrapper = document.querySelector('.wrapper')
const container = document.querySelector('.container ')
const search = document.querySelector('.search-box button')
const searchIcon = document.querySelector('.search-box button img')
const weatherBox = document.querySelector('.weather-box')
const weatherDetails = document.querySelector('.weather-details')
const error404 = document.querySelector('.not-found')
const input = document.querySelector('.search-box input')

const timeContainer = document.querySelector('.time-container')
const timesDiv = document.querySelector('.timesDiv')
const btnTime = document.querySelector('.btnTime')
const btnTime1 = document.querySelector('#btnTime1')
const btnTime2 = document.querySelector('#btnTime2')

// const mediaQuery = window.matchMedia('(min-width: 768px)')

// function handleTabletChange(m, e) {
//     if (m.matches) {
//         e.style.width = '155px'
//     }
// }

search.addEventListener( 'mouseover', () => {
  searchIcon.src = './svg/search1.svg'
  searchIcon.style.transition = 'fill 0.3s ease-in-out'
});
search.addEventListener( 'mouseout', () => {
  searchIcon.src = './svg/search.svg'
  searchIcon.style.transition = 'fill 0.3s ease-in-out'
});
input.addEventListener( 'keydown', (e) => {
    if (e.keyCode === 13) {
        search.click();
    }
})
search.addEventListener( 'click', () => {
    
    const city = document.querySelector('.search-box input').value

    if ( city === '' )
        return


    // const response = fetch(url);
    // const data = response.json();
    // console.log("data: ", data);
    //* ||

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&land=ua&units=metric&appid=49d7e42303a32fe7353bcf99def0e580`).then(response => response.json()).then(json => {
        
        console.log(json);

        if ( json.cod === '404' ) {
            container.style.height = '400px'
            weatherBox.style.display = 'none'
            weatherDetails.style.display = 'none'
            error404.style.display = 'block'
            error404.classList.add('fadeIn')
            // timeContainer.innerHTML = ''
            timeContainer.style.display = 'none'
            return;
        }

        error404.style.display = 'none'
        error404.classList.remove('fadeIn')

        const image = document.querySelector('.weather-box img')
        SwitchForImg(json.list[0].weather[0].main, image)

        CreatingInfo(json)

        weatherBox.style.display = ''
        weatherDetails.style.display = ''
        weatherBox.classList.add('fadeIn')
        weatherDetails.classList.add('fadeIn')
        container.style.height = '590px'

        timeContainer.style.display = 'flex'
        timeContainer.classList.add('fadeIn')
        timesDiv.innerHTML = ''
        btnTime.style.display = 'block'
        btnTime.classList.add('fadeIn')
        btnTime1.style.padding = '15px 15px'
        btnTime1.style.width = '280px'
        btnTime1.style.fontSize = '22px'
        btnTime2.style.padding = '15px 15px'
        btnTime2.style.width = '280px'
        btnTime2.style.fontSize = '22px'
        btnTime2.style.display = 'block'

        HardCode(json)
    })
})

function HardCode ( json ){

    btnTime1.addEventListener( 'click', () => {
        
        timesDiv.innerHTML = ''
        timeContainer.classList.add('fadeIn')
        timesDiv.classList.add('fadeIn')

        btnTime1.style.padding = '0px'
        btnTime1.style.display = 'none'
        btnTime2.style.display = 'block'
        btnTime2.style.padding = '15px'
        btnTime2.style.width = '125px'

        btnTime2.style.marginRight = '10px'

        btnTime2.style.fontSize = '14px'

        for ( let i = 1; i <= 7; i++ ){

            const timeUl =  document.createElement('ul')
            timeUl.className = 'timeUl'
            const timeLi = document.createElement('li')
            timeLi.className = 'timeLi'

            const timeSpan = document.createElement('span')
            const timeSpanDtTxt = new Date(json.list[i].dt_txt)
            timeSpan.innerHTML = timeSpanDtTxt.toLocaleTimeString([], { day:'2-digit', month: '2-digit', hour:'2-digit', minute: '2-digit' })
            timeLi.appendChild(timeSpan)

            const timeImg = document.createElement('img')
            SwitchForImg(json.list[i].weather[0].main, timeImg)
            timeLi.appendChild(timeImg)

            const timeTemp = document.createElement('p')
            timeTemp.innerHTML = `${parseInt(json.list[i].main.temp)}<span>°C</span>`
            timeLi.appendChild(timeTemp)

            const timeDescr = document.createElement('p')
            timeDescr.innerHTML = `${json.list[i].weather[0].description}`
            timeLi.appendChild(timeDescr)

            const timeHumid = document.createElement('p')
            timeHumid.innerHTML = `${json.list[i].main.humidity}%`
            timeLi.appendChild(timeHumid)

            timeUl.appendChild(timeLi)
            timesDiv.appendChild(timeUl)

            // animation for uls
            Promise.resolve().then(() => {
                timeUl.style.opacity = '0'
            }).then(() => {
                setTimeout(() => {
                    timeUl.style.display = 'block'
                    timeUl.classList.add('fadeIn')
                }, i * 100)
            })
        }
            timeContainer.appendChild(timesDiv)
    })

    btnTime2.addEventListener( 'click', () => {
        timesDiv.innerHTML = ''
        timeContainer.classList.add('fadeIn')
        timesDiv.classList.add('fadeIn')

        btnTime2.style.padding = '0px'
        btnTime2.style.display = 'none'
        btnTime1.style.marginTop = '0px'
        btnTime1.style.display = 'block'
        btnTime1.style.padding = '15px'
        btnTime1.style.width = '125px'

        btnTime1.style.marginRight = '10px'

        btnTime1.style.fontSize = '14px'

        for ( let i = 1; i <= json.list.length; i++ ){

            const timeUl =  document.createElement('ul')
            timeUl.className = 'timeUl'
            const timeLi = document.createElement('li')
            timeLi.className = 'timeLi'

            const timeSpan = document.createElement('span')
            const timeSpanDtTxtt = new Date(json.list[i].dt_txt)
            timeSpan.innerHTML = timeSpanDtTxtt.toLocaleTimeString([], { day:'2-digit', month: '2-digit', hour:'2-digit', minute: '2-digit' })
            timeLi.appendChild(timeSpan)

            const timeImg = document.createElement('img')
            SwitchForImg(json.list[i].weather[0].main, timeImg)
            timeLi.appendChild(timeImg)

            const timeTemp = document.createElement('p')
            timeTemp.innerHTML = `${parseInt(json.list[i].main.temp)}<span>°C</span>`
            timeLi.appendChild(timeTemp)

            const timeDescr = document.createElement('p')
            timeDescr.innerHTML = `${json.list[i].weather[0].description}`
            timeLi.appendChild(timeDescr)

            const timeHumid = document.createElement('p')
            timeHumid.innerHTML = `${json.list[i].main.humidity}%`
            timeLi.appendChild(timeHumid)

            timeUl.appendChild(timeLi)
            timesDiv.appendChild(timeUl)
            
            Promise.resolve().then(() => {
                timeUl.style.opacity = '0'
            }).then(() => {
                setTimeout(() => {
                    timeUl.style.display = 'block'
                    timeUl.classList.add('fadeIn')
                }, i * 35)
            })
        }
            timeContainer.appendChild(timesDiv)

        // const btnBack = document.createElement('button')
        // btnBack.className = 'btnBack'
        // btnBack.textContent = 'Back'
        //     // ← 
        // btnBack.addEventListener( 'click', () => {
        //     timeContainer.scrollTo({
        //         top: 0,
        //         left: 0,
        //         behavior:'smooth'
        //     })
        // })
        // timeContainer.appendChild(btnBack)
    })

}

function SwitchForImg ( json, image ){
    switch ( json ){
        case 'Clear':
            image.src = 'images/clear.png'
        break;
            
        case 'Rain':
            image.src = 'images/rain.png'
        break;

        case 'Snow':
            image.src = 'images/snow.png'
        break;

        case 'Clouds':
            image.src = 'images/clouds.png'
        break;

        case 'Haze':
            image.src = 'images/haze.png'
        break;

        default:
            image.src = ''
    }
}

function CreatingInfo( json ){
    const time = document.querySelector('.weather-box .time')
    const t = document.querySelector('.weather-box .t')
    const description= document.querySelector('.weather-box .description')
    const humidity = document.querySelector('.weather-details .humidity span')
    const wind = document.querySelector('.weather-details .wind span')

    const mainTimeFromDttxt = new Date()
    time.innerHTML = mainTimeFromDttxt.toLocaleTimeString([], { day:'2-digit', month: 'long', hour:'2-digit', minute: '2-digit' })

    t.innerHTML = `${parseInt(json.list[0].main.temp)}<span>°C</span>`
    description.innerHTML = `${json.list[0].weather[0].description}`
    humidity.innerHTML = `${json.list[0].main.humidity}%`
    wind.innerHTML = `${parseInt(json.list[0].wind.speed)} Km/h`
}


