// Required modules
const request = require ("request");
const cheerio = require ("cheerio");
const got = require("got");

//Scraping images
const pics = [];
const link = process.argv[2];

// Start the request
request(link, (req, res, body) =>  {
    if (!console.error() && res.statusCode === 200) {
        const $ = cheerio.load(body);
        $("img").each(function (){
            const img = $(this).attr("src");
            pics.push(img);
        });
        console.log(pics);
    }

});

// Scraping all web site links

  got(link)
    .then((response) => {
      const $ = cheerio.load(response.body);

      $("a").each((i, link) => {
        const { href } = link.attribs;
        console.log(href);
      });
    })
    .catch((err) => {
      console.log(err.response.body);
    });