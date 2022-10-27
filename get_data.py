import csv
import config;
from binance.client import Client;
from datetime import datetime, tzinfo
import pytz
from dateutil.relativedelta import relativedelta
import random

#client = Client(config.API_KEY, config.API_SECRET)

#end_date = datetime.now(tz=pytz.UTC)
# minus 3 months
#start_date = end_date - relativedelta(months=3)

#candles = client.get_klines(symbol='BTCTUSD', interval=Client.KLINE_INTERVAL_15MINUTE)

#csv_file = open('1_months_old_data.csv', 'w', newline='')
#candlestic_writer = csv.writer(csv_file,delimiter=',')


# fetch 1 minute klines for the previous 3 months up until now

 #"18 Jul, 2022""1 day ago UTC"
#candlestics = client.get_historical_klines("ETHBTC", Client.KLINE_INTERVAL_1MINUTE, "18 Sep, 2022")
#for c in candlestics:
#    candlestic_writer.writerow(c)

#csv_file.close()

for i in range(0,100):
    print(random.uniform(19000.00, 22000.00))