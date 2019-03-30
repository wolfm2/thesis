import pandas as pd
import glob
 
areas = ['Burkina Faso', 'Cameroon', 'Chad', 'Gambia', 'Guinea', 'Mali', 'Mauritania', 'Niger', 'Nigeria', 'Senegal'] 

li = []
for tok in glob.glob('in/*.xlsx'):
   df = pd.read_excel(tok, index_col=None, header=0)
   li.append(df)

df = pd.concat(li, axis=0, ignore_index=True)

li = []
for tok in areas:
   sub_df = df[(df['Country'] == tok)]
   li.append(sub_df)

df = pd.concat(li, axis=0, ignore_index=True)

df.to_csv("out/fsi_sahel_allYears.csv")
