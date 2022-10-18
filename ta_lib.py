import numpy as np
import talib
from numpy import genfromtxt

#15 minutes candles from binance api
my_data = genfromtxt("./data/15minutes.csv", delimiter=",")

print(my_data)

#data extraction - close price
closing_price = my_data[:,4]
#print(closing_price)

#klouzavy prumer
#simple_moving_average = talib.SMA(close, timeperiod = 10)
 #print(simple_moving_average)

#overbought - usually over 70; oversold usually below 30
relative_strenght_index = talib.RSI(closing_price)
print(relative_strenght_index)