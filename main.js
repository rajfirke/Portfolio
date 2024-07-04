const galleryImages = [
    {
    src: "./assets/gallery/image1.jpg",
    alt: "Thumbnail Image 1"
    },
    {
    src: "./assets/gallery/image2.jpg",
    alt: "Thumbnail Image 2"
    },
    {
    src: "./assets/gallery/image3.jpg",
    alt: "Thumbnail Image 3"
    }
];

// const weatherApiKey = "4682142db8636a971fdd71ad16715aa5";
// const weatherLink = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={APIkey}&units=metric`
//Certificate Generator , Twitter Sentiment Analysis, PDF summarization, News Article Scraping and Classification, SIH 2022, House Price Prediction



const products = [
    {
        title:"CertifyCraft: Certificate Generation Tool",
        skills: "HTML, CSS, Bootstrap, JavaScript, Django, Python",
        description: "As a committee member, I contributed to a web app that significantly accelerated certificate creation, enhanced user interface, and streamlined post-event processes",
        link: "https://github.com/rajfirke/Certificate_Generator",
        category: "SD",
        image: "./assets/products/img6.png"
    },
    {
        title:"SentimentSeek: Twitter Sentiment Analysis",
        skills: "Python, Scrapping, Sentiment Analysis, NLP",
        description: "This project showcases how to utilize the Nitter library to scrape tweets from Twitter, followed by sentiment analysis on the tweets using NLTK library's VADER sentiment analyzer.",
        link: "https://github.com/rajfirke/Twitter-Scrapping-and-Sentiment-Analysis",
        category: "ML",
        image: "./assets/products/img1.png"
    },
    {
        title:"PDF Precisifier: PDF Summarization",
        skills: "Python, LLM, Hugging-face, NLP",
        description: "This project aims to expedite the summarization of lengthy PDF documents, such as research papers or chapters, by providing an abstractive summary, thereby saving valuable time.",
        link: "https://github.com/rajfirke/PDF-Summary",
        category: "ML",
        image: "./assets/products/img2.png"
    },
    {
        title:"NewsNest: Article Scraping & Classification",
        skills: "Python, Web Scrapping, Classification",
        description: "This application conducts web scraping on the Economics Times website to gather news articles, subsequently employing text classification techniques to categorize them into distinct sections, using machine learning-based classification.",
        link: "https://github.com/rajfirke/News-article-scraping-and-classification",
        category: "ML",
        image: "./assets/products/img3.png"
    },
    {
        title:"Smart India Hackathon 2022",
        skills: "HTML, CSS, Python, NLP, MySQL, Flask, LLM ",
        description: "Participated in the Smart India Hackathon, leveraging NLP to align college syllabi with 33 ACM knowledge areas in Computer Engineering, while also devising a scoring system for thorough assessment using Semantic Similarity",
        link: "https://github.com/rajfirke/Smart-India-Hackathon-2022",
        category: "SD",
        image: "./assets/products/img4.png"
    },
    {
        title:"HomeWise: House Price Prediction",
        skills: "Python, Colab, Machine Learning",
        description: "I developed a project to forecast house prices in Pune by meticulously analyzing relevant features, ensuring only pertinent ones were selected, and subsequently employing machine learning models for accurate price predictions.",
        link: "https://github.com/rajfirke/House-price-prediction",
        category: "ML",
        image: "./assets/products/img5.png"
    }
]


// const products = [
//     {
//       title: "Certificate Generator",
//       author: "•	Developed a web app as a committee member to automate certificate creation after events. •	Designed a user-friendly interface enabling users to upload basic certificate images, enter list of participant/Winners names, and set printing coordinates for efficient certificate generation.  •	Streamlined event management by reducing the time and effort needed for certificate creation, enhancing the experience for both event organizers and participants.",
//       price: 49.9,
//       image: "./assets/products/img6.png"
//     },
//     {
//       title: "Twitter Scraping and Sentiment Analysis",
//       author: "Marie Anne",
//       price: 35,
//       image: "./assets/products/img1.png"
//     },
//     {
//       title: "PDF Summary",
//       author: "Jason Cobert",
//       price: 0,
//       image: "./assets/products/img2.png"
//     },
//     {
//       title: "News Article Scraping and Classification",
//       author: "John Doe",
//       price: 85.35,
//       image: "./assets/products/img3.png"
//     },
//     {
//       title: "Smart India Hackathon 2022",
//       author: "Pedro Paulo",
//       price: 0,
//       image: "./assets/products/img5.png"
//     },
//     {
//       title: "House Price Prediction",
//       author: "Ankit Patel",
//       price: 45,
//       image: "./assets/products/img4.png"
//     }
//   ]

console.log("gi");
// Navbar
function navbar(){
    // Navbar 
    document.querySelector("#open-nav-menu").addEventListener("click", function(){
        document.querySelector("header nav .wrapper").classList.add("nav-open");
    });

    document.querySelector("#close-nav-menu").addEventListener("click", function(){
        document.querySelector("header nav .wrapper").classList.remove("nav-open");
    });
}

// Temperature conversion function
// function calToF(temperature) {
//     const fahrenheit = (temperature * 9 / 5) + 32; 
//     return fahrenheit;
// }

// Landing Greeting and stuff
// function greeting(){
//     let localTime = new Date();
//     let currentHour = localTime.getHours();
//     let greetingText ;

//     if (currentHour < 4){
//         greetingText = "Good Night!";
//     }
//     else if (currentHour < 12) {
//         greetingText = "Good morning!";
//     } 
//     else if (currentHour <19) {
//         greetingText = "Good afternoon!";
//     }
//     else if (currentHour < 24) {
//         greetingText = "Good evening!";
//     } 
//     else {
//         greetingText = "Welcome!";
//     }
//     document.querySelector("#greeting").innerHTML = greetingText;
//     //////////// Greeting Section /////////
    
// }

//Weather
// function weatherHandler(){
//     navigator.geolocation.getCurrentPosition(function(position){
//         let latitude = position.coords.latitude;
//         let longitude = position.coords.longitude;
//         let url = weatherLink
//         .replace("{lat}", latitude)
//         .replace("{lon}", longitude)
//         .replace("{APIkey}", weatherApiKey) ;
//         fetch(url)
//           .then((response)=> response.json())
//           .then(data =>{
//             console.log(data);
//             const Condition = data.weather[0].main;
//             const Location = data.name;
//             const temperature = data.main.temp;
            
//             let weatherText = `The weather is ${Condition} in ${Location} and it's ${temperature.toFixed(1)}°C outside.`;
    
//         // Update greeting
        
    
//         // update temp
//         document.querySelector(".weather-group").addEventListener("click", function(e) {
//             if (e.target.id == "fahr") {
//                 let temperature1 = calToF(temperature); // Convert temperature to Fahrenheit
//                 weatherText = `The weather is ${Condition} in ${Location} and it's ${temperature1.toFixed(1)}°F outside.`;
//                 document.querySelector("p#weather").innerHTML = weatherText; // Update weather display
                
//             } else if (e.target.id == "celsius") {
//                 weatherText = `The weather is ${Condition} in ${Location} and it's ${temperature.toFixed(1)}°C outside.`;
//                 document.querySelector("p#weather").innerHTML = weatherText; // Update weather display
//             }
//         });
    
//         document.querySelector("p#weather").innerHTML = weatherText;
//           } );
//     }) ;
    
// }


//Clock times and intervals
// function clockHandler(){
//     setInterval(() => {
//         let localTimes = new Date();
//         document.querySelector("span[data-time=hours]").textContent = localTimes.getHours().toString().padStart(2,"0");
//         document.querySelector("span[data-time=minutes]").textContent = localTimes.getMinutes().toString().padStart(2,"0");
//         document.querySelector("span[data-time=seconds]").textContent = localTimes.getSeconds().toString().padStart(2,"0");
//     }, 1000);
// }

//Gallery 
// function galleryHandler(){
//     let mainImage = document.querySelector("#gallery > img");
//     let thumbnails = document.querySelector("#gallery .thumbnails");
//     mainImage.src = galleryImages[0].src;
//     mainImage.alt = galleryImages[0].alt;
//     //<img src="./assets/gallery/image1.jpg"
//     //alt="Thumbnail Image 1"
//     //data-array-index="0" data-selected="true">

//     galleryImages.forEach(function(image, index){
//         let thumb = document.createElement("img");
//         thumb.src = image.src;
//         thumb.alt = image.alt;
//         thumb.dataset.arrayIndex = index;
//         thumb.dataset.selected = index === 0 ? true : false;

//         thumb.addEventListener("click", function(e){
//             let selectedIndex = e.target.dataset.arrayIndex;
//             let selectedImage  = galleryImages[selectedIndex]
//             mainImage.src = selectedImage.src;
//             mainImage.alt= selectedImage.alt;

//             thumbnails.querySelectorAll("img").forEach(function(img){
//                 img.dataset.selected = false;
//             })
//             e.target.dataset.selected= true;
//         })

//         thumbnails.appendChild(thumb);

//     });
// }

//Product
function populateProducts(productList){
    let productsSection = document.querySelector(".products-area");
    productsSection.textContent = "";

    productList.forEach(function(product, index){
        // creating individual div for each img 
        let productElm = document.createElement("div");
        productElm.classList.add("product-item");

        // adding product img
        let productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.alt = "Image for" + product.title;

        //product details section:
        let productDetails = document.createElement("div");
        productDetails.classList.add("product-details");

            // creatung product title, author, price title and price
            let productTitle = document.createElement("h3");
            productTitle.classList.add("product-title");
            productTitle.textContent = product.title;

            let productAuth = document.createElement("p");
            productAuth.classList.add("product-author");
            productAuth.textContent = "Skills: " + product.skills;

            let priceTitle = document.createElement("p");
            priceTitle.classList.add("price-title");
            priceTitle.textContent = product.description;
            priceTitle.style.display = "none"; // Initially hide description



            let productPrice = document.createElement("button");
            productPrice.classList.add("product-price");
            productPrice.textContent = product.price ;

            let descButton = document.createElement("button");
            descButton.classList.add("desc-button");
            descButton.textContent = "See Description";
            descButton.addEventListener("click", function() {
                if (priceTitle.style.display === "none") {
                    priceTitle.style.display = "block";
                    productAuth.style.display = "none";
                } else {
                    priceTitle.style.display = "none";
                    productAuth.style.display = "block";
                }
            });

            let productLinkButton = document.createElement("a");
            productLinkButton.classList.add("product-link-button");
            productLinkButton.textContent = "Github Link";
            productLinkButton.href = product.link;
            productLinkButton.target = "_blank";
      


        // append product details
        productDetails.append(productTitle);
        productDetails.append(productAuth);
        productDetails.append(priceTitle);
        productDetails.append(descButton);
        productDetails.append(productPrice);
        productDetails.append(productLinkButton)


        //add all child elements
        productElm.append(productImage);
        productElm.append(productDetails);

        //add individual product to product section
        productsSection.append(productElm);
    });
}

function productHandler(){
   
    let freeProducts = products.filter( item => item.category == "ML");
    let paidProducts = products.filter( item =>  item.category == "SD" );

    populateProducts(products);

    document.querySelector(".products-filter label[for=all] span.product-amount").textContent= products.length;
    document.querySelector(".products-filter label[for=paid] span.product-amount").textContent= paidProducts.length;
    document.querySelector(".products-filter label[for=free] span.product-amount").textContent= freeProducts.length;

    let productsFilter = document.querySelector(".products-filter");
    productsFilter.addEventListener("click", function(e){
        console.log(e.target.id);
        if (e.target.id === "all"){
            populateProducts(products);
        }
        else if (e.target.id ===  "paid"){
            populateProducts(paidProducts);
        }
        else if (e.target.id === "free"){
            populateProducts(freeProducts);
        }
    })
}


// function footerHandler(){
//     let currentYear = new Date().getFullYear();
//     document.querySelector("footer").textContent= `C ${currentYear} - all right reserved`
// }

function activeNav(){
    
}

const detailsElements = document.querySelectorAll('details');

  detailsElements.forEach(details => {
    details.addEventListener('click', () => {
      detailsElements.forEach(d => {
        if (d !== details) {
          d.removeAttribute('open');
        }
      });
    });
  });

  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
    var navbar = document.getElementById("navigation");
    var skillsSection = document.getElementById("skills");
    var skillsSectionOffset = skillsSection.offsetTop;
    var navbarWidth = navbar.offsetWidth;
    var screenWidth = window.innerWidth;
  
    if ((document.body.scrollTop > skillsSectionOffset || document.documentElement.scrollTop > skillsSectionOffset) && 
        (document.body.scrollTop < skillsSectionOffset + skillsSection.offsetHeight || 
         document.documentElement.scrollTop < skillsSectionOffset + skillsSection.offsetHeight)) {
      navbar.style.position = "fixed";
      navbar.style.top = "10";
      navbar.style.left = "50%";
      navbar.style.transform = "translateX(-50%)";
    } else {
      navbar.style.position = "static";
      navbar.style.left = "auto";
      navbar.style.transform = "none";
    }
  }
  
  
  

// PAGE LAOD
navbar();
// greeting();
// weatherHandler()
// clockHandler();
// galleryHandler();
productHandler();
// footerHandler();
