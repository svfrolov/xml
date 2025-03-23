const { StockDAO } = require('./StocksDAO');

class StocksService {
    static findStocks(id) {
        if (id !== undefined) {
            return StockDAO.findById(id).toJSON();
        }

        return StockDAO.find().map((stock) => stock.toJSON());
    }

    static addStock(stock) {
        return StockDAO.insert(stock).toJSON();
    }

    static deleteStock(id) {
        return StockDAO.delete(id).map((stock) => stock.toJSON());
    }

    static updateStock(id, stockData) {
        return StockDAO.update(id, stockData).toJSON();
    }
    
}

module.exports = {
    StocksService,
};
