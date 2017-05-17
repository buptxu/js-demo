window.onload=function(){
	// var t=setTimeout(function(){
	// 	if (Date.now() > new Date("2017-05-05 13:59:58")) {
	// 		var flag = window.location.href.split('?')[0];
	// 		var buy = document.querySelector('.btn.btn-primary.btn-biglarge.J_proBuyBtn');

	// 		var buycar = document.querySelector('.btn.btn-primary');

	// 		var btncount = document.querySelector('#J_goCheckout.btn');

	// 		var ads = document.querySelector('.address-item.J_addressItem');
	// 		var lastbuy = document.querySelector('#J_checkoutToPay');

	// 		if (window.location.host == "item.mi.com"&&buy){
	// 			// var buy = document.querySelector('.btn.btn-primary.btn-biglarge.J_proBuyBtn');
	// 			buy.click();

	// 		}else if(flag == "http://static.mi.com/buySuccess/"&&buycar){
	// 			// var buycar = document.querySelector('.btn.btn-primary');
	// 			buycar.click();

	// 		}else if(flag == "http://static.mi.com/cart/"&&btncount){
	// 			// var btncount = document.querySelector('#J_goCheckout.btn');
	// 			btncount.click();

	// 		}else if(window.location.host == "order.mi.com"&&ads){
	// 			// var ads = document.querySelector('.address-item.J_addressItem');
	// 			// var lastbuy = document.querySelector('#J_checkoutToPay');
	// 			ads.click();
	// 			lastbuy.click();
	// 		}
	// 	}

	// },100);
	setInterval(function(){
		if (Date.now() > new Date("2017-05-04 16:34:00")) {
			var flag = window.location.href.split('?')[0];
			var buy = document.querySelector('.btn.btn-primary.btn-biglarge.J_proBuyBtn');

			var buycar = document.querySelector('.btn.btn-primary');

			var btncount = document.querySelector('#J_goCheckout.btn');

			var ads = document.querySelector('.address-item.J_addressItem');
			// var lastbuy = document.querySelector('.btn.btn-primary');

			if (window.location.host == "item.mi.com"&&buy){
				// var buy = document.querySelector('.btn.btn-primary.btn-biglarge.J_proBuyBtn');
				buy.click();
			}else if(flag == "http://static.mi.com/buySuccess/"&&buycar){
				// var buycar = document.querySelector('.btn.btn-primary');
				buycar.click();
			}else if(flag == "http://static.mi.com/cart/"&&btncount){
				// var btncount = document.querySelector('#J_goCheckout.btn');
				btncount.click();
			}else if(window.location.host == "order.mi.com"&&ads){
				// var ads = document.querySelector('.address-item.J_addressItem');
				var lastbuy = document.querySelector('#J_checkoutToPay');

				ads.click();
				// var lastbuy = document.querySelector('#J_checkoutToPay.btn');
				// console.log(lastbuy);
				lastbuy.click();
			}
		}

	}, 2000);
}