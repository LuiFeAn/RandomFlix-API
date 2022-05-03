const puppeteer = require("puppeteer");

class SeriesRepository{

    async findOne(email,password,perfil){

        //Efetua o Login
        const browser = await puppeteer.launch({headless:false});
        const login = await browser.newPage();

        await login.goto("http://netflix.com/login");

        const loginResult = await login.evaluate(async (email,password)=>{

                const emailinput =  document.querySelector("#id_userLoginId");
                const passwordinput = document.querySelector("#id_password");
                const buttoninput = document.querySelectorAll("button")[1];
                emailinput.value = email;
                passwordinput.value = password;
                buttoninput.form.submit();

                setInterval(() => {
                        const msg = document.querySelector(".ui-message-contents b");
                        console.log(msg);
                }, 10000);

        },email,password);

        console.log(loginResult);

        //Entra no Perfil
        const profilepage = await browser.newPage();
        await profilepage.goto("http://www.netflix.com/browse/my-list");
        const profileResult = await profilepage.evaluate((name)=>{
                const profiles = document.querySelectorAll(".profile-name");
                profiles.forEach(pf=>pf.innerHTML == name ? pf.click() : {error:"Perfil não encontrado!"});
        },perfil);

        if(profileResult != profileResult.error){
                console.log("Perfil Encontrado!");
        }else{
                return profileResult
        }

        const movies = await browser.newPage();
        await movies.goto("http://www.netflix.com/browse/my-list");
        const movieResult = await movies.evaluate(()=>{
                const imgs = document.querySelectorAll(".boxart-image");
                const links = document.querySelectorAll(".ptrack-content a");
                const img = [...imgs].map(({src})=>src);
                const link = [...links].map(({href})=>href);
                return {img:img,link:link};
        });

        if(movieResult.length > 0){
                return movieResult
        }else{
                return {error:"Nenhum filme/serie encontrado(s)!"}
        }

    }

}

module.exports = new SeriesRepository();