from flask import Flask, render_template, jsonify, request, redirect
import websocket as ws
import config
from binance.client import Client
import talib
import numpy as np
import pandas as pd
import peakutils

app = Flask(__name__)

client = Client(config.API_KEY, config.API_SECRET)

# load page


@app.route("/", methods=['GET'])
def index():
	title = "Visualization web app"

	exchange_info = client.get_exchange_info()
	currency_symbols = exchange_info['symbols']

	return render_template("index.html", title=title, symbols=currency_symbols)

# display data button clicked


@app.route("/update", methods=['GET'])
def update():
	# extract params from url
	candlesticks = client.get_historical_klines(
		request.args.get("pair_symbol_option_name"),
		request.args.get("interval_option_name"),
		request.args.get("data_amount_option_name"))

	processed_candlesticks = []
	for data in candlesticks:
		candlestick = {
			"time": data[0] / 1000,
			"open": data[1],
			"high": data[2],
			"low": data[3],
			"close": data[4],
		}

		processed_candlesticks.append(candlestick)

	return jsonify(processed_candlesticks)

# apply p&v button clicked


@app.route("/peakvalley", methods=['GET'])
def peakvalley():
	# extract params from url
	candlesticks = client.get_historical_klines(
		request.args.get("pair_symbol_option_name"),
		request.args.get("interval_option_name"),
		request.args.get("data_amount_option_name"))

	processed_candlesticks = []
	for data in candlesticks:
		candlestick = {
			"time": int(data[0] / 1000),
			"close": float(data[4]),
		}

		processed_candlesticks.append(candlestick)

	#print(processed_candlesticks)	

	# Create the pandas DataFrame
	#df = pd.DataFrame(processed_candlesticks)
	df = pd.DataFrame(processed_candlesticks)
	
	# input data
	threshold_high = 0.98
	threshold_low = 0.02
	min_dist_high = 10
	min_dist_low = 5

	closes = df['close']
	closes_inverted = df['close']

	for x in range(len(closes_inverted)):
		closes_inverted[x] *= -1
		
	peaks = []
	
	peaks = peakutils.indexes(closes, thres=threshold_high, min_dist=min_dist_high)
		
	lows = []
	lows = peakutils.indexes(closes_inverted, thres=threshold_low, min_dist=min_dist_low)

	buy_points = [("peak", processed_candlesticks[x]['time'], processed_candlesticks[x]['close']) for x in peaks]
	sell_points = [("valley", processed_candlesticks[x]['time'], processed_candlesticks[x]['close']) for x in lows]

	result = [*buy_points, *sell_points]
	#result.append(buy_points)
	#result.append(sell_points)

	return jsonify(result)

@app.route("/sma", methods=['GET'])
def sma():
	# extract params from url
	candlesticks = client.get_historical_klines(
		request.args.get("pair_symbol_option_name"),
		request.args.get("interval_option_name"),
		request.args.get("data_amount_option_name"))
	# data extraction - close price
	closing_price = candlesticks[:, 4]

	# klouzavy prumer
	simple_moving_average = talib.SMA(closing_price)
	# print(simple_moving_average)


# not important right now
@app.route('/settings')
def settings():
	setting_data = []
	setting_data.append(request.args.get("pair_symbol_option_name"))
	setting_data.append(request.args.get("interval_option_name"))
	setting_data.append(request.args.get("data_amount_option_name"))

	return jsonify(setting_data)


@app.route("/index_post", methods=['GET'])
def index_post():
	title = "Visualization web app"

	exchange_info = client.get_exchange_info()
	currency_symbols = exchange_info['symbols']

	pair_symbol_option_input = request.args.get("pair_symbol_option_name")
	interval_option_input = request.args.get("interval_option_name")
	data_amount_option_input = request.args.get("data_amount_option_name")

	print("from post: \n")

	print(pair_symbol_option_input)
	print(interval_option_input)
	print(data_amount_option_input)

	candlesticks = client.get_historical_klines(
		pair_symbol_option_input, interval_option_input, data_amount_option_input)

	processed_candlesticks = []
	for data in candlesticks:
		candlestick = {
			"time": data[0] / 1000,
			"open": data[1],
			"high": data[2],
			"low": data[3],
			"close": data[4],
		}

		processed_candlesticks.append(candlestick)

	print(processed_candlesticks)

	return render_template("index.html", title=title, symbols=currency_symbols)
