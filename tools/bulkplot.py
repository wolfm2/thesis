import matplotlib
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from indicators import inds, htmlHeader
 
yearRange = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018"]
ds = pd.read_csv('/home/eydu/Desktop/Indicators/woldbank world dev inds/WDIData.csv')
# ds = pd.read_csv('test.csv')

def plot_header():
	fig = plt.figure()
	ax = plt.subplot(111)

	return (fig, ax)
  

def plot(ax, cnt, ind):
	ds_f0 = ds[(ds['Country Name'] == cnt) & (ds["Indicator Code"] == ind)]

	# check num of rows
	if (len(ds_f0.axes[0]) != 1):	
		print('Error: ' + cnt + ' ' + ind)
		return

	# get useful cols
	meta = ds_f0[["Country Name","Indicator Name"]].values
	cName = meta[0][0]
	iName = meta[0][1]
	cols = ds_f0[yearRange].dropna(axis=1)
	head = [int(numeric_string) for numeric_string in list(cols)] # cvt to ints
	y = cols.values[0]

	x = head
	ax.plot(x, y, "-|", label=cName)

	return(iName)

def plot_footer(fig, ax, ind, cnt, iName):
	
	plt.title(iName)
	x = [int(numeric_string) for numeric_string in yearRange] # cvt to ints
	plt.xticks(np.arange(min(x), max(x)+1, 5.0)) # major ticks every 5
	
	# Shrink current axis by 20%
	box = ax.get_position()
	ax.set_position([box.x0, box.y0, box.width * 0.8, box.height])
	ax.legend(loc='upper left', bbox_to_anchor=(1, 0.5))
	
	picName = "img/{} {}.png".format(ind, cnt)

	# print (picName) 
	fig.savefig(picName)
	plt.close()
	
	if (cnt == 'GROUP'):
		fname = "{} {}.html".format(htmlHeader, cnt)
	else:
		fname = "{} {}.html".format(htmlHeader, "INDIVIDUAL")
		
	with open(fname, 'a') as f:
		f.write("<br>{}<br><img src='{}'>\n".format(ind, picName))
	


areas = ['Burkina Faso', 'Cameroon', 'Chad', 'Gambia, The', 'Guinea', 'Mali', 'Mauritania', 'Niger', 'Nigeria', 'Senegal'] 

# separate graphs
for i in inds:
	for a in areas:
		fig, ax = plot_header()
		iName = plot(ax, a, i)
		plot_footer(fig, ax, i, a, iName)

# group graph
for i in inds:
	fig, ax = plot_header()
	for a in areas:
		iName = plot(ax, a, i)
	plot_footer(fig, ax, i, 'GROUP', iName)
