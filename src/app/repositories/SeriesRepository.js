const puppeteer = require("puppeteer");

//O data source é criado através do conceito de Web Screaping !
class SeriesRepository{

    async find(email,password,perfil){

        //Efetua o Login
        const browser = await puppeteer.launch({headless:false});
        const login = await browser.newPage();
        await login.goto("http://netflix.com/login");
        await login.evaluate(async (email,password)=>{
                const emailinput =  document.querySelector("#id_userLoginId");
                const passwordinput = document.querySelector("#id_password");
                const buttoninput = document.querySelectorAll("button")[1];
                emailinput.value = email;
                passwordinput.value = password;
                buttoninput.form.submit();
        },email,password);

        //Entra no Perfil
        const profilepage = await browser.newPage();
        await profilepage.goto("http://www.netflix.com/browse/my-list");
        await profilepage.evaluate((name)=>{
                const profiles = document.querySelectorAll(".profile-name");
                profiles.forEach(pf=>pf.innerHTML == name ? pf.click() : false);
        },perfil);

        const movies = await browser.newPage();
        await movies.goto("http://www.netflix.com/browse/my-list");
        const movieResult = await movies.evaluate(()=>{
                const imgs = document.querySelectorAll(".boxart-image");
                const links = document.querySelectorAll(".ptrack-content a");
                const img = [...imgs].map(({src})=>src);
                const link = [...links].map(({href})=>href);
                
                return {img,link};
        });

        return movieResult;

    }

}

module.exports = new SeriesRepository();