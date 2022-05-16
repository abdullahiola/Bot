const bot = require("puppeteer");
const fs =require("fs");
const useProxy = require("puppeteer-page-proxy")

let proxyUsername = "W7VAEQ4l";
let proxyPassword = "g0T2O8XDZblv";


async function getRandomItem(link){
  let data = await fs.readFileSync(link,'utf-8')
  let processedData = JSON.parse(data)
  let processedDataLength = processedData.length;
  let urlIndex = Math.floor(Math.random() * processedDataLength)
  let result = processedData[urlIndex]
  return result
}

async function getAllCookies (link){
  let data = await fs.readFileSync(link,'utf-8')
  let processedData = JSON.parse(data)
  return processedData
}


async function runAdsenseBot(){

  const botConfiguration={
    headless: false
  }

  let userAgent= await getRandomItem("assets/list-of-UAS.json")
  console.log(" we have picked a user agent :",userAgent)

  let url = await getRandomItem("assets/list-of-links.json")
  console.log('we have picked a link :', url)

  let proxy = await getRandomItem("assets/list-of-proxy.json")
  console.log("We have picked this proxy: ", proxy)

  const chromeBrowser = await bot.launch(botConfiguration) 

  let cookies = await getAllCookies('assets/list-of-cookies.json');
  console.log("the cookies are : " , cookies)

  try {

    const chromeBrowserPage = await chromeBrowser.newPage()
    await useProxy()
  
    await chromeBrowserPage.setUserAgent(userAgent)
    await chromeBrowserPage.setCookie(...cookies)
    

    await chromeBrowserPage.goto('https://whoer.net')

  } catch (e){

  } finally{
    setTimeout(function(){
      chromeBrowser.close()
      runAdsenseBot()
    },10000)
  }



}

// getRandomItem("assets/list-of-links.json")

runAdsenseBot();
