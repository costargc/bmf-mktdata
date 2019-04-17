# BMF-mktdata-html-scraper
BMF (Brazil Exchange) publish forecast data for many key market reference indicators for Brazil Market. The information is structured under the website: "http://www2.bmf.com.br/pages/portal/bmfbovespa/boletim1/TxRef1.asp?" that receives two key datas:

Data=<DD/MM/YYYY>

slcTaxa=\<AAA>

Where \<AAA> can be:

| slcTaxa  | name |
| ------------- | ------------- |
| ACC  | Ajuste cupom  |
| APR  | Ajuste pré  |
| BRP| IBrX-50 |
| DCO| Cupom Cambial OC1 |
| DIC| DI x IPCA |
| DIM| DI x IGP-M |
| DOC| Cupom limpo |
| DOL| DI x dólar |
| DP| Dólar x pré |
| EUC| DI x euro |
| EUR| Real x euro |
| INP| Ibovespa |
| JPY| Real x iene |
| LIB| Libor |
| PRE| DI x pré |
| PTX| Real x dólar |
| SDE| Spread Libor Euro x Dólar |
| SLP| Selic x pré |
| TFP| TBF x pré |
| TP| TR x pré |
| TR| DI x TR |

# TO DO:

This initial version is not efficient but it do load all the data from PRE curve.

1. We need to format the data to dividi it in columns (0 = date / 1 = rate , 2 ...)

2. We need to explore more data sets (there are other forms of datas than 252 and 360. ex.: índice / Preço / Taxa... we need to find a way to account for those.

3. The objective of this is to feed the data to a trading dashboard - so we don't need all the data to be consumed and stored... we would need to build a form to select only specific buckets e.g.: 1w / 2w / 3w / 1mo / 2mo. (interpolation is definetly required to have those buckets for all dates).

4. there may be an issue with the data selection moving forward - as we can only find dates that are business days in Brazil. AMBIMA.com.br has a list of all the business days in Brazil - we may need to create a function here that checks if the date is valid (by excluding holidays and weekends).