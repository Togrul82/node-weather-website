path = require('path')
express = require('express')
weather = require('./utils/weather')
hbs = require('hbs')

publicDirPath = path.join(__dirname,'../public')
viewPath = path.join(__dirname,'../templates/views')
partialsPath = path.join(__dirname,'../templates/partials')

app = express()

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirPath))



app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather page',
        name:'Turu'

    })
}) 

app.get('/about', (req, res)=>{
    res.render('about', {
        title:'About page',
        name:'Turu'
    })
}) 

app.get('/help', (req, res)=>{
    res.render('help',{
        title:'help page',
        message:'messag for all who visit help page!\n Good luck!:)',
        name:'Turu'
    })
})

app.get('/weather',(req,res)=>{
    loc = req.query.location
    search = req.query.search
    if(!loc && !search){
        return res.send({
            error:'you must provide location or search clue!'
        })
    }

    if(loc){
       return getWeatherByLocation(loc, (data)=>{
           res.send(data)
       }) 
    }
    
    if(search){
        return getWeatherBySearch(search, (data)=>{
            res.send(data)
        }) 
    }
   
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'404',
        message:'Help article not found',
        name:'Turu'

    })
})


app.get('*',(req, res)=>{
    res.render('404',{
        title:'404',
        message:'Page not found',
        name:'Turu'

    })
})


app.listen(3000, ()=>{
    console.log('Server is up!')
})


