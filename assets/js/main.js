/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

///dotenv 


(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#page-wrapper'),
		$banner = $('#banner'),
		$header = $('#header');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Mobile?
		if (browser.mobile)
			$body.addClass('is-mobile');
		else {

			breakpoints.on('>medium', function() {
				$body.removeClass('is-mobile');
			});

			breakpoints.on('<=medium', function() {
				$body.addClass('is-mobile');
			});

		}

	// Scrolly.
		$('.scrolly')
			.scrolly({
				speed: 1500,
				offset: $header.outerHeight()
			});

	// Menu.
		$('#menu')
			.append('<a href="#menu" class="close"></a>')
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight() + 1,
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

		

// youtube api
//make fetch request 
  
////.env

// require('dotenv').config()

// const api = process.env.API_KEY;


const api = 'AIzaSyB4wjjmuxMEbgKhAxJb9edpPmvovk_A6Og';
const output = document.querySelector('.output');
const searchTerm = document.querySelector('input');
 
searchTerm.setAttribute('value', 'Search');
 
const btnPrev = document.createElement('button');
btnPrev.setAttribute('disabled',true);
btnPrev.textContent = 'Prev';
document.body.appendChild(btnPrev);
const btnNext = document.createElement('button');
btnNext.setAttribute('disabled',true);
btnNext.textContent = 'Next';
document.body.appendChild(btnNext);
const btns = document.querySelectorAll('button');
btns.forEach(function(btn){
    btn.addEventListener('click', ySearch);
})
 
function ySearch(e) {
    let search = searchTerm.value;
    console.log(e.target.token);
    search = encodeURIComponent(search);
    let url = 'https://www.googleapis.com/youtube/v3/search/?part=snippet&key=' + api + '&q=' + search + '&maxResults=4';
    if(e.target.token) {
        url += '&pageToken='+e.target.token;
    }
    //output.textContent = url;
    fetch(url).then(function (rep) {
        return rep.json()
    }).then(function (data) {
        if(data.prevPageToken){
            btnPrev.token = data.prevPageToken;
            btnPrev.disabled = false;
        }else{
            btnPrev.token = false;
            btnPrev.disabled = true;
        }
        if(data.nextPageToken){
            btnNext.token = data.nextPageToken;
            btnNext.disabled = false;
        }else{
            btnNext.token = false;
            btnNext.disabled = true;
        }
        return data.items.map(function (x) {
            return {
                title: x.snippet.title
                , des: x.snippet.description
                , img: x.snippet.thumbnails.default.url
                , id: x.id.videoId
                , x: x
            }
        })
    }).then(function (arr) {
        show(arr);
    }).catch(function (error) {
        console.log(error);
    })
}
 
function show(data) {
    console.log(data);
    console.log(data.length);
    output.innerHTML = '';
    data.forEach(function (video) {
        console.log(video);
        let div = document.createElement('div');
        div.classList.add('box');
        let temp = document.createTextNode(video.des);
        let span = document.createElement('span');
        span.innerHTML = '<a href="http://www.youtube.com/watch?v=' + video.id + '" target="_blank">' + video.title + '</a>';
        div.appendChild(span);
        div.appendChild(temp);
        output.appendChild(div);
    })
}





})(jQuery);

//////end api