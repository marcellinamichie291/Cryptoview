from concurrent.futures import process
from flask import Flask, render_template, jsonify
import csv
import config;
from binance.client import Client;

app = Flask(__name__)

client = Client(config.API_KEY, config.API_SECRET)

@app.route("/")
def index():
    title = "Visualization web app"
    return render_template("index.html", title = title)
 
@app.route("/buy")
def buy():
    return "buy"

@app.route("/sell")
def sell():
    return "sell"

@app.route("/settings")
def settings():
    return "settings"

@app.route("/history")
def history():
    candlesticks = client.get_historical_klines("BTCEUR", Client.KLINE_INTERVAL_15MINUTE, "7 days ago UTC")

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