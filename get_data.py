import csv
import config;
from binance.client import Client;
from datetime import datetime, tzinfo
import pytz
from dateutil.relativedelta import relativedelta
import random

client = Client(config.API_KEY, config.API_SECRET)

end_date = datetime.now(tz=pytz.UTC)
# minus 3 months
start_date = end_date - relativedelta(days=7)

#candles = client.get_klines(symbol='BTCTUSD', interval=Client.KLINE_INTERVAL_15MINUTE)

csv_file = open('1_week_old.csv', 'w', newline='')
candlestic_writer = csv.writer(csv_file,delimiter=',')


# fetch 1 minute klines for the previous 3 months up until now

 #"18 Jul, 2022""1 day ago UTC"
candlestics = client.get_historical_klines("BTCTUSD", Client.KLINE_INTERVAL_15MINUTE, "26 Sep, 2022")
for c in candlestics:
    candlestic_writer.writerow(c)

csv_file.close()