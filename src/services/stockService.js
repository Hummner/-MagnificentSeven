import axios from 'axios';

const order = [
  "Mar 21",
  "Jun 21",
  "Sep 21",
  "Dec 21",
  "Mar 22",
  "Jun 22",
  "Sep 22",
  "Dec 22",
  "Mar 23",
  "3 Aug 23",
  "2 Nov 23",
  "",
  "1 Feb 24",
  "2 Mai 24",
  "1 Aug 24",
  "31 Oct 24",
  "30 Jan 25"
]



class StockService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'https://sheetdb.io/api/v1/uzby68z9k216s'
    });
  }

  async fetchData(sheetName) {
    try {
      const response = await this.apiClient.get(`?sheet=${sheetName}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }

  async renderData() {
    let data = [];
    const companies = [{
      name: "Apple",
      sheetName: "%24AAPL",
      rows : [1, 7, 21, 34]
    }];

    for (const name of companies) {
      let companyData = await this.laodData('%24AAPL');
      companyData.name = name;

      data.push(companyData);
    }

    return data;
  }


  async laodData(sheetName) {
    const data = await this.fetchData(sheetName);
    const revenue = order.map(key => data[7][key]);
    const quarter = order.map(key => data[1][key]);
    const incomeNetto = order.map(key => data[34][key]);
    const grossMargin = order.map(key => data[21][key]);

    let dataToJson = { revenue, quarter, incomeNetto, grossMargin }

    return dataToJson;

  }
}

export const stockService = new StockService();