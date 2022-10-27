var binanceSocket
var logScaleSet = false;

var url = createurl()
display_data(url)

pair = document.getElementById("pair_symbol_option_id").value.toLowerCase()
int = document.getElementById("interval_option_id").value.toLowerCase()
var url = `wss://stream.binance.com:9443/ws/${pair}@kline_${int}`
//binanceSocket = new WebSocket(url)


function createurl() {
	opt = document.getElementById("kline_trade_option_id").value
	pair = document.getElementById("pair_symbol_option_id").value
	int = document.getElementById("interval_option_id").value
	amount = document.getElementById("data_amount_option_id").value
	var url = "http://127.0.0.1:5000/update?kline_trade_option_name=" + opt
		+ "&pair_symbol_option_name=" + pair
		+ "&interval_option_name=" + int
		+ "&data_amount_option_name=" + encodeURIComponent(amount);

	return url;
}

async function getData(url) {
	try {
		let response = await fetch(url);
		response.json().then((r) => {
			return r
		});
	} catch (error) {
		console.log(error);
	}
}


async function display_data(url) {
	try {
		let response = await fetch(url);
		response.json().then((r) => {
			candleSeries.setData(r);
		});
	} catch (error) {
		console.log(error);
	}

}

async function refreshSocket(socket, url) {
	//refresh socket
	socket = new WebSocket(url);

	socket.onmessage = await function(event) {
		var message = JSON.parse(event.data)
		var candlestick = message.k;
		
		candleSeries.update({
			time: candlestick.t / 1000,
			open: candlestick.o,
			high: candlestick.h,
			low: candlestick.l,
			close: candlestick.c
		})
	}
}

//Display data clicked
document.getElementById("display_data_bn").addEventListener("click", function () {
	
	display_data(createurl())
	
	pair = document.getElementById("pair_symbol_option_id").value.toLowerCase()
	int = document.getElementById("interval_option_id").value.toLowerCase()
	var url = `wss://stream.binance.com:9443/ws/${pair}@kline_${int}`
	console.log(url)
	//refresh socket
	//refreshSocket(binanceSocket,url)
	/* 
	binanceSocket = new WebSocket(url);

	binanceSocket.onmessage = function(event) {
		var message = JSON.parse(event.data)
		var candlestick = message.k;
		
		candleSeries.update({
			time: candlestick.t / 1000,
			open: candlestick.o,
			high: candlestick.h,
			low: candlestick.l,
			close: candlestick.c
		})
	}*/
});

//------------------------------------------------------------------------

var chart = LightweightCharts.createChart(document.getElementById("chart"), {
	width: document.width,
	height: 300,
	rightPriceScale: {mode:LightweightCharts.PriceScaleMode.Normal}});

//change scale
document.getElementById("set_pricescalemode_bn").addEventListener("click", function() {
	selected = document.getElementById("priceScaleModeSelect").value;
	
	if(selected == "normal")
		chart.applyOptions({
			rightPriceScale: {
				mode: LightweightCharts.PriceScaleMode.Normal
			}
		});
	else if(selected == "logarithmic")
	chart.applyOptions({
		rightPriceScale: {
			mode: LightweightCharts.PriceScaleMode.Logarithmic
		}
	});
	else if(selected == "percentage")
	chart.applyOptions({
		rightPriceScale: {
			mode: LightweightCharts.PriceScaleMode.Percentage
		}
	});
});

//chart.setprice = mode.
/**
chart.priceScale('right').applyOptions({
    mode:LightweightCharts.PriceScaleMode.Normal,
}); */

/* */
var candleSeries;
candleSeries = chart.addCandlestickSeries({
	upColor: '#22AB94',
	downColor: '#f23645',
	borderDownColor: '#f23645',
	borderUpColor: '#22AB94',
	wickDownColor: '#f23645',
	wickUpColor: '#22AB94',
});

chart
	.addLineSeries({
		color: '#2962FF',
		lineWidth: 2,
	})
	.setData([
		{ time: { year: 2022, month: 7, day: 22 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 7, day: 23 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 7, day: 24 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 7, day: 25 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 7, day: 26 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 7, day: 27 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 7, day: 28 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 7, day: 29 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 7, day: 30 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 1 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 2 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 3 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 4 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 5 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 6 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 7 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 8 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 9 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 10 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 11 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 12 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 13 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 14 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 15 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 16 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 17 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 18 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 19 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 20 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 21 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 22 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 23 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 24 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 25 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 26 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 27 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 28 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 29 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 30 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 8, day: 31 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 9, day: 1 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 9, day: 2 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 9, day: 3 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 9, day: 4 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 9, day: 5 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 9, day: 6 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 9, day: 7 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 9, day: 8 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 9, day: 9 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 9, day: 10 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 9, day: 11 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 9, day: 12 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 9, day: 13 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 9, day: 14 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 9, day: 15 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 9, day: 16 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 9, day: 17 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 9, day: 18 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 9, day: 19 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 9, day: 20 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 9, day: 21 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 9, day: 22 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 9, day: 23 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 9, day: 24 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 9, day: 25 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 9, day: 26 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 9, day: 27 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 9, day: 28 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 9, day: 29 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 9, day: 30 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 1 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 2 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 3 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 4 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 5 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 6 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 7 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 8 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 9 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 10 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 11 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 12 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 13 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 14 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 15 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 16 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 17 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 18 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 19 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 20 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 21 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 22 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 23 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 24 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 25 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 26 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 27 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 28 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 29 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 30 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
		{ time: { year: 2022, month: 10, day: 31 }, value: (Math.random() * (20800.00 - 20400.00) + 20400.00) },
	]);


candleSeries.setMarkers([
	{
		time: 	1666854000,
		position: 'aboveBar',
		color: 'blue',
		shape: 'arrowDown',
	},
	{
		time: 1666855800,
		position: 'belowBar',
		color: 'red',
		shape: 'arrowUp',
		id: 'id3',
	},
	{
		time: 1666855800,
		position: 'belowBar',
		color: 'orange',
		shape: 'circle',
		id: 'id4',
		text: 'example',
		size: 2,
	},
]);

chart.subscribeCrosshairMove(param => {
	if (param.hoveredMarkerId != undefined)
		console.log(param);
});

chart.subscribeClick(param => {
	if (param.hoveredMarkerId != undefined)
		console.log(param);
});

var chart2 = LightweightCharts.createChart(document.getElementById("chart2"), {
	width: document.width,
	height: 300,
	layout: {
		backgroundColor: '#FFFFFF',
		textColor: 'rgba(255, 255, 255, 0.9)',
	},
	grid: {
		vertLines: {
			color: 'rgba(197, 203, 206, 0.5)',
		},
		horzLines: {
			color: 'rgba(197, 203, 206, 0.5)',
		},
	},
	crosshair: {
		mode: LightweightCharts.CrosshairMode.Normal,
	},
	leftPriceScale: {
		borderColor: 'rgba(197, 203, 206, 0.8)',
		mode: LightweightCharts.PriceScaleMode.Logarithmic,

	},
	timeScale: {
		borderColor: 'rgba(197, 203, 206, 0.8)',
		timeVisible: true,
		secondsVisible: false,
		fitContent: true,
	},
});
 

var lineSeries = chart2.addLineSeries({ color: '#22AB94' });
const data2 = [{ value: 0, time: 1642425322 }, { value: 8, time: 1642511722 }, { value: 10, time: 1642598122 }, { value: 20, time: 1642684522 }, { value: 3, time: 1642770922 }, { value: 43, time: 1642857322 }, { value: 41, time: 1642943722 }, { value: 43, time: 1643030122 }, { value: 56, time: 1643116522 }, { value: 46, time: 1643202922 }];
lineSeries.setData(data2);
chart2.timeScale().fitContent();