var visitDate=new Date();
var visitTime=String(Math.floor(visitDate.getTime()/1000));
var visitCode=visitTime.concat(String(Math.floor(Math.random()*10+1)-1)).concat(String(Math.floor(Math.random()*10+1)-1)).concat(String(Math.floor(Math.random()*10+1)-1)).concat(String(Math.floor(Math.random()*10+1)-1));

var parser = document.createElement('a');
parser.href = window.location.href.replace("s3.amazonaws.com/index.html", "");

var urlHost= parser.host && parser.host.toLowerCase();
var visitUrl=parser.pathname && parser.pathname;

var visitUrls=visitUrl.split("http://online.fliphtml5.com/");

/*if(visitUrls.length>=4&&urlHost=='online.fliphtml5.com'){
	var uLink=visitUrls[1];
	var bLink=visitUrls[2];
	jQuery(document).ready(function(){
			getBookCaseConfig("http://stat.fliphtml5.com/statistic-server/add-book-visitinfo.php?uLink="+uLink+"&bLink="+bLink+"&type=1&page=1&code="+visitCode);
		});
}*/

//ad-banner
if(visitUrls.length>=4){
	if(urlHost=='online.fliphtml5.com'){
		$.getScript( "../getuserinfo.js" )
		.done(function( script, textStatus ) {
			if(user_type==0){
				if(isPhone()||isPad()){
					if(disable_ad==1){
						console.log('true');
					}else{
						console.log('false');
						$("body").append('<script async src="../../../pagead2.googlesyndication.com/pagead/js/f.txt"></script><script>(adsbygoogle = window.adsbygoogle || []).push({google_ad_client: "ca-pub-9840740068404348",enable_page_level_ads: true});</script>');
					}
				}else{
					// ads
					var ads = [
						{
							name: 'bannerS',
							width: 320,
							height: 50
						},
						{
							name: 'bannerM',
							width: 468,
							height: 60
						},
						{
							name: 'bannerL',
							width: 728,
							height: 90
						}
					];

					var ad;
					var windowWidth = $(window).width();
					if (windowWidth >= 1000) {
						ad = ads[2];
					} else if (windowWidth < 1000 && windowWidth >= 600) {
						ad = ads[1];
					} else {
						ad = ads[0];
					}

					var bodyMargin = 16 + 10;
					var containerWidth = ad.width + bodyMargin;
					var containerHeight = ad.height + bodyMargin;

					var iframeSrc, imgSrc;

					if (location.host == 'localhost') {
						// imgSrc = "/visit/fh_banner_" + ad.width + "_" + ad.height + ".png";
						imgSrc = "/visit/" + ad.name + ".png";
						iframeSrc = "/visit/banner_" + ad.width + "_" + ad.height + ".html";
					} else {
						// imgSrc = "//static.fliphtml5.com/book/banner/fh_banner_" + ad.width + "_" + ad.height + ".png";
						imgSrc = "//static.fliphtml5.com/book/banner/" + ad.name + ".png";
						iframeSrc = "//static.fliphtml5.com/book/banner/banner_" + ad.width + "_" + ad.height + ".html";
					}

					var $body = $("body");

					var $container = $("<div></div>").css({
						zIndex: 99999,
						position: "fixed",
						width: containerWidth,
						height : containerHeight,
						left: "50%",
						marginLeft: -containerWidth / 2,
						bottom: 25
					});

					var $adsText = $("<div>Ads</div>").css({
						position: "absolute",
						left: "0",
						bottom: "100%",
						background: "white",
						border: "1px solid gray",
						color: "gray",
						padding: "2px 6px",
						fontSize: "13px",
						lineHeight: "13px",
						marginLeft: bodyMargin / 2 - 5, //他们的广告不完全居中，有像素偏差
					});

					var $closeBtn = $("<div style=''></div>").css({
						cursor: "pointer",
						position: "absolute",
						border: "1px solid #181818",
						width: 24,
						height: 24,
						cursor: "pointer",
						background: "white url(//static.fliphtml5.com/book/banner/close.png) no-repeat 4px 4px",
						left: ad.width + bodyMargin,
						top: bodyMargin / 2 - 1 - 5 //他们的广告不完全居中，有像素偏差
					});

					// Create Online Interactive HTML5 Digital publication with fliphtml5.com

					var $fh_banner = $("<a href='https://go.oclasrv.com/afu.php?zoneid=1697913' target='_blank'><img src='" + imgSrc + "' alt='Free Game, Music, Movie, Book, Download Now!' /></a>").css({
						display: "none",
						position: "absolute",
						left: bodyMargin / 2 - 5, //他们的广告不完全居中，有像素偏差
						top: bodyMargin / 2 - 5, //他们的广告不完全居中，有像素偏差
						width: ad.width,
						height: ad.height
					});

					// 2017.10.19 暂停广告
					var $iframe = $("<iframe src='" + iframeSrc +"' width='" + containerWidth + "' height='" + containerHeight + "' frameborder='0'></iframe>").css({
					 	position: "absolute"
					 });;

					$container
						.append($fh_banner)
						// .append($iframe)

						.appendTo($body);

					setTimeout(function() {
						$container.append($closeBtn).append($adsText);
						$fh_banner.show();
					}, 2000);

					$closeBtn.on("click", function() {
						$container.remove();
					});
					// ads end
				}
			}
		})
		.fail(function( jqxhr, settings, exception ) {
		//加载失败
		});
	}
}

function sendvisitinfo(type,page){
	var type=type;
	var page=page;
	if(type==null){
		var type='';
	}
	if(page==null){
		var page='';
	}

	var isAdd=false;
	if(visitUrls.length>=4){
		var uLink=visitUrls[1];
		var bLink=visitUrls[2];
		if(urlHost=='online.fliphtml5.com'){
			 isAdd=true;
		}else if((urlHost=='fliphtml5.com')&&(visitUrls[1]=='read')){
			var uLink=visitUrls[2];
			var bLink=visitUrls[3];
			isAdd=true;
		}else{
			if(uLink=='books'){
				uLink='domain_'+urlHost;
				isAdd=true;
			}
		}
	}
	if(isAdd==true){
		jQuery(document).ready(function(){
			getBookCaseConfig("http://newstat.fliphtml5.com/bookvisitinfo.html?uLink="+uLink+"&bLink="+bLink+"&type="+type+"&page="+page+"&code="+visitCode);
		});
	}
}

function getBookCaseConfig(url, callBack){
	$.ajax({
	   	async:true,
	   	url: url,
	   	type: "GET",
	   	dataType: 'script',
	   	jsonp: 'jsoncallback',
	   	timeout: 5000,
	   	beforeSend: function(){
	   	},
	   	success: function (json, s) {
	   	},
	    complete: function(XMLHttpRequest, textStatus){
	    	if (textStatus == "success" && typeof callBack == "function") {
	    		callBack();
	    	};
	   	},
	   	error: function(xhr){
	   	}
	});
};
