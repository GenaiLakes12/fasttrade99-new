from app.models.user import Portfolio , BrokerCredentials, Strategies, PortfolioLegs, ExecutedPortfolio,Performance, User, ExecutedEquityOrders
import httpx
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
import random
import urllib
import json
from datetime import datetime
import config
from fastapi import Request

class PseudoAPI:
    def _init_(self, data):
        self.data = data
    
    def place_order(self, db: Session = Depends(get_db)):
        exchange = self.data['exchange']
    
        # Note: Equity Place order !!
        if exchange == "NSE":
            user_id = self.data['user_id']
            symbol = self.data['symbol']

            if "NSE" in symbol:
                symbol = symbol[4:]
            else:
                symbol = symbol

            quantity = self.data['quantity']
            transaction_type = self.data['transaction_type']
            order_type = self.data['order_type']
            strategy_tag = self.data['strategy']
            product_type= self.data['product_type']
            limitPrice = self.data['limitPrice']
            username = self.data['username']
            broker_user_id = self.data['broker_user_id']
            
            broker_credentials = db.query(BrokerCredentials).filter_by(broker_user_id=broker_user_id,user_id = user_id).first()
            if broker_credentials:
                user_broker_multiplier = broker_credentials.user_multiplier
                print("user_broker_multiplier:",user_broker_multiplier)
            else:
                user_broker_multiplier = 1
                

            max_open_trades = int(broker_credentials.max_open_trades)
            # Count the current open trades for this user and broker combination
            if max_open_trades != 0:
                current_open_trades = db.query(ExecutedEquityOrders).filter_by(user_id=user_id, broker_user_id=broker_user_id, square_off=False).count()
                if current_open_trades >= max_open_trades:
                    return [{"message": f"Cannot place order for {broker_user_id}: max open trades limit reached!"}]
            
            strategy = db.query(Strategies).filter_by(strategy_tag=strategy_tag).first()
            print("strategy:",strategy)
            if strategy:
                allowed_trades = strategy.allowed_trades 
                print("allowed_trades:", allowed_trades)
            else:
                allowed_trades = 'Both'
                
            # Map side to corresponding allowed trade type
        
            if transaction_type == "BUY":
                trade_type = "Long"
            elif transaction_type == "SELL":
                trade_type = "Short"
            else:
                return [{"message": "Invalid transaction type"}]  

            # Check if the trade is allowed by the strategy
            if allowed_trades == 'Both' or allowed_trades == trade_type:
                pass  
            else:
                return [{"message": f"Allowed Trade details do not match for strategy: {strategy_tag} | {allowed_trades}"}]
                

            instrument_url = "https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json"
            response = urllib.request.urlopen(instrument_url)
            instrument_list = json.loads(response.read())
            
            for instrument in instrument_list:
                if instrument["symbol"] == symbol:
                    token = instrument["token"]
                    exchange = instrument['exch_seg']
                    break
            if "NSE" in symbol:
                fyers_broker_id = list(config.OBJ_fyers.keys())[0]
                url = f'http://127.0.0.1:1919/get_fyers_equity_price_details/{username}/{fyers_broker_id}'

                data = {
                    "symbol" : symbol,
                    "from_pseudo" : True
                    }

            else:
                angelone_broker_id = list(config.SMART_API_OBJ_angelone.keys())[0]
                url = f'http://127.0.0.1:1919/get_angelone_equity_price_details/{username}/{angelone_broker_id}'

                data = {
                        "symbol" : symbol,
                        "from_pseudo" : True
                        }
            
            with httpx.Client() as client:
                response = client.post(url, json=data)
            
            buy_price = str(response.json()["ltp"])
            total_quantity = quantity * int(user_broker_multiplier)

            total_price = response.json()["ltp"] * total_quantity
            
            broker_account = db.query(BrokerCredentials).filter_by(broker_user_id=broker_user_id, username = username).first()
            
            if float(broker_account.available_balance) < total_price:
                return [{"message": f"Insufficient Funds Available: {broker_user_id}"}]

            order_id = random.randint(10*14, 10*15 - 1)
            
            executed_equity_orders = ExecutedEquityOrders(user_id=user_id, 
                                                          trading_symbol=instrument['symbol'], 
                                                          broker="pseudo_account", 
                                                          broker_user_id=broker_user_id, 
                                                          quantity= total_quantity,
                                                          transaction_type=transaction_type,
                                                          product_type=product_type,
                                                          strategy_tag=strategy_tag,
                                                          buy_price=buy_price if transaction_type =="BUY" else "0",
                                                          sell_price = buy_price if transaction_type =="SELL" else "0",
                                                          buy_qty = quantity if transaction_type =="BUY" else "0",
                                                          sell_qty = quantity if transaction_type =="SELL" else "0",
                                                          symbol_token=token,
                                                          order_id=order_id,
                                                          placed_time=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                                                          )
            db.add(executed_equity_orders)
            db.commit()
            
            broker_account.available_balance = str(float(broker_account.available_balance) - total_price)

            broker_account.utilized_margin = float(broker_account.utilized_margin) + total_price
            db.add(broker_account)
            db.commit()
            
            return f"Equity order for {self.data['symbol']} placed successfully !"
        
        # Futures and Options !!
        else:
            # Extract data from self
            portfolio_name = self.data['portfolio_name']
            broker_user_id = self.data['broker_user_id']
            username = self.data['username']
            qtp_lots = self.data['qtp_lots']
            underlying_prices = self.data.get('underlying_prices', {})
            
            # Retrieve user and portfolio details
            user = db.query(User).filter_by(username=username).first()
            portfolio_details = db.query(Portfolio).filter_by(portfolio_name=portfolio_name, user_id=user.id).first()
            porfolioleg_details = db.query(PortfolioLegs).filter_by(portfolio_id=portfolio_details.id).all()
            
            if broker_user_id not in portfolio_details.strategy_accounts_id:
                return {"message": "Broker User ID is not linked with the portfolio!"}
            
            broker_credentials = db.query(BrokerCredentials).filter_by(broker_user_id=broker_user_id, username = username).first()
            if broker_credentials:
                user_broker_multiplier = broker_credentials.user_multiplier 
                print("user_broker_multiplier:",user_broker_multiplier)
            else:
                user_broker_multiplier = 1

            max_open_trades = int(broker_credentials.max_open_trades)
            # Count the current open trades for this user and broker combination
            if max_open_trades != 0:
                # Count the current open trades for this user and broker combination
                current_open_trades = db.query(ExecutedPortfolio).filter_by(broker_user_id=broker_user_id, user_id=user.id, square_off=False).count()
                
                # Check if placing this order would exceed max_open_trades
                if current_open_trades >= max_open_trades:
                    return [{"message": f"Cannot place order for {broker_user_id}: max open trades limit reached!"}]
            
            quantity = int(qtp_lots) * int(config.index_data.get(portfolio_details.symbol, 1)) * int(user_broker_multiplier)
            print("total_quantity:", quantity)
            # Map symbol to access_symbol
            symbol_mapping = {
                "NIFTY": "nifty50",
                "BANKNIFTY": "niftybank",
                "FINNIFTY": "finnifty"
            }
            access_symbol = symbol_mapping.get(portfolio_details.symbol, portfolio_details.symbol)
    
            # Fetch instrument data
            instrument_url = "https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json"
            try:
                response = urllib.request.urlopen(instrument_url)
                instrument_list = json.loads(response.read())
            except Exception as e:
                return {"message": f"Error fetching instrument data: {str(e)}"}
            
            # Functions to filter instruments and lookup token
            def filter_instruments():
                instrument_type = "FUTIDX" if legs.option_type == "FUT" else "OPTIDX"
                return [inst for inst in instrument_list
                        if inst['exch_seg'] == portfolio_details.exchange and
                        inst['name'] == portfolio_details.symbol and
                        inst['instrumenttype'] == instrument_type]
    
            def token_lookup(expiry, trading_symbol, instruments):
                for newinstrument in instruments:
                    if newinstrument['expiry'] == expiry and newinstrument['symbol'] == trading_symbol:
                        return newinstrument
                return None
    
            responses = []
            orderbook = []
            positions = []
            total_price = 0.0

            buy_trades_first = portfolio_details.buy_trades_first
    
            for legs in porfolioleg_details:
                if buy_trades_first and legs.transaction_type != "BUY":
                    responses.append({"message": f"Order is not placed as buy_trades_first is true and transaction_type is {legs.transaction_type}"})
                    continue  # Skip the current leg and move to the next one

                # Fetch price details
                url = f'http://127.0.0.1:1919/get_price_details/{username}'
                data = {
                    "symbol": portfolio_details.symbol,
                    "option_type": legs.option_type,
                    "strike": "" if legs.option_type == "FUT" else ("0" if legs.strike[4:] == "" else str(legs.strike[4:])),
                    "expiry": legs.expiry_date,
                    "from_pseudo": True
                }
                
                try:
                    with httpx.Client() as client:
                        response = client.post(url, json=data)
                    response_data = response.json()
                    strike_price = str(int(response_data.get('Strike Price', 0)))  # Default to 0 if not found
                    price = float(response_data.get('Price', 0))  # Default to 0 if not found
                except Exception as e:
                    return {"message": f"Error fetching price details: {str(e)}"}
                
                print("Strike Price:", strike_price)
                print("Price:", price)
    
                # Construct the trading symbol
                year = legs.expiry_date[5:][2:]
                date = legs.expiry_date[:5]
                if legs.option_type == "FUT":
                    trading_symbol = f"{portfolio_details.symbol}{date}{year}{legs.option_type}"
                else:
                    trading_symbol = f"{portfolio_details.symbol}{date}{year}{strike_price}{legs.option_type}"
    
                print("trading_symbol:", trading_symbol)
                expiry_date = legs.expiry_date
                print("expiry_date:", expiry_date)
    
                # Filter instruments and lookup token
                filtered_instruments = filter_instruments()
                trade_details = token_lookup(expiry_date, trading_symbol, filtered_instruments)
            
                if not trade_details:
                    return ({"message": f"Trade details not found for symbol: {trading_symbol}"})
                
                token = trade_details['token']
                order_id = random.randint(10*14, 10*15 - 1)

                total_price = price * quantity

                portfolio_strategy = portfolio_details.strategy
                sttategy = db.query(Strategies).filter_by(strategy_tag=portfolio_strategy).first()
                print("strategy:", strategy)

                if strategy:
                    allowed_trades = strategy.allowed_trades 
                    print("allowed_trades:", allowed_trades)
                else:
                    allowed_trades = 'Both'  

                # Map side to corresponding allowed trade type
                side = legs.transaction_type
                if side == "BUY":
                    trade_type = "Long"
                elif side == "SELL":
                    trade_type = "Short"
                else:
                    return [{"message": "Invalid transaction type"}] 

                # Check if the trade is allowed by the strategy
                if allowed_trades == 'Both' or allowed_trades == trade_type:
                    pass
                    # if buy_trades_first and side != "BUY":
                    #     return [{"message": "Order not placed as buy_trades_first is true and transcation is not BUY"}]
                else:
                    return [{"message": f"Allowed Trade details do not match for strategy: {portfolio_strategy} | {allowed_trades}"}]
                
                broker_account = db.query(BrokerCredentials).filter_by(username=username, broker_user_id=broker_user_id).first()
                if float(broker_account.available_balance) < total_price:
                    return [{"message": f"Insufficient Funds Available: {broker_user_id}"}]
                
                    
                broker_credentials.utilized_margin = str(float(broker_credentials.utilized_margin) + float(total_price))
                broker_credentials.available_balance = str(float(broker_credentials.available_balance) - total_price)
    
                order_response = {
                    'orderTag': portfolio_details.strategy,
                    'symbol': trading_symbol,
                    'exchange': portfolio_details.exchange,
                    'orderDateTime': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    'qty': quantity,
                    'side': legs.transaction_type,
                    'tradedPrice': price,
                    'id': order_id,
                    'status': "COMPLETE"
                }
    
                position_response = {
                    'productType': portfolio_details.order_type,
                    'exchange': portfolio_details.exchange,
                    'symbol': trading_symbol,
                    'netQty': quantity,
                    'ltp': price,
                    'pl': 0,
                    'buyQty': quantity,
                    'buyAvg': price,
                    'buyVal': 0,
                    'sellQty': 0,
                    'sellAvg': 0,
                    'sellVal': 0,
                    'realized_profit': 0,
                    'unrealized_profit': 0,
                    'side': legs.transaction_type,
                    'token': token
                }
    
                responses.append({"message": f"Order Placed Successfully | order_id: {order_id} !"})
                orderbook.append(order_response)
                positions.append(position_response)
                
                # Add executed order to database
                executed_orders = ExecutedPortfolio(
                    broker_user_id=broker_user_id,
                    user_id=user_id,
                    transaction_type=legs.transaction_type,
                    strategy_tag=portfolio_details.strategy,
                    portfolio_name=portfolio_name,
                    trading_symbol=trading_symbol,
                    order_id=order_id,
                    status="Complete",
                    portfolio_leg_id=legs.id,
                    net_qty=quantity,
                    exchange=portfolio_details.exchange,
                    symbol_token=token,
                    buy_price=0 if legs.transaction_type == "SELL" else price,
                    sell_price=0 if legs.transaction_type == "BUY" else price,
                    placed_time=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    broker="pseudo_account",
                    buy_qty = quantity if legs.transaction_type == "BUY" else 0,
                    sell_qty = quantity if legs.transaction_type == "SELL" else 0,
                    order_type = portfolio_details.order_type,
                    product_type = portfolio_details.product_type
                )
    
                db.add(executed_orders)
                # Update total price for all legs
               
            db.add(broker_account)
 
            # Commit all executed orders
            db.commit()
            
            from datetime import time
 
            def create_performance_record(portfolio_name, user_id, broker_user_id, max_pl, min_pl):
                # Check if a performance record with the same portfolio_name already exists
                existing_record = db.query(Performance).filter_by(portfolio_name=portfolio_name, user_id=user_id).first()
                
                if existing_record is None:
                    # If the record does not exist, create a new one
                    performance_record = Performance(
                        portfolio_name=portfolio_name,
                        user_id=user_id,
                        broker_user_id=broker_user_id,
                        max_pl=max_pl,
                        min_pl=min_pl,
                        max_pl_time=time(0, 0, 0),
                        min_pl_time=time(0, 0, 0)
                    )
                    db.add(performance_record)
                    db.commit()
                else:
                    # If the record exists, you can handle it according to your needs
                    print(f"Performance record for portfolio '{portfolio_name}' already exists.")
 
            # Call the function
            create_performance_record(
                portfolio_name=portfolio_name,
                user_id=user_id,
                broker_user_id=broker_user_id,
                max_pl=float('-inf'),  
                min_pl=float('+inf')
            )
            
            # Update pseudo API object
            config.PSEUDO_API_OBJ[broker_user_id] = {"orderbook": orderbook, "positions": positions}
   
            return responses
        
        
    def square_off(self, db: Session = Depends(get_db)):
        username = self.data['username']
        print(self.data)
        existing_user = db.query(User).filter_by(username=username).first()
        user_id = existing_user.id
        exchange = self.data['exchange']
        
        # Note: Equity  Square off !!
        if exchange == "NSE" :
            square_off_type = self.data['type']
            broker_user_id = self.data['broker_user_id']
            
            if square_off_type == "user_level":
                existing_equity_orders = db.query(ExecutedEquityOrders).filter_by(user_id=user_id, broker_user_id=broker_user_id,square_off=False).all()
                sell_order_id = random.randint(10*14, 10*15 - 1)
                
                for equity_orders in existing_equity_orders:
                    token = equity_orders.symbol_token
                    sell_price = config.angelone_live_ltp[token]
                    equity_orders.sell_price = sell_price
                    equity_orders.squared_off_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    equity_orders.square_off = True
                    equity_orders.sell_order_id = sell_order_id
                    equity_orders.sell_qty = equity_orders.buy_qty
                    db.commit()
                
                return "Equity Square Off Successfull !!"
            elif square_off_type == "strategy_level":
                strategy_tag = self.data['strategy_tag']

                existing_equity_orders = db.query(ExecutedEquityOrders).filter_by(user_id=user_id, broker_user_id=broker_user_id, strategy_tag=strategy_tag,square_off=False).all()
                print(existing_equity_orders,"\n\n\n\n\n\n")
                sell_order_id = random.randint(10*14, 10*15 - 1)
                
                for equity_orders in existing_equity_orders:
                    token = equity_orders.symbol_token
                    sell_price = config.angelone_live_ltp[token]
                    equity_orders.sell_price = sell_price
                    equity_orders.squared_off_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    equity_orders.square_off = True
                    equity_orders.sell_order_id = sell_order_id
                    db.commit()

                return "Equity Square Off Successfull ( Strategy Level ) !!"
        # Futures and Options !!
        else:
            if "strategy_tag" in self.data.keys():
                strategy_tag = self.data['strategy_tag']
                broker_user_id = self.data['broker_user_id']
                
                existing_user = db.query(User).filter_by(username=username).first()
                user_id = existing_user.id
                sell_order_id = random.randint(10*14, 10*15 - 1)

                executed_portfolio = db.query(ExecutedPortfolio).filter_by(user_id=user_id, strategy_tag=strategy_tag, broker_user_id=broker_user_id,square_off=False).all()
                
                for executed in executed_portfolio:
                    token = executed.symbol_token
                    sell_price = config.angelone_live_ltp[token]
                    executed.sell_price = sell_price
                    executed.square_off = True
                    executed.sell_order_id = sell_order_id
                    executed.squared_off_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    executed.net_qty = 0 
                    executed.sell_qty = executed.buy_qty
           
                    
                    db.commit()

                return "Square off done ( Strategy Level ) !"
            
            elif "portfolio_leg_id" in self.data.keys():
                portfolio_name = self.data['portfolio_name']
                portfolio_leg_id = self.data['portfolio_leg_id']
                broker_type = self.data['broker_type']
                broker_user_id = self.data['broker_user_id']
                sell_order_id = random.randint(10*14, 10*15 - 1)

                existing_portfolio = db.query(ExecutedPortfolio).filter_by(user_id=user_id, portfolio_name=portfolio_name, portfolio_leg_id=portfolio_leg_id, broker=broker_type, broker_user_id=broker_user_id,square_off=False).all()
                if existing_portfolio == None:
                    return "There are no open positions for this Portfolio !"
                
                for executed in existing_portfolio:
                    token = executed.symbol_token
                    sell_price = config.angelone_live_ltp[token]
                    executed.sell_price = sell_price
                    executed.square_off = True
                    executed.sell_order_id = sell_order_id
                    executed.squared_off_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    executed.net_qty = 0 
                    executed.sell_qty = executed.buy_qty
                    
                    db.commit()

                return "Square off done ( Portfolio Leg Level ) !"
            
            elif "portfolio_name" in self.data.keys() and "portfolio_leg_id" not in self.data.keys():
                portfolio_name = self.data['portfolio_name']
                broker_type = self.data['broker_type']
                broker_user_id = self.data['broker_user_id']
                sell_order_id = random.randint(10*14, 10*15 - 1)

                existing_portfolio = db.query(ExecutedPortfolio).filter_by(user_id=user_id, portfolio_name=portfolio_name, broker=broker_type, broker_user_id=broker_user_id,square_off=False).all()

                for executed in existing_portfolio:
                    token = executed.symbol_token
                    sell_price = config.angelone_live_ltp[token]
                    executed.sell_price = sell_price
                    executed.square_off = True
                    executed.sell_order_id = sell_order_id
                    executed.squared_off_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    executed.net_qty = 0 
                    executed.sell_qty = executed.buy_qty
                    
                    db.commit()

                return "Square off done ( Portfolio Level ) !"
            
            elif "broker_user_id" and "trading_symbol" in self.data.keys():
                broker_user_id = self.data['broker_user_id']
                trading_symbol = self.data['trading_symbol']
                sell_order_id = random.randint(10*14, 10*15 - 1)
                existing_portfolio = db.query(ExecutedPortfolio).filter_by(user_id=user_id, broker_user_id=broker_user_id,trading_symbol=trading_symbol,square_off=False).all()

                for executed in existing_portfolio:
                    token = executed.symbol_token
                    sell_price = config.angelone_live_ltp[token]
                    executed.sell_price = sell_price
                    executed.square_off = True
                    executed.sell_order_id = sell_order_id
                    executed.squared_off_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    executed.net_qty = 0 
                    executed.sell_qty = executed.buy_qty
                    
                    db.commit()

                return "Square off done ( Max loss per trade ) !" 

            else:
                broker_user_id = self.data['broker_user_id']
                sell_order_id = random.randint(10*14, 10*15 - 1)
                existing_portfolio = db.query(ExecutedPortfolio).filter_by(user_id=user_id, broker_user_id=broker_user_id,square_off=False).all()

                for executed in existing_portfolio:
                    token = executed.symbol_token
                    sell_price = config.angelone_live_ltp[token]
                    executed.sell_price = sell_price
                    executed.square_off = True
                    executed.sell_order_id = sell_order_id
                    executed.squared_off_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    executed.net_qty = 0 
                    executed.sell_qty = executed.buy_qty
                    
                    db.commit()

                return "Square off done ( User Level ) !"
