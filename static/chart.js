var binanceSocket

var url = createurl()
display_data2(url)

//var dd = new Date(1549312452 * 1000).toISOString().slice(0, 10);
//console.log(dd)

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

async function display_data2(url) {
	try {
		let response = await fetch(url);
		response.json().then((r) => {

			var fd = r.map((datapoint) => ({
				time:  datapoint.time,
				open:  Number(datapoint.open),
				high:  Number(datapoint.high),
				low:   Number(datapoint.low),
				close: Number(datapoint.close)
			}));

			candlesticksSeries.setData(fd);
			
			//PROLOZENI KRIVKOU
			// Convert the candlestick data for use with a line series
			var lineData = r.map((datapoint) => ({
				time: datapoint.time,
				value: Number(datapoint.close),
			})); 

			//chart2
			LineSeries.setData(lineData);			
	
		});
	} catch (error) {
		console.log(error);
	}

}

async function high_low_peakutils(url) {
	try {
		let response = await fetch(url);
		response.json().then((r) => {
			
			
			console.log(r)
			var markers = []
			
			for(let i = r.length-1; i > -1; i--){
				var _id = "candlesticksSeriesMarker_" + i
				if(r[i][0] == "peak"){
					const marker = {
						time: 	r[i][1],
						position: 'aboveBar',
						color: 'green',
						shape: 'circle',
						id: _id,
						text: r[i][2],
						size: 1,
					}
					markers.push(marker)
				} else if(r[i][0] == "valley") {
					const marker = {
							time: 	r[i][1],
							position: 'belowBar',
							color: 'yellow',
							shape: 'circle',
							id: _id,
							text: [i][2],
							size: 1,
						}
					markers.push(marker)
				}								
			}

			candlesticksSeries.setMarkers(markers);
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
	const url = createurl()
	display_data2(url)
	/* 
	pair = document.getElementById("pair_symbol_option_id").value.toLowerCase()
	int = document.getElementById("interval_option_id").value.toLowerCase()
	var url = `wss://stream.binance.com:9443/ws/${pair}@kline_${int}`
	console.log(url)
	//refresh socket
	//refreshSocket(binanceSocket,url)
	
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

document.getElementById('peak_valley_bn').addEventListener("click", function() {
	opt = document.getElementById("kline_trade_option_id").value
	pair = document.getElementById("pair_symbol_option_id").value
	int = document.getElementById("interval_option_id").value
	amount = document.getElementById("data_amount_option_id").value
	const url = "http://127.0.0.1:5000/peakvalley?kline_trade_option_name=" + opt
		+ "&pair_symbol_option_name=" + pair
		+ "&interval_option_name=" + int
		+ "&data_amount_option_name=" + encodeURIComponent(amount);
	high_low_peakutils(url);

})

//HTML------------------------------------------------------------------------------------------------------------


// Create the Lightweight Chart within the container element
var chart2 = LightweightCharts.createChart(
	document.getElementById('container'),
	{
		layout: {
			background: { color: "#222" },
			textColor: "#C3BCDB",
		},
		grid: {
			vertLines: { color: "#444" },
			horzLines: { color: "#444" },
		},
	}
);

//change scale
document.getElementById("set_pricescalemode_bn").addEventListener("click", function() {
	selected = document.getElementById("priceScaleModeSelect").value;
	
	if(selected == "normal")
		chart2.applyOptions({
			rightPriceScale: {
				mode: LightweightCharts.PriceScaleMode.Normal
			}
		});
	else if(selected == "logarithmic")
	chart2.applyOptions({
		rightPriceScale: {
			mode: LightweightCharts.PriceScaleMode.Logarithmic
		}
	});
	else if(selected == "percentage")
	chart2.applyOptions({
		rightPriceScale: {
			mode: LightweightCharts.PriceScaleMode.Percentage
		}
	});
});

// Setting the border color for the vertical axis
chart2.priceScale().applyOptions({
	borderColor: "#71649C",
});

// Setting the border color for the horizontal axis
chart2.timeScale().applyOptions({
	borderColor: "#71649C",
});

// Adjust the starting bar width (essentially the horizontal zoom)
chart2.timeScale().applyOptions({
	barSpacing: 10,
});

// Get the current users primary locale - device language
const currentLocale = window.navigator.languages[0];
// Create a number format using Intl.NumberFormat
const myPriceFormatter = Intl.NumberFormat(currentLocale, {
	style: "currency",
	currency: "EUR", // Currency for data points
}).format;/** */

// Apply the custom priceFormatter to the chart
chart2.applyOptions({
	localization: {
		//priceFormatter: myPriceFormatter,
	},
});

// Customizing the Crosshair
chart2.applyOptions({
	crosshair: {
		// Change mode from default 'magnet' to 'normal'.
		// Allows the crosshair to move freely without snapping to datapoints
		mode: LightweightCharts.CrosshairMode.Magnet,

		// Vertical crosshair line (showing Date in Label)
		vertLine: {
			width: 8,
			color: "#C3BCDB44",
			style: LightweightCharts.LineStyle.Solid,
			labelBackgroundColor: "#9B7DFF",
		},

		// Horizontal crosshair line (showing Price in Label)
		horzLine: {
			color: "#9B7DFF",
			labelBackgroundColor: "#9B7DFF",
		},
	},
});


// Create the Main Series (Candlesticks)
var candlesticksSeries;
candlesticksSeries = chart2.addCandlestickSeries();

// Add an area series to the chart2,
// Adding this before we add the candlestick chart2
// so that it will appear beneath the candlesticks
var LineSeries;
LineSeries = chart2.addLineSeries({
	lastValueVisible: false, // hide the last value marker for this series
	crosshairMarkerVisible: false, // hide the crosshair marker for this series
	color: "white", // hide the line
	//topColor: "rgba(56, 33, 110,0.6)",
	//bottomColor: "rgba(56, 33, 110, 0.1)",
});


// Set the data for the Main Series
//candlesticksSeries.setData(candleStickData);

// Changing the Candlestick colors
candlesticksSeries.applyOptions({
	wickUpColor: "rgb(54, 116, 217)",
	upColor: "rgb(54, 116, 217)",
	wickDownColor: "rgb(225, 50, 85)",
	downColor: "rgb(225, 50, 85)",
	borderVisible: false,
});

// Adjust the options for the priceScale of the candlesticksSeries
candlesticksSeries.priceScale().applyOptions({
	autoScale: true, // disables auto scaling based on visible content
	scaleMargins: {
		top: 0.1,
		bottom: 0.2,
	},
});

candlesticksSeries.setMarkers([
	{
		time: 	Date.now(),
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

chart2.subscribeCrosshairMove(param => {
	if (param.hoveredMarkerId != undefined)
		console.log(param);
});

chart2.subscribeClick(param => {
	if (param.hoveredMarkerId != undefined)
		console.log(param);
});

// Adding a window resize event handler to resize the chart when
// the window size changes.
// Note: for more advanced examples (when the chart doesn't fill the entire window)
// you may need to use ResizeObserver -> https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
window.addEventListener("resize", () => {
	chart2.resize(window.innerWidth, window.innerHeight);
});