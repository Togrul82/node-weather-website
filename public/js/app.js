console.log("cliet script loaded!")

const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const mes1 = document.querySelector('#mes1')
const mes2 = document.querySelector('#mes2')
const mes3 = document.querySelector('#mes3')
const mes4 = document.querySelector('#mes4')

weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault()
    const location = searchInput.value
    
    mes1.textContent = 'loading...'
    mes2.textContent = ''
    mes3.textContent = '' 
    mes4.textContent = '' 

    fetch('/weather?search=' + location).then((response)=>{
    response.json().then((data)=>{
      
        if(data.err_message){
            mes1.textContent = data.query
            mes2.textContent = data.err_message 
        }else{
            mes1.textContent = data.location.loc_name 
            mes2.textContent = 'Today is  ' + data.summary 
            mes3.textContent = 'temperature: ' + data.temperature
            mes4.textContent = 'wind speed: ' + data.windSpeed 
        }
    })
})

})



