const cheerio = require("cheerio");
const mongoose = require("mongoose");
const config = require("./configuration.json");
const axios = require("axios");
const db = require('./_helpers/game_db');
const Game = db.Game;
mongoose.Promise = global.Promise;
process.env.UV_THREADPOOL_SIZE = 128;


    /*var event = mongoose.model('games', {

        gameStore: {
            type: [],
            required: true,
        },
        gameTitle: {
            type: String,
            required: true,
        },
        gamePrice: {
            type: [],
            required: true,
        },
        imageSrc: {
            type: String,
            required: true,
        },
        dataCategory: {
            type: String,
            required: true,
        },
        gameLink: {
            type: [],
            required: true,
		},
		description: {
			type: String,
			required: true,
		}
    });*/

	var eventList = [];
	var compare = false;
	var i = 0;
	var j = 0;


	function getGameRating (){
		return (Math.random() * (9.8 - 6.5) + 6.5).toFixed(1);
	}

	 function getGameDescription(link,title,price,src,lugar,category,proximamente){

		axios.get(`${link}`)
		.then((response) => {
			var $ = cheerio.load(response.data);

				if(lugar == "PcComponentes"){

					var blocks = $('#contenedor-principal');
					var desc = blocks.find('#ficha-producto-caracteristicas');
					var description = desc.text();

					var imageBlock = $('#contenedor-principal');
					var img = imageBlock.find('img.pc-com-zoom').attr("src");
					src = img.split("//").join("");

				}
				else if(lugar == "MediaMarkt"){

					var blocks = $('#descripci_C3_B3n');
					var desc = blocks.find('p');
					var description = desc.text();
				}
				else if(lugar == "ElCorteIngles"){
					var blocks = $('div.description-container');
					var desc = blocks.find('p.content');
					var description = desc.text();
				}

				else 
					description = "Este juego no tiene descripcion";
	
				description = description.split('Características:')[0];

				description = description.split('Más información en')[0];

				description = description.split('Comprar')[0];
				
				description = description.trimStart();

				if(description == '')
					description = "Este juego no tiene descripcion";

				if(price == '')
					price = "-";

				//if(description.length > 300)
				//description = description.substring(0, 300)  + "...";
				
				var price_ = []
				var lugar_ = []
				var link_ = []
				var gameRating = getGameRating();
				lugar_.push(lugar)
				price_.push(price)
				link_.push(link)
				for(var i=0;i < eventList.length;i++){
					for(var j=0; j< eventList[i]['gameStore'].length;j++){
						if(eventList[i]['gameStore'][j] != lugar && eventList[i]['dataCategory'] == category && title.toLowerCase().includes(eventList[i]['gameTitle'].toLowerCase()))	{
							eventList[i]['gamePrice'].push(price);
							eventList[i]['gameStore'].push(lugar);
							eventList[i]['gameLink'].push(link);
							compare = true;
							break;
						}
					}
				}
				if (compare == false){
					var temp = new Game({
						gameStore: lugar_,
						gameTitle: title,
						gamePrice: price_,
						imageSrc:  src,
						dataCategory: category,
						gameLink: link,
						description: description,
						gameRating: gameRating,
						proximamente: proximamente,
					});
					eventList.push(temp);
					i++;						
				}
				compare = false;
		})
		.catch(function (e) {
			console.log(e);
		})}


axios.get('https://www.pccomponentes.com/juegos-ps4')
.then((response) => {
	var $ = cheerio.load(response.data);

	var blocks = $('#articleListContent');

	var juego = blocks.find('div.col-xs-6');
	for (i = 0 ; i < juego.length;i++){
		var juegos = juego.find(`[data-loop=${i+1}]`);
		var title = juegos.attr('data-name');
		title = title.replace('PS4','');
		title = title.trimEnd();

		var price = juegos.attr("data-price");
		var src = juegos.find("div.tarjeta-articulo__foto>img").attr("src");
		src = src.split("//").join("");
		var category = juegos.attr("data-category");
		var link = juegos.find('header.tarjeta-articulo__nombre>h3>a').attr("href");
		link = `https://www.pccomponentes.com${link}`;
		
		// request a link y obtener la descripcion del juego
		var proximamente = 0;
		getGameDescription(link,title,price,src,"PcComponentes","PS4",proximamente);
		
	}
}).catch(function (e) {
	console.log(e);
})


axios.get('https://www.pccomponentes.com/listado/ajax?page=1&order=relevance&gtmTitle=Juegos%20PS4&idFamilies%5B%5D=1473')
.then((response) => {	
	
	var $ = cheerio.load(response.data);
	var blocks = $('div.row');

	var juego = blocks.find('div.col-xs-6');
	for (i = 0 ; i < juego.length;i++){
		var juegos = juego.find(`[data-loop=${i+1}]`);
		var title = juegos.attr('data-name');
		title = title.replace('PS4','');
		title = title.trimEnd();

		var price = juegos.attr("data-price");
		var src = juegos.find("div.tarjeta-articulo__foto>img").attr("src");
		src = src.split("//").join("");
		var category = juegos.attr("data-category");
		var link = juegos.find('header.tarjeta-articulo__nombre>h3>a').attr("href");
		link = `https://www.pccomponentes.com${link}`;

		// request a link y obtener la descripcion del juego
		var proximamente = 0;
		getGameDescription(link,title,price,src,"PcComponentes","PS4",proximamente);
	}
}).catch(function (e) {
	console.log(e);
})

axios.get('https://www.pccomponentes.com/listado/ajax?page=2&order=relevance&gtmTitle=Juegos%20PS4&idFamilies%5B%5D=1473')
.then((response) => {
		
	var $ = cheerio.load(response.data);
	var blocks = $('div.row');

	var juego = blocks.find('div.col-xs-6');
	for (i = 0 ; i < juego.length;i++){
		var juegos = juego.find(`[data-loop=${i+1}]`);
		var title = juegos.attr('data-name');
		title = title.replace('PS4','');
		title = title.trimEnd();

		var price = juegos.attr("data-price");
		var src = juegos.find("div.tarjeta-articulo__foto>img").attr("src");
		src = src.split("//").join("");
		var category = juegos.attr("data-category");
		var link = juegos.find('header.tarjeta-articulo__nombre>h3>a').attr("href");
		link = `https://www.pccomponentes.com${link}`;

		// request a link y obtener la descripcion del juego
		var proximamente = 0;
		getGameDescription(link,title,price,src,"PcComponentes","PS4",proximamente);
	}
}).catch(function (e) {
	console.log(e);
})


//Proximo lanzamiento
axios.get('https://www.pccomponentes.com/proximos-lanzamientos-videojuegos')
.then((response) => {
		
	var $ = cheerio.load(response.data);
	var blocks = $('div.row');

	var juego = blocks.find('div.col-xs-12 col-xl-9');
	for (i = 0 ; i < juego.length;i++){
		var juegos = juego.find(`[data-loop=${i+1}]`);
		var title = juegos.attr('data-name');
		title = title.replace('PS4','');
		title = title.trimEnd();

		var price = juegos.attr("data-price");
		var src = juegos.find("div.tarjeta-articulo__foto>img").attr("src");
		src = src.split("//").join("");
		var category = juegos.attr("data-category");
		var link = juegos.find('header.tarjeta-articulo__nombre>h3>a').attr("href");
		link = `https://www.pccomponentes.com${link}`;

		var proximamente = 1;

		if(category === "Juegos Nintendo Switch"){
			getGameDescription(link,title,price,src,"PcComponentes","Nintendo Switch", proximamente);

		}
		else if(category === "Juegos PS4"){
			getGameDescription(link,title,price,src,"PcComponentes","PS4", proximamente);
		}
		else if(category === "Juegos Xbox One"){
			getGameDescription(link,title,price,src,"PcComponentes","Xbox One", proximamente);
		}
		// request a link y obtener la descripcion del juego
	}
}).catch(function (e) {
	console.log(e);
})



axios.get('https://www.pccomponentes.com/juegos-xbox-one')
.then((response) => {

	var $ = cheerio.load(response.data);
	var blocks = $('#articleListContent');

	var juego = blocks.find('div.col-xs-6');
	for (i = 0 ; i < juego.length;i++){
		var juegos = juego.find(`[data-loop=${i+1}]`);
		var title = juegos.attr('data-name');
		title = title.replace('Xbox One','');
		title = title.trimEnd();

		var price = juegos.attr("data-price");
		var src = juegos.find("div.tarjeta-articulo__foto>img").attr("src");
		src = src.split("//").join("");
		var category = juegos.attr("data-category");
		var link = juegos.find('header.tarjeta-articulo__nombre>h3>a').attr("href");
		link = `https://www.pccomponentes.com${link}`;

		// request a link y obtener la descripcion del juego
		var proximamente = 0;
		getGameDescription(link,title,price,src,"PcComponentes","Xbox One",proximamente);
	    
    }
}).catch(function (e) {
	console.log(e);
})

axios.get('https://www.pccomponentes.com/listado/ajax?page=1&order=relevance&gtmTitle=Juegos%20Xbox%20One&idFamilies%5B%5D=1470')
.then((response) => {

	var $ = cheerio.load(response.data);
	var blocks = $('#articleListContent');

	var juego = blocks.find('div.col-xs-6');
	for (i = 0 ; i < juego.length;i++){
		var juegos = juego.find(`[data-loop=${i+1}]`);
		var title = juegos.attr('data-name');
		title = title.replace('Xbox One','');
		title = title.trimEnd();

		var price = juegos.attr("data-price");
		var src = juegos.find("div.tarjeta-articulo__foto>img").attr("src");
		src = src.split("//").join("");
		var category = juegos.attr("data-category");
		var link = juegos.find('header.tarjeta-articulo__nombre>h3>a').attr("href");
		link = `https://www.pccomponentes.com${link}`;

		// request a link y obtener la descripcion del juego
		var proximamente = 0;
		getGameDescription(link,title,price,src,"PcComponentes","Xbox One",proximamente);
	    
    }
}).catch(function (e) {
	console.log(e);
})


axios.get('https://www.pccomponentes.com/listado/ajax?page=2&order=relevance&gtmTitle=Juegos%20Xbox%20One&idFamilies%5B%5D=1470')
.then((response) => {

	var $ = cheerio.load(response.data);
	var blocks = $('#articleListContent');

	var juego = blocks.find('div.col-xs-6');
	for (i = 0 ; i < juego.length;i++){
		var juegos = juego.find(`[data-loop=${i+1}]`);
		var title = juegos.attr('data-name');
		title = title.replace('Xbox One','');
		title = title.trimEnd();

		var price = juegos.attr("data-price");
		var src = juegos.find("div.tarjeta-articulo__foto>img").attr("src");
		src = src.split("//").join("");
		var category = juegos.attr("data-category");
		var link = juegos.find('header.tarjeta-articulo__nombre>h3>a').attr("href");
		link = `https://www.pccomponentes.com${link}`;

		// request a link y obtener la descripcion del juego
		var proximamente = 0;
		getGameDescription(link,title,price,src,"PcComponentes","Xbox One",proximamente);
	    
    }
}).catch(function (e) {
	console.log(e);
})


axios.get('https://www.pccomponentes.com/juegos-nintendo-switch')
.then((response) => {

	var $ = cheerio.load(response.data);
	var blocks = $('#articleListContent');

	var juego = blocks.find('div.col-xs-6');
	for (i = 0 ; i < juego.length;i++){
		var juegos = juego.find(`[data-loop=${i+1}]`);
		var title = juegos.attr('data-name');
		title = title.replace('Nintendo Switch','');
		title = title.replace('Nintendo eShop','');
		title = title.trimEnd();

		var price = juegos.attr("data-price");
		var src = juegos.find("div.tarjeta-articulo__foto>img").attr("src");
		src = src.split("//").join("");
		var category = juegos.attr("data-category");
		var link = juegos.find('header.tarjeta-articulo__nombre>h3>a').attr("href");
		link = `https://www.pccomponentes.com${link}`;
		var proximamente = 0;
		getGameDescription(link,title,price,src,"PcComponentes","Nintendo Switch",proximamente);
	}
}).catch(function (e) {
	console.log(e);
})

axios.get('https://www.pccomponentes.com/listado/ajax?page=1&order=relevance&gtmTitle=Juegos%20Nintendo%20Switch&idFamilies%5B%5D=1597')
.then((response) => {

	var $ = cheerio.load(response.data);
	var blocks = $('#articleListContent');

	var juego = blocks.find('div.col-xs-6');
	for (i = 0 ; i < juego.length;i++){
		var juegos = juego.find(`[data-loop=${i+1}]`);
		var title = juegos.attr('data-name');
		title = title.replace('Nintendo Switch','');
		title = title.replace('Nintendo eShop','');
		title = title.trimEnd();

		var price = juegos.attr("data-price");
		var src = juegos.find("div.tarjeta-articulo__foto>img").attr("src");
		src = src.split("//").join("");
		var category = juegos.attr("data-category");
		var link = juegos.find('header.tarjeta-articulo__nombre>h3>a').attr("href");
		link = `https://www.pccomponentes.com${link}`;
		var proximamente = 0;
		getGameDescription(link,title,price,src,"PcComponentes","Nintendo Switch",proximamente);
	}
}).catch(function (e) {
console.log(e);
})

axios.get('https://www.pccomponentes.com/listado/ajax?page=2&order=relevance&gtmTitle=Juegos%20Nintendo%20Switch&idFamilies%5B%5D=1597')
.then((response) => {

	var $ = cheerio.load(response.data);
	var blocks = $('#articleListContent');

	var juego = blocks.find('div.col-xs-6');
	for (i = 0 ; i < juego.length;i++){
		var juegos = juego.find(`[data-loop=${i+1}]`);
		var title = juegos.attr('data-name');
		title = title.replace('Nintendo Switch','');
		title = title.replace('Nintendo eShop','');
		title = title.trimEnd();

		var price = juegos.attr("data-price");
		var src = juegos.find("div.tarjeta-articulo__foto>img").attr("src");
		src = src.split("//").join("");
		var category = juegos.attr("data-category");
		var link = juegos.find('header.tarjeta-articulo__nombre>h3>a').attr("href");
		link = `https://www.pccomponentes.com${link}`;
		var proximamente = 0;
		getGameDescription(link,title,price,src,"PcComponentes","Nintendo Switch",proximamente);
		}
}).catch(function (e) {
	console.log(e);
})

///////Segunda pagina -Media Markt


axios.get('https://www.mediamarkt.es/es/category/_juegos-ps4-702297.html')
.then((response) => {

	var $ = cheerio.load(response.data);
    var blocks = $('ul.products-list');

	$('ul.products-list').each((i, ul) => {
  		const children = $(ul).find('div.product-wrapper');
		children.each((i,div) => {
			var link = $(div).find('[class="photo clickable"]');
			linkk = link.attr("data-clickable-href");
			enlace = `https://www.mediamarkt.es${linkk}`;

			var src = link.find('img');
			source = src.attr("data-original");
			src = source.split("//").join("");
			var title = link.find('img');
			var tit = title.attr("alt");
			title = tit.replace('PS4','');
			title = title.replace('Juego','');
			title = title.replace('-','');
			title = title.trimStart();

			var price = $(div).find('[class="price small"]').text();
			var proximamente = 0;
			getGameDescription(enlace,title,price,src,"MediaMarkt","PS4",proximamente);

		})
	});
}).catch(function (e) {
	console.log(e);
})

axios.get('https://www.mediamarkt.es/es/category/_juegos-ps4-702297.html?searchParams=&sort=&view=PRODUCTLIST&page=2')
.then((response) => {
	var $ = cheerio.load(response.data);
    var blocks = $('ul.products-list');

	$('ul.products-list').each((i, ul) => {
  		const children = $(ul).find('div.product-wrapper');
		children.each((i,div) => {
			var link = $(div).find('[class="photo clickable"]');
			linkk = link.attr("data-clickable-href");
			enlace = `https://www.mediamarkt.es${linkk}`;

			var src = link.find('img');
			source = src.attr("data-original");
			src = source.split("//").join("");
			var title = link.find('img');
			var tit = title.attr("alt");
			title = tit.replace('PS4','');
			title = title.replace('Juego','');
			title = title.replace('-','');
			title = title.trimStart();

			var price = $(div).find('[class="price small"]').text();
			var proximamente = 0;
			getGameDescription(enlace,title,price,src,"MediaMarkt","PS4",proximamente);
		})
	});
}).catch(function (e) {
	console.log(e);
})



axios.get('https://www.mediamarkt.es/es/category/_juegos-ps4-702297.html?searchParams=&sort=&view=PRODUCTLIST&page=3')
.then((response) => {
	var $ = cheerio.load(response.data);
    var blocks = $('ul.products-list');

	$('ul.products-list').each((i, ul) => {
  		const children = $(ul).find('div.product-wrapper');
		children.each((i,div) => {
			var link = $(div).find('[class="photo clickable"]');
			linkk = link.attr("data-clickable-href");
			enlace = `https://www.mediamarkt.es${linkk}`;

			var src = link.find('img');
			source = src.attr("data-original");
			src = source.split("//").join("");
			var title = link.find('img');
			var tit = title.attr("alt");
			title = tit.replace('PS4','');
			title = title.replace('Juego','');
			title = title.replace('-','');
			title = title.trimStart();

			var price = $(div).find('[class="price small"]').text();
			var proximamente = 0;
			getGameDescription(enlace,title,price,src,"MediaMarkt","PS4",proximamente);
		})
	});
}).catch(function (e) {
	console.log(e);
})

axios.get('https://www.mediamarkt.es/es/category/_juegos-ps4-702297.html?searchParams=&sort=&view=PRODUCTLIST&page=4')
.then((response) => {

	var $ = cheerio.load(response.data);
    var blocks = $('ul.products-list');

	$('ul.products-list').each((i, ul) => {
  		const children = $(ul).find('div.product-wrapper');
		children.each((i,div) => {
			var link = $(div).find('[class="photo clickable"]');
			linkk = link.attr("data-clickable-href");
			enlace = `https://www.mediamarkt.es${linkk}`;

			var src = link.find('img');
			source = src.attr("data-original");
			src = source.split("//").join("");
			var title = link.find('img');
			var tit = title.attr("alt");
			title = tit.replace('PS4','');
			title = title.replace('Juego','');
			title = title.replace('-','');
			title = title.trimStart();

			var price = $(div).find('[class="price small"]').text();
			var proximamente = 0;
			getGameDescription(enlace,title,price,src,"MediaMarkt","PS4",proximamente);
			
		})
	});
}).catch(function (e) {
	console.log(e);
})


// proximamente

axios.get('https://www.mediamarkt.es/es/category/_pr%C3%B3ximos-lanzamientos-ps4-702283.html')
.then((response) => {

	var $ = cheerio.load(response.data);
    var blocks = $('ul.products-list');

	$('ul.products-list').each((i, ul) => {
  		const children = $(ul).find('div.product-wrapper');
		children.each((i,div) => {
			var link = $(div).find('[class="photo clickable"]');
			linkk = link.attr("data-clickable-href");
			enlace = `https://www.mediamarkt.es${linkk}`;

			var src = link.find('img');
			source = src.attr("data-original");
			src = source.split("//").join("");
			var title = link.find('img');
			var tit = title.attr("alt");
			title = tit.replace('PS4','');
			title = title.replace('Juego','');
			title = title.replace('-','');
			title = title.trimStart();

			var price = $(div).find('[class="price small"]').text();

			var proximamente = 1;

			getGameDescription(enlace,title,price,src,"MediaMarkt","PS4",proximamente);
			
		})
	});
}).catch(function (e) {
	console.log(e);
})


// MediaMarkt xbox one

axios.get('https://www.mediamarkt.es/es/category/_juegos-xbox-one-702301.html')
.then((response) => {

	var $ = cheerio.load(response.data);
	var blocks = $('ul.products-list');

	$('ul.products-list').each((i, ul) => {
		const children = $(ul).find('div.product-wrapper');
		children.each((i,div) => {
			var link = $(div).find('[class="photo clickable"]');
			linkk = link.attr("data-clickable-href");
			enlace = `https://www.mediamarkt.es${linkk}`;

			var src = link.find('img');
			source = src.attr("data-original");
			src = source.split("//").join("");
			var title = link.find('img');
			var tit = title.attr("alt");
			title = tit.replace('Xbox One','');
			title = title.replace('Juego','');
			title = title.replace('-','');
			title = title.trimStart();

			var price = $(div).find('[class="price small"]').text();
			var proximamente = 0;
			getGameDescription(enlace,title,price,src,"MediaMarkt","Xbox One",proximamente);
	})
});
}).catch(function (e) {
	console.log(e);
})

axios.get('https://www.mediamarkt.es/es/category/_juegos-xbox-one-702301.html?searchParams=&sort=&view=PRODUCTLIST&page=2')
.then((response) => {
	var $ = cheerio.load(response.data);
	var blocks = $('ul.products-list');

	$('ul.products-list').each((i, ul) => {
		const children = $(ul).find('div.product-wrapper');
		children.each((i,div) => {
			var link = $(div).find('[class="photo clickable"]');
			linkk = link.attr("data-clickable-href");
			enlace = `https://www.mediamarkt.es${linkk}`;

			var src = link.find('img');
			source = src.attr("data-original");
			src = source.split("//").join("");
			var title = link.find('img');
			var tit = title.attr("alt");
			title = tit.replace('Xbox One','');
			title = title.replace('Juego','');
			title = title.replace('-','');
			title = title.trimStart();

			var price = $(div).find('[class="price small"]').text();
			var proximamente = 0;
			getGameDescription(enlace,title,price,src,"MediaMarkt","Xbox One",proximamente);

	})
});
}).catch(function (e) {
	console.log(e);
})

axios.get('https://www.mediamarkt.es/es/category/_juegos-xbox-one-702301.html?searchParams=&sort=&view=PRODUCTLIST&page=3')
.then((response) => {

	var $ = cheerio.load(response.data);
	var blocks = $('ul.products-list');

	$('ul.products-list').each((i, ul) => {
		const children = $(ul).find('div.product-wrapper');
		children.each((i,div) => {
			var link = $(div).find('[class="photo clickable"]');
			linkk = link.attr("data-clickable-href");
			enlace = `https://www.mediamarkt.es${linkk}`;

			var src = link.find('img');
			source = src.attr("data-original");
			src = source.split("//").join("");
			var title = link.find('img');
			var tit = title.attr("alt");
			title = tit.replace('Xbox One','');
			title = title.replace('Juego','');
			title = title.replace('-','');
			title = title.trimStart();

			var price = $(div).find('[class="price small"]').text();
			var proximamente = 0;
			getGameDescription(enlace,title,price,src,"MediaMarkt","Xbox One",proximamente);
	})
});
}).catch(function (e) {
	console.log(e);
})


axios.get('https://www.mediamarkt.es/es/category/_juegos-xbox-one-702301.html?searchParams=&sort=&view=PRODUCTLIST&page=4')
.then((response) => {

	var $ = cheerio.load(response.data);
	var blocks = $('ul.products-list');

	$('ul.products-list').each((i, ul) => {
		const children = $(ul).find('div.product-wrapper');
		children.each((i,div) => {
			var link = $(div).find('[class="photo clickable"]');
			linkk = link.attr("data-clickable-href");
			enlace = `https://www.mediamarkt.es${linkk}`;

			var src = link.find('img');
			source = src.attr("data-original");
			src = source.split("//").join("");
			var title = link.find('img');
			var tit = title.attr("alt");
			title = tit.replace('Xbox One','');
			title = title.replace('Juego','');
			title = title.replace('-','');
			title = title.trimStart();

			var price = $(div).find('[class="price small"]').text();
			var proximamente = 0;
			getGameDescription(enlace,title,price,src,"MediaMarkt","Xbox One",proximamente);

	})
});
}).catch(function (e) {
	console.log(e);
})



// proximamente
axios.get('https://www.mediamarkt.es/es/category/_pr%C3%B3ximos-lanzamientos-xbox-one-702285.html')
.then((response) => {

	var $ = cheerio.load(response.data);
	var blocks = $('ul.products-list');

	$('ul.products-list').each((i, ul) => {
		const children = $(ul).find('div.product-wrapper');
		children.each((i,div) => {
			var link = $(div).find('[class="photo clickable"]');
			linkk = link.attr("data-clickable-href");
			enlace = `https://www.mediamarkt.es${linkk}`;

			var src = link.find('img');
			source = src.attr("data-original");
			src = source.split("//").join("");
			var title = link.find('img');
			var tit = title.attr("alt");
			title = tit.replace('Xbox One','');
			title = title.replace('Juego','');
			title = title.replace('-','');
			title = title.trimStart();

			var price = $(div).find('[class="price small"]').text();

			var proximamente = 1;

			getGameDescription(enlace,title,price,src,"MediaMarkt","Xbox One", proximamente);

	})
});
}).catch(function (e) {
	console.log(e);
})


// Mediamarkt - nintendo switch

axios.get('https://www.mediamarkt.es/es/category/_juegos-nintendo-switch-702299.html')
.then((response) => {

	var $ = cheerio.load(response.data);
	var blocks = $('ul.products-list');

	$('ul.products-list').each((i, ul) => {
		const children = $(ul).find('div.product-wrapper');
		children.each((i,div) => {
			var link = $(div).find('[class="photo clickable"]');
			linkk = link.attr("data-clickable-href");
			enlace = `https://www.mediamarkt.es${linkk}`;

			var src = link.find('img');
			source = src.attr("data-original");
			src = source.split("//").join("");
			var title = link.find('img');
			var tit = title.attr("alt");
			title = tit.replace('Nintendo Switch','');
			title = title.replace('Nintendo eShop','');
			title = title.replace('Juego','');
			title = title.replace('-','');
			title = title.trimStart();
			title = title.trimEnd();

			var price = $(div).find('[class="price small"]').text();
			
			
			if(price == '')
				price = '-';
			var proximamente = 0;
			getGameDescription(enlace,title,price,src,"MediaMarkt","Nintendo Switch",proximamente);

	})
});
}).catch(function (e) {
	console.log(e);
})

axios.get('https://www.mediamarkt.es/es/category/_juegos-nintendo-switch-702299.html?searchParams=&sort=&view=PRODUCTLIST&page=2')
.then((response) => {

	var $ = cheerio.load(response.data);
	var blocks = $('ul.products-list');

	$('ul.products-list').each((i, ul) => {
		const children = $(ul).find('div.product-wrapper');
		children.each((i,div) => {
			var link = $(div).find('[class="photo clickable"]');
			linkk = link.attr("data-clickable-href");
			enlace = `https://www.mediamarkt.es${linkk}`;

			var src = link.find('img');
			source = src.attr("data-original");
			src = source.split("//").join("");
			var title = link.find('img');
			var tit = title.attr("alt");
			title = tit.replace('Nintendo Switch','');
			title = title.replace('Nintendo eShop','');
			title = title.replace('Juego','');
			title = title.replace('-','');
			title = title.trimStart();
			title = title.trimEnd();

			var price = $(div).find('[class="price small"]').text();
			
			
			if(price == '')
				price = '-';
			
			var proximamente = 0;
			getGameDescription(enlace,title,price,src,"MediaMarkt","Nintendo Switch",proximamente);
	})
});
}).catch(function (e) {
	console.log(e);
})

axios.get('https://www.mediamarkt.es/es/category/_juegos-nintendo-switch-702299.html?searchParams=&sort=&view=PRODUCTLIST&page=3')
.then((response) => {

	var $ = cheerio.load(response.data);
	var blocks = $('ul.products-list');

	$('ul.products-list').each((i, ul) => {
		const children = $(ul).find('div.product-wrapper');
		children.each((i,div) => {
			var link = $(div).find('[class="photo clickable"]');
			linkk = link.attr("data-clickable-href");
			enlace = `https://www.mediamarkt.es${linkk}`;

			var src = link.find('img');
			source = src.attr("data-original");
			src = source.split("//").join("");
			var title = link.find('img');
			var tit = title.attr("alt");
			title = tit.replace('Nintendo Switch','');
			title = title.replace('Nintendo eShop','');
			title = title.replace('Juego','');
			title = title.replace('-','');
			title = title.trimStart();
			title = title.trimEnd();

			var price = $(div).find('[class="price small"]').text();
			
			if(price == '')
				price = '-';
			
			var proximamente = 0;
			getGameDescription(enlace,title,price,src,"MediaMarkt","Nintendo Switch",proximamente);
	})
});
}).catch(function (e) {
	console.log(e);
})

axios.get('https://www.mediamarkt.es/es/category/_juegos-nintendo-switch-702299.html?searchParams=&sort=&view=PRODUCTLIST&page=4')
.then((response) => {

	var $ = cheerio.load(response.data);
	var blocks = $('ul.products-list');

	$('ul.products-list').each((i, ul) => {
		const children = $(ul).find('div.product-wrapper');
		children.each((i,div) => {
			var link = $(div).find('[class="photo clickable"]');
			linkk = link.attr("data-clickable-href");
			enlace = `https://www.mediamarkt.es${linkk}`;

			var src = link.find('img');
			source = src.attr("data-original");
			src = source.split("//").join("");
			var title = link.find('img');
			var tit = title.attr("alt");
			title = tit.replace('Nintendo Switch','');
			title = title.replace('Nintendo eShop','');
			title = title.replace('Juego','');
			title = title.replace('-','');
			title = title.trimStart();
			title = title.trimEnd();

			var price = $(div).find('[class="price small"]').text();
			
			if(price == '')
				price = '-';
			var proximamente = 0;
			getGameDescription(enlace,title,price,src,"MediaMarkt","Nintendo Switch",proximamente);

	})
});
}).catch(function (e) {
	console.log(e);
})


// proximamente

axios.get('https://www.mediamarkt.es/es/category/_pr%C3%B3ximos-lanzamientos-nintendo-switch-702284.html')
.then((response) => {

	var $ = cheerio.load(response.data);
	var blocks = $('ul.products-list');

	$('ul.products-list').each((i, ul) => {
		const children = $(ul).find('div.product-wrapper');
		children.each((i,div) => {
			var link = $(div).find('[class="photo clickable"]');
			linkk = link.attr("data-clickable-href");
			enlace = `https://www.mediamarkt.es${linkk}`;

			var src = link.find('img');
			source = src.attr("data-original");
			src = source.split("//").join("");
			var title = link.find('img');
			var tit = title.attr("alt");
			title = tit.replace('Nintendo Switch','');
			title = title.replace('Nintendo eShop','');
			title = title.replace('Juego','');
			title = title.replace('-','');
			title = title.trimStart();
			title = title.trimEnd();

			var price = $(div).find('[class="price small"]').text();
			
			if(price == '')
				price = '-';
			

			var proximamente = 1;
			getGameDescription(enlace,title,price,src,"MediaMarkt","Nintendo Switch",proximamente);

	})
});
}).catch(function (e) {
	console.log(e);
})


// Corte Ingles - ps4

axios.get('https://www.elcorteingles.es/videojuegos/ps4/juegos/?s=ps4')
.then((response) => {

	var $ = cheerio.load(response.data);
    var blocks = $('ul.product-list');

	$('ul.product-list').each((i, ul) => {
  		const children = $(ul).find('div.product-preview');
		
		children.each((i,div) => {
			var link = $(div).find('[class="event"]');
			linkk = link.attr("href");
			enlace = `https://elcorteingles.es${linkk}`;
			

			var src = link.find('img');
			source = src.attr("src");
			src = source.split("//").join("");

			var title = link.find('img');
			var tit = title.attr("title");
			title = tit.replace('PS4','');
			title = title.trimStart();

			var price = $(div).find('[class="product-price "]');
			//console.log(price.text());
			price = price.find('[class="current   sale"]').text();

			if(price == '')
				price = $(div).find('[class="product-price "]').text();
			var proximamente = 0;
			getGameDescription(enlace,title,price,src,"ElCorteIngles","PS4",proximamente);

		})
	});
}).catch(function (e) {
	console.log(e);
})


axios.get('https://www.elcorteingles.es/videojuegos/ps4/juegos/2/?s=ps4')
.then((response) => {

	var $ = cheerio.load(response.data);
	var blocks = $('ul.product-list');

	$('ul.product-list').each((i, ul) => {
			const children = $(ul).find('div.product-preview');
		
		children.each((i,div) => {
			var link = $(div).find('[class="event"]');
			linkk = link.attr("href");
			enlace = `https://elcorteingles.es${linkk}`;
			

			var src = link.find('img');
			source = src.attr("src");
			src = source.split("//").join("");

			var title = link.find('img');
			var tit = title.attr("title");
			title = tit.replace('PS4','');
			title = title.trimStart();

			var price = $(div).find('[class="product-price "]');
			//console.log(price.text());
			price = price.find('[class="current   sale"]').text();

			if(price == '')
				price = $(div).find('[class="product-price "]').text();
			var proximamente = 0;
			getGameDescription(enlace,title,price,src,"ElCorteIngles","PS4",proximamente);

		})
	});
}).catch(function (e) {
	console.log(e);
})
	

axios.get('https://www.elcorteingles.es/videojuegos/ps4/juegos/3/?s=ps4')
.then((response) => {

	var $ = cheerio.load(response.data);
	var blocks = $('ul.product-list');

	$('ul.product-list').each((i, ul) => {
			const children = $(ul).find('div.product-preview');
		
		children.each((i,div) => {
			var link = $(div).find('[class="event"]');
			linkk = link.attr("href");
			enlace = `https://elcorteingles.es${linkk}`;
			

			var src = link.find('img');
			source = src.attr("src");
			src = source.split("//").join("");

			var title = link.find('img');
			var tit = title.attr("title");
			title = tit.replace('PS4','');
			title = title.trimStart();

			var price = $(div).find('[class="product-price "]');
			//console.log(price.text());
			price = price.find('[class="current   sale"]').text();

			if(price == '')
				price = $(div).find('[class="product-price "]').text();
			var proximamente = 0;
			getGameDescription(enlace,title,price,src,"ElCorteIngles","PS4",proximamente);

		})
	});
}).catch(function (e) {
	console.log(e);
})


//proximamente

axios.get('https://www.elcorteingles.es/proximamente/videojuegos/ps4/?level=6')
.then((response) => {

	var $ = cheerio.load(response.data);
	var blocks = $('ul.product-list');

	$('ul.product-list').each((i, ul) => {
			const children = $(ul).find('div.product-preview');
		
		children.each((i,div) => {
			var link = $(div).find('[class="event"]');
			linkk = link.attr("href");
			enlace = `https://elcorteingles.es${linkk}`;
			

			var src = link.find('img');
			source = src.attr("src");
			src = source.split("//").join("");

			var title = link.find('img');
			var tit = title.attr("title");
			title = tit.replace('PS4','');
			title = title.trimStart();

			var price = $(div).find('[class="product-price "]');
			//console.log(price.text());
			price = price.find('[class="current   sale"]').text();

			if(price == '')
				price = $(div).find('[class="product-price "]').text();

			var proximamente = 1;
			getGameDescription(enlace,title,price,src,"ElCorteIngles","PS4",proximamente);

		})
	});
}).catch(function (e) {
	console.log(e);
})


// Elcorteingles - xbox one

axios.get('https://www.elcorteingles.es/videojuegos/xbox-one/juegos/')
.then((response) => {

	var $ = cheerio.load(response.data);
    var blocks = $('ul.product-list');

	$('ul.product-list').each((i, ul) => {
  		const children = $(ul).find('div.product-preview');
		
		children.each((i,div) => {
			var link = $(div).find('[class="event"]');
			linkk = link.attr("href");
			enlace = `https://elcorteingles.es${linkk}`;
			

			var src = link.find('img');
			source = src.attr("src");
			src = source.split("//").join("");

			var title = link.find('img');
			var tit = title.attr("title");
			title = tit.replace('Xbox One','');
			title = title.trimStart();

			var price = $(div).find('[class="product-price "]');
			//console.log(price.text());
			price = price.find('[class="current   sale"]').text();

			if(price == '')
				price = $(div).find('[class="product-price "]').text();
			var proximamente = 0;
			getGameDescription(enlace,title,price,src,"ElCorteIngles","Xbox One",proximamente);

		})
	});
}).catch(function (e) {
	console.log(e);
})


axios.get('https://www.elcorteingles.es/videojuegos/xbox-one/juegos/2/')
.then((response) => {	

	var $ = cheerio.load(response.data);
	var blocks = $('ul.product-list');

	$('ul.product-list').each((i, ul) => {
			const children = $(ul).find('div.product-preview');
		
		children.each((i,div) => {
			var link = $(div).find('[class="event"]');
			linkk = link.attr("href");
			enlace = `https://elcorteingles.es${linkk}`;
			

			var src = link.find('img');
			source = src.attr("src");
			src = source.split("//").join("");

			var title = link.find('img');
			var tit = title.attr("title");
			title = tit.replace('Xbox One','');
			title = title.trimStart();

			var price = $(div).find('[class="product-price "]');
			//console.log(price.text());
			price = price.find('[class="current   sale"]').text();

			if(price == '')
				price = $(div).find('[class="product-price "]').text();
			var proximamente = 0;
			getGameDescription(enlace,title,price,src,"ElCorteIngles","Xbox One",proximamente);

		})
		});
}).catch(function (e) {
	console.log(e);
})

axios.get('https://www.elcorteingles.es/videojuegos/xbox-one/juegos/3/')
.then((response) => {
	var $ = cheerio.load(response.data);
    var blocks = $('ul.product-list');

	$('ul.product-list').each((i, ul) => {
  		const children = $(ul).find('div.product-preview');
		
		children.each((i,div) => {
			var link = $(div).find('[class="event"]');
			linkk = link.attr("href");
			enlace = `https://elcorteingles.es${linkk}`;
			

			var src = link.find('img');
			source = src.attr("src");
			src = source.split("//").join("");

			var title = link.find('img');
			var tit = title.attr("title");
			title = tit.replace('Xbox One','');
			title = title.trimStart();

			var price = $(div).find('[class="product-price "]');
			//console.log(price.text());
			price = price.find('[class="current   sale"]').text();

			if(price == '')
				price = $(div).find('[class="product-price "]').text();
			var proximamente = 0;
			getGameDescription(enlace,title,price,src,"ElCorteIngles","Xbox One",proximamente);

		})
	});
}).catch(function (e) {
	console.log(e);
})

// proximamente
axios.get('https://www.elcorteingles.es/proximamente/videojuegos/xbox-one/?level=6')
.then((response) => {
	var $ = cheerio.load(response.data);
    var blocks = $('ul.product-list');

	$('ul.product-list').each((i, ul) => {
  		const children = $(ul).find('div.product-preview');
		
		children.each((i,div) => {
			var link = $(div).find('[class="event"]');
			linkk = link.attr("href");
			enlace = `https://elcorteingles.es${linkk}`;
			

			var src = link.find('img');
			source = src.attr("src");
			src = source.split("//").join("");

			var title = link.find('img');
			var tit = title.attr("title");
			title = tit.replace('Xbox One','');
			title = title.trimStart();

			var price = $(div).find('[class="product-price "]');
			//console.log(price.text());
			price = price.find('[class="current   sale"]').text();

			if(price == '')
				price = $(div).find('[class="product-price "]').text();
			
			var proximamente = 1;
			getGameDescription(enlace,title,price,src,"ElCorteIngles","Xbox One",proximamente);

		})
	});
}).catch(function (e) {
	console.log(e);
})



//elcorteingles - nintendo switch

axios.get('https://www.elcorteingles.es/videojuegos/nintendo-switch/?f=type_description::Videojuegos')
.then((response) => {

	var $ = cheerio.load(response.data);
    var blocks = $('ul.product-list');

	$('ul.product-list').each((i, ul) => {
  		const children = $(ul).find('div.product-preview');
		
		children.each((i,div) => {
			var link = $(div).find('[class="event"]');
			linkk = link.attr("href");
			enlace = `https://elcorteingles.es${linkk}`;
			
			var src = link.find('img');
			source = src.attr("src");
			src = source.split("//").join("");

			var title = link.find('img');
			var tit = title.attr("title");
			title = tit.replace('Nintendo Switch','');
			title = title.replace('Nintendo eShop','');
			title = title.trimStart();
			title = title.trimEnd();

			var price = $(div).find('[class="product-price "]');
			//console.log(price.text());
			price = price.find('[class="current   sale"]').text();

			if(price == '')
				price = $(div).find('[class="product-price "]').text();
			var proximamente = 0;
			getGameDescription(enlace,title,price,src,"ElCorteIngles","Nintendo Switch",proximamente);

		})
	});
}).catch(function (e) {
	console.log(e);
})

axios.get('https://www.elcorteingles.es/videojuegos/nintendo-switch/2/?f=type_description::Videojuegos')
.then((response) => {
	var $ = cheerio.load(response.data);
    var blocks = $('ul.product-list');

	$('ul.product-list').each((i, ul) => {
  		const children = $(ul).find('div.product-preview');
		
		children.each((i,div) => {
			var link = $(div).find('[class="event"]');
			linkk = link.attr("href");
			enlace = `https://elcorteingles.es${linkk}`;
			

			var src = link.find('img');
			source = src.attr("src");
			src = source.split("//").join("");

			var title = link.find('img');
			var tit = title.attr("title");
			title = tit.replace('Nintendo Switch','');
			title = title.replace('Nintendo eShop','');
			title = title.trimStart();
			title = title.trimEnd();

			var price = $(div).find('[class="product-price "]');
			//console.log(price.text());
			price = price.find('[class="current   sale"]').text();

			if(price == '')
				price = $(div).find('[class="product-price "]').text();
			var proximamente = 0;
			getGameDescription(enlace,title,price,src,"ElCorteIngles","Nintendo Switch",proximamente);

		})
	});
}).catch(function (e) {
	console.log(e);
})


axios.get('https://www.elcorteingles.es/videojuegos/nintendo-switch/3/?f=type_description::Videojuegos')
.then((response) => {
	var $ = cheerio.load(response.data);
    var blocks = $('ul.product-list');

	$('ul.product-list').each((i, ul) => {
  		const children = $(ul).find('div.product-preview');
		
		children.each((i,div) => {
			var link = $(div).find('[class="event"]');
			linkk = link.attr("href");
			enlace = `https://elcorteingles.es${linkk}`;
			

			var src = link.find('img');
			source = src.attr("src");
			src = source.split("//").join("");

			var title = link.find('img');
			var tit = title.attr("title");
			title = tit.replace('Nintendo Switch','');
			title = title.replace('Nintendo eShop','');
			title = title.trimStart();
			title = title.trimEnd();

			var price = $(div).find('[class="product-price "]');
			//console.log(price.text());
			price = price.find('[class="current   sale"]').text();

			if(price == '')
				price = $(div).find('[class="product-price "]').text();
			var proximamente = 0;
			getGameDescription(enlace,title,price,src,"ElCorteIngles","Nintendo Switch",proximamente);

		})
	});
}).catch(function (e) {
	console.log(e);
})


// proximamente

axios.get('https://www.elcorteingles.es/proximamente/videojuegos/nintendo-switch/?level=6')
.then((response) => {
	var $ = cheerio.load(response.data);
    var blocks = $('ul.product-list');

	$('ul.product-list').each((i, ul) => {
  		const children = $(ul).find('div.product-preview');
		
		children.each((i,div) => {
			var link = $(div).find('[class="event"]');
			linkk = link.attr("href");
			enlace = `https://elcorteingles.es${linkk}`;
			

			var src = link.find('img');
			source = src.attr("src");
			src = source.split("//").join("");

			var title = link.find('img');
			var tit = title.attr("title");
			title = tit.replace('Nintendo Switch','');
			title = title.replace('Nintendo eShop','');
			title = title.trimStart();
			title = title.trimEnd();

			var price = $(div).find('[class="product-price "]');
			//console.log(price.text());
			price = price.find('[class="current   sale"]').text();

			if(price == '')
				price = $(div).find('[class="product-price "]').text();
			
			var proximamente = 1;
			getGameDescription(enlace,title,price,src,"ElCorteIngles","Nintendo Switch",proximamente);

		})
	});
}).catch(function (e) {
	console.log(e);
})


setTimeout(function(){
	mongoose.connect(config.connectionString, { useCreateIndex: true, useNewUrlParser: true }).then(()=>{
		eventList.map((value)=>{value.save({})});
	  }).then((event)=>{
		console.log(event)
	  }).catch((e)=>{
	  console.log(e);
	  });
},150000);