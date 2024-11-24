import os
import json
import random
from base64 import urlsafe_b64encode, urlsafe_b64decode
from pydantic import BaseModel
from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from cryptography.fernet import Fernet, InvalidToken
from werkzeug.security import check_password_hash,generate_password_hash
from app.models.user import User, BrokerCredentials,StrategyMultipliers, Strategies,ExecutedPortfolio, ExecutedEquityOrders
from app.api.brokers.pseudoAPI import PseudoAPI
from app.database.connection import get_db
from config import settings
import importlib.util
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from app.api.brokers.angelone import AngelOneLoginRequest
# from app.api.brokers.flattrade import FlatTradeVerificationRequest
from .router import USERSETTING_ROUTES
from .errorHandling import ERROR_HANDLER
from fastapi import Request
import config

# FastAPI mail configuration
conf = ConnectionConfig(
    MAIL_USERNAME=settings.MAIL_USERNAME,
    MAIL_PASSWORD=settings.MAIL_PASSWORD,
    MAIL_FROM=settings.MAIL_FROM,
    MAIL_PORT=settings.MAIL_PORT,
    MAIL_SERVER=settings.MAIL_SERVER,
    MAIL_STARTTLS=settings.MAIL_STARTTLS,
    MAIL_SSL_TLS=settings.MAIL_SSL_TLS,
    USE_CREDENTIALS=True
)
mail = FastMail(conf)

def generate_6otp():
    return ''.join(random.choices("0123456789", k=6))

def validate_request_data(data):
    required_fields = ['mainUser', 'userId', 'password', 'apiKey', 'qrCode', 'broker', 'display_name', 'max_profit', 'max_loss']
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        raise ValueError(f'Missing required fields: {", ".join(missing_fields)}')

key_file_path = 'fernet_key.json'
if os.path.exists(key_file_path):
    with open(key_file_path, 'r') as key_file:
        key_data = json.load(key_file)
        fernet_key = key_data['fernet_key']
else:
    fernet_key = Fernet.generate_key()
    with open(key_file_path, 'w') as key_file:
        json.dump({'fernet_key': fernet_key.decode()}, key_file)

cipher_suite = Fernet(fernet_key)

def encrypt_data(data):
    return urlsafe_b64encode(cipher_suite.encrypt(data.encode()))

def decrypt_data(encrypted_data):
    try:
        return cipher_suite.decrypt(urlsafe_b64decode(encrypted_data)).decode()
    except InvalidToken:
        raise HTTPException(status_code=400, detail="Invalid encryption token")

class AccountValidationData(BaseModel):
    mainUser: str
    userId: str
    password: str
    apiKey: str
    qrCode: str
    broker: str
    display_name: str
    max_profit: int
    max_loss: int
    secretKey: str = None
    imei: str = None
    vendor_code: str = None
    client_id: str = None
    
class BrokerIntegration:
    async def account_validation(self, data: AccountValidationData, db: Session = Depends(get_db)):
        try:
            print("Received data:", data)
            validate_request_data(data.dict())

            broker = data.broker
            username = data.mainUser

            # if not existing_user:
            #     raise HTTPException(status_code=404, detail="User not found.")

            if broker == "pseudo_account":
                print('pseudo entered')
                existing_user = db.query(User).filter(User.username == username).first()
                print("existing user : ",existing_user)
                # if not existing_user:
                #     raise HTTPException(status_code=404, detail="User not found.")
                
                existing_account = db.query(BrokerCredentials).filter_by(user_id=existing_user.id, 
                                                                         broker="pseudo_account", 
                                                                         broker_user_id=data.userId).first()
                if existing_account:
                    print("existing account : ",existing_account)
                    available_balance = existing_account.available_balance
                else:
                    available_balance = 1000000.00  # Default balance
                    pseudo_credentials = BrokerCredentials(
                        user_id=existing_user.id,
                        username=existing_user.username,
                        broker="pseudo_account",
                        display_name=data.display_name,
                        broker_user_id=data.userId,
                        max_profit=float(data.max_profit),  # Convert to float
                        max_loss=float(data.max_loss),       # Convert to float
                        profit_locking=",,,,",
                        available_balance=available_balance,
                        enabled=True
                    )
                    db.add(pseudo_credentials)
                    # db.flush()  # Optional: Ensure the ID is generated
                    db.commit()

                return JSONResponse(content={
                    'message': f'Validation Successful: {username}',
                    'data': {"name": "pseudo", "available_balance": available_balance}
                })
            existing_record = db.query(BrokerCredentials).filter_by(broker_user_id=data.userId).first()
            print("existing_record : ",existing_record)
            module_path = f"./app/api/brokers/{broker}.py"
            
            if existing_record:
                if broker == "angelone":
                    existing_record.enabled = True
                    db.commit()
                    angel_one_data = AngelOneLoginRequest(
                        mainUser=data.mainUser,
                        userId=data.userId,
                        password=data.password,
                        apiKey=data.apiKey,
                        qrCode=data.qrCode,
                    )
                    spec = importlib.util.spec_from_file_location(broker, module_path)
                    module = importlib.util.module_from_spec(spec)
                    spec.loader.exec_module(module)
                    response = await module.execute(angel_one_data)
                    response = JSONResponse(content=response, status_code=200)
                    print("angel done", response)
                # elif broker == "flattrade":
                #     print('flattrade entered')
                #     existing_record.enabled = True
                #     db.commit()
                #     print('1')
                #     flattrade_data = FlatTradeVerificationRequest(
                #         userName = data.userId,
                #         pswrd = data.password,
                #         apikey = data.apiKey,
                #         qrcode = data.qrCode,
                #         secretKey = data.secretKey
                #     )
                #     print('2')
                #     spec = importlib.util.spec_from_file_location(broker, module_path)
                #     module = importlib.util.module_from_spec(spec)
                #     spec.loader.exec_module(module)
                #     response = await module.execute(flattrade_data)
                
                # else:
                #     raise HTTPException(status_code=400, detail=f"Broker {broker} is not supported.")
                if response:
                    # Update any necessary information in the existing record
                    existing_record.broker = broker
                    existing_record.display_name = data.display_name
                    existing_record.max_profit = float(data.max_profit)
                    existing_record.max_loss = float(data.max_loss)
                    db.commit()
                return response
            if broker == 'angelone':
                print('angelone entered')
                angel_one_data = AngelOneLoginRequest(
                        mainUser=data.mainUser,
                        userId=data.userId,
                        password=data.password,
                        apiKey=data.apiKey,
                        qrCode=data.qrCode,
                    )
                spec = importlib.util.spec_from_file_location(broker, module_path)
                module = importlib.util.module_from_spec(spec)
                spec.loader.exec_module(module)
                response = await module.execute(angel_one_data)
                response = JSONResponse(content=response, status_code=200)
                print("angel done", response)
            # elif broker == "flattrade":
            #         print('flattrade entered')
            #         # existing_record.enabled = True
            #         # db.commit()
            #         try:
            #             flattrade_data = FlatTradeVerificationRequest(
            #             userId=data.userId,
            #             password=data.password,
            #             apiKey=data.apiKey,
            #             qrCode=data.qrCode,
            #             secretKey = data.secretKey
            #             )
            #             print('1')
            #         except Exception as e:
            #                 print(e)
            #         spec = importlib.util.spec_from_file_location(broker, module_path)
            #         print('2')
            #         module = importlib.util.module_from_spec(spec)
            #         print('3')
            #         spec.loader.exec_module(module)
            #         print('4')
            #         response = await module.execute(flattrade_data)
            #         print(response)
            # else:
            #     raise HTTPException(status_code=400, detail=f"Broker {broker} is not supported.")
            response_code = response.status_code
            print(response_code)
            if response_code == 200 or response_code == '200 OK':
                user = db.query(User).filter(User.username == username).first()
                if not user:
                    raise HTTPException(status_code=404, detail="User not found.")
                print("user : ",user,"\n\n\n\n")
                # current_broker_count = len([
                #     bc for bc in user.broker_credentials if bc.broker != 'pseudo_account'
                # ])
                # # Check subscription limits
                # if user.num_of_users ==0:
                #     return JSONResponse({"message": "Subscription Expired.Renew your Subscription Plan"}), 403
                
                # elif user.is_on_trial and current_broker_count >= user.num_of_users:
                #     return JSONResponse({"message": "Your trial subscription plan does not allow adding more broker accounts."}), 403
                # elif not user.is_on_trial and current_broker_count >= user.num_of_users:
                #     return JSONResponse({"message": "You have reached the limit for adding Deemat accounts on your current plan."}), 403
    
                if user:
                    encrypted_password = encrypt_data(data.password)
                    encrypted_api_key = encrypt_data(data.apiKey) if data.apiKey else None
                    encrypted_qr_code = encrypt_data(data.qrCode)
                    encrypted_secret_key = encrypt_data(data.secretKey) if data.secretKey else None
                    encrypted_imei = encrypt_data(data.imei) if data.imei else None
                    print(response)
                    broker_credentials = BrokerCredentials(
                        user=user,
                        username=username,
                        broker=broker,
                        broker_user_id = data.userId,
                        # available_balance = data.balance,
                        display_name = data.display_name,
                        max_profit = data.max_profit,
                        max_loss = data.max_loss,
                        client_id = data.client_id if data.client_id in data else None,
                        vendor_code = data.vendor_code if data.vendor_code in data else None,
                        # redirect_url = data['REDIRECT_URI'] if 'REDIRECT_URI' in data else None,
                        password=encrypted_password.decode(),
                        api_key=encrypted_api_key.decode() if encrypted_api_key else None,
                        qr_code=encrypted_qr_code.decode(),
                        secret_key=encrypted_secret_key.decode() if encrypted_secret_key else None,
                        imei=encrypted_imei.decode() if encrypted_imei else None,
                        enabled = True
                    )
                    db.add(broker_credentials)
                    db.commit()
                    
            return response
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error in validation: {str(e)}")

    def get_startegy_account(self, username: str, db: Session = Depends(get_db)):
        try:
            user = db.query(User).filter(User.username == username).first()
            if not user:
                response_data = ERROR_HANDLER.database_errors("user", "User not found.")
                return JSONResponse(content=response_data, status_code=404)
            enabled_credentials = db.query(BrokerCredentials).filter(
                BrokerCredentials.user_id == user.id,
                BrokerCredentials.enabled
            ).all()
            if not enabled_credentials:
                raise HTTPException(status_code=404, detail="No enabled broker credentials found.")
            response_data ={
                'message': 'Login successful',
                'data': []
            }
            for credential in enabled_credentials:
                multipliers = db.query(StrategyMultipliers).filter(
                    StrategyMultipliers.broker_user_id == credential.broker_user_id
                ).all()
                print(multipliers)
                strategy_tags = {}
                for multiplier in multipliers:
                    strategy_tags[multiplier.strategy_id] = multiplier.multiplier
                response_data['data'].append({
                    'broker': credential.broker,
                    'broker_id': credential.broker_user_id,
                    'display_name': credential.display_name,
                    'Login enabled': credential.enabled,
                    'available balance': credential.available_balance,
                    'multipliers': strategy_tags
                })
            return response_data
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error in validation: {str(e)}")
    
    def delete_broker_account(self, username, broker_user_id,broker, db: Session = Depends(get_db)):
        try:
            print("entered the delete function", username, broker_user_id,broker)
            existing_record = db.query(BrokerCredentials).filter_by(broker_user_id=broker_user_id, username = username).first()
            print("existing_record : ",existing_record)
            if not existing_record:
                response_data = ERROR_HANDLER.database_errors("broker_credentials", 'Broker credentials not found')
                return JSONResponse(content=response_data, status_code=404)
            try:
                pass
                related_strategies = db.query(Strategies).filter(
                Strategies.broker_user_id.contains(broker_user_id),
                Strategies.broker.contains(broker)
                ).all()
                for strategy in related_strategies:
                    broker_user_ids = strategy.broker_user_id.split(',')
                    brokers = strategy.broker.split(',')
                    if ',' not in strategy.broker_user_id and ',' not in strategy.broker:
                        # Strategy has a single broker_user_id and broker
                        db.delete(strategy)
                    else:
                        # Strategy has multiple broker_user_ids and brokers
                        broker_user_ids = [bid.strip() for bid in broker_user_ids if bid.strip() != broker_user_id.strip()]
                        brokers = [br.strip() for br in brokers if br.strip() != broker.strip()]

                        strategy.broker_user_id = ','.join(broker_user_ids)
                        strategy.broker = ','.join(brokers)
                    db.query(StrategyMultipliers).filter_by(strategy_id=strategy.id, broker_user_id=broker_user_id).delete()
            except Exception as e:
                print(f"Error deleting strategy: {str(e)}")
                return JSONResponse(content=e, status_code=500)
            db.delete(existing_record)
            db.commit()
            response_data = {'message': 'Broker account deleted successfully'}
            return JSONResponse(content=response_data, status_code=200)
        except Exception as e:
            response_data = ERROR_HANDLER.database_errors("delete_broker_account", str(e))
            return JSONResponse(content=response_data, status_code=500)
    
    def update_password(self, username, broker_user_id,new_password, db: Session = Depends(get_db)):
        try:
            print('entered update')
            # new_password = password
            print(new_password)
            existing_record = db.query(BrokerCredentials).filter_by(broker_user_id=broker_user_id,username=username).first()
            print("existing_record : ",existing_record)
            if existing_record:
                encrypted_password = encrypt_data(new_password)
                existing_record.password = encrypted_password.decode()
                db.commit()
                response_data = {'message': 'Password updated successfully'}
                return JSONResponse(content=response_data, status_code=200)
        except ValueError as ve:
            response_data = ERROR_HANDLER.fastAPI_errors(str(ve))
            return JSONResponse(content=response_data, status_code=400)
        except Exception as e:
            response_data = ERROR_HANDLER.fastAPI_errors(str(e))
            return JSONResponse(content=response_data, status_code=500)
    
    def logout(self, username, broker_user_id, db: Session = Depends(get_db)):
        logout_account = db.query(BrokerCredentials).filter_by(broker_user_id=broker_user_id,username=username).first()

        if logout_account:
            logout_account.enabled = False
            db.commit()
            response_data = {'message': 'Logout successful'}
            return JSONResponse(content=response_data, status_code=200)
        else:
            response_data = ERROR_HANDLER.database_errors("broker_credentials", 'Invalid Details')
            return JSONResponse(content=response_data, status_code=400)
    
    def forget_password(self,username, db: Session = Depends(get_db)):
        application_user = db.query(User).filter_by(username=username).first()
        if application_user:
            otp = generate_6otp()
            application_user.otp = otp
            db.commit()
            msg = MessageSchema(
                subject="Account Verification",
                recipients=[application_user.email],
                # body=f"Your OTP for password reset is: {otp}",
                subtype="html"
            )
            msg.body = f'Hi { application_user.name },\n\n OTP for resetting your password { otp }.'
            fm = FastMail(conf)
            fm.send_message(msg)
            response_data = {'message': f'OTP generated successfully please check your email {application_user.email}'}
            return JSONResponse(content=response_data, status_code=200)
        else:
            response_data = ERROR_HANDLER.database_errors("user", 'User with email does not exist !')
            return JSONResponse(content=response_data, status_code=500)
    
    def verify_otp(self,username, request:Request, db: Session = Depends(get_db)):
        data = request.json()
        entered_otp = data.get('otp')
        application_user = db.query(User).filter_by(username=username).first()
        if application_user.otp == entered_otp:
            response_data = {'message': 'OTP verified successfully, Please change your Password !!'}
            return JSONResponse(content=response_data, status_code=200)
        else:
            response_data = ERROR_HANDLER.database_errors("user", 'Invalid OTP please verify again !!')
            return JSONResponse(content=response_data, status_code=400)
        
    def change_password(self,username,password,confirm_password, db: Session = Depends(get_db)):
        appilcation_user = db.query(User).filter_by(username=username).first()
        if check_password_hash(appilcation_user.password, password):
            response_data = ERROR_HANDLER.database_errors("user", 'Old password and new password should not be same !!')
            return JSONResponse(content=response_data, status_code=200)
        else:
            if password == confirm_password:
                appilcation_user.password = generate_password_hash(password, method='pbkdf2:sha256')
                db.commit()
                response_data = {'message': 'Password changed successfully'}
                return JSONResponse(content=response_data, status_code=200)
            else:
                response_data = ERROR_HANDLER.database_errors("user", 'Password and confirm password should be same !!')
                return JSONResponse(content=response_data, status_code=200)
            
    def update_user_data(self,data: dict, username, broker_user_id, db: Session = Depends(get_db)):
        user = db.query(User).filter(User.username == username).first()
        
        if not user:
            response_data = ERROR_HANDLER.database_errors("user", 'User not found')
            return JSONResponse(content=response_data, status_code=404)
        
        user_profile = db.query(BrokerCredentials).filter_by(broker_user_id=broker_user_id,username=username).first()
        if not user_profile:
            response_data = ERROR_HANDLER.database_errors("broker_credentials", 'Broker credentials not found')
            return JSONResponse(content=response_data, status_code=404)
        
        try:
            user_max_profit = data.get('max_profit')
            user_max_loss = data.get('max_loss')
            user_multiplier = data.get('user_multiplier')
            max_loss_per_trade = data.get('max_loss_per_trade')
            max_open_trades = data.get('max_open_trades')
            exit_time = data.get('exit_time')
            
            # Convert exit_time to a datetime.time object if it's provided
            from datetime import datetime
            if exit_time:
                exit_time = datetime.strptime(exit_time, '%H:%M:%S').time()

            # Update the user profile fields
            user_profile.max_profit = user_max_profit
            user_profile.max_loss = user_max_loss
            user_profile.user_multiplier = user_multiplier
            user_profile.max_loss_per_trade = max_loss_per_trade
            user_profile.max_open_trades = max_open_trades
            user_profile.exit_time = exit_time
            
            # Commit changes to the database
            db.commit()
            
            response_data = {'message': f'User data updated successfully for {broker_user_id}'}
            return JSONResponse(content=response_data, status_code=200)
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=500, detail=f"Error in updating user data: {str(e)}")
    
    def update_user_profit_locking(self,data: dict, username, broker_user_id, db: Session = Depends(get_db)):
        user = db.query(User).filter(User.username == username).first()
        if not user:
            response_data = ERROR_HANDLER.database_errors("user", 'User not found')
            return JSONResponse(content=response_data, status_code=404)
        if 'profit_locking' not in data:
            response_data = ERROR_HANDLER.fastAPI_errors("update_user_profit_locking", 'Profit locking data not provided')
            return JSONResponse(content=response_data, status_code=400)
        
        try:
            profit_locking_data = [x for x in data['profit_locking'].split(',')]
            if len(profit_locking_data) != 4:
                raise HTTPException(status_code=400, detail="Invalid profit locking data format")
        except ValueError:
            response_data = ERROR_HANDLER.fastAPI_errors("update_user_profit_locking", 'Invalid profit locking data format')
            return JSONResponse(content=response_data, status_code=400)
        
        credential = db.query(BrokerCredentials).filter_by(broker_user_id=broker_user_id,username=username).first()
        if not credential:
            response_data = ERROR_HANDLER.database_errors("broker_credentials", 'Broker credentials not found')
            return JSONResponse(content=response_data, status_code=404)
        
        credential.profit_locking = ','.join(map(str, profit_locking_data))
        db.commit()
        
        if credential.profit_locking == ",,,":
            credential.reached_profit = 0
            credential.locked_min_profit = 0
            db.commit()
        
        response_data = {'message': 'Profit locking data updated successfully for {brooker_user_id}'}
        return JSONResponse(content=response_data, status_code=200)
        
    def update_user_profit_trail_values(self, data: dict,username,broker_user_id, db: Session = Depends(get_db)):
        exisiting_user = db.query(User).filter(User.username == username).first()
        if not exisiting_user:
            response_data = ERROR_HANDLER.database_errors("user", 'User not found')
            return JSONResponse(content=response_data, status_code=404)
        
        broker_id =  db.query(BrokerCredentials).filter_by(broker_user_id=broker_user_id,username=username).first()
        print("broker_id",broker_id)
        if not broker_id:
            response_data = ERROR_HANDLER.database_errors("broker_credentials", 'Broker credentials not found')
            return JSONResponse(content=response_data, status_code=404)
        
        reached_profit = data.get('reached_profit', broker_id.reached_profit)
        locked_min_profit = data.get('locked_min_profit', broker_id.locked_min_profit)
        
        broker_id.reached_profit = reached_profit
        broker_id.locked_min_profit = locked_min_profit
        db.commit()
        response_data = {'message': 'Profit trail values updated successfully'}
        return JSONResponse(content=response_data, status_code=200)
        
    def update_pseudo_balance(self,data: dict, username, broker_user_id, db: Session = Depends(get_db)):
        user = db.query(User).filter(User.username == username).first()
        if not user:
            response_data = ERROR_HANDLER.database_errors("user", 'User not found')
            return JSONResponse(content=response_data, status_code=404)
        
        user_profile = db.query(BrokerCredentials).filter_by(broker_user_id=broker_user_id,username=username).first()
        available_balance = data.get('available_balance')
        user_profile.available_balance = available_balance
        db.commit()
        response_data = {'message': 'Pseudo balance updated successfully for {broker_user_id}'}
        return JSONResponse(content=response_data, status_code=200)
            
    def square_off_maxloss_per_trade(self,data: dict,username, trading_symbol, broker_type, broker_user_id, db: Session = Depends(get_db)):
            try:
                # Fetch existing user
                existing_user = db.query(User).filter_by(username=username).first()
                if not existing_user:
                    response_data = ERROR_HANDLER.database_errors("user", "User does not exist")
                    return JSONResponse(content=response_data, status_code=404)
                
                user_id = existing_user.id
    
                # Fetch the specific executed portfolio leg
                executed_portfolio_details = db.query(ExecutedPortfolio).filter_by(user_id=user_id, trading_symbol=trading_symbol).first()
                print("executed_portfolio_details:", executed_portfolio_details)
                if not executed_portfolio_details:
                    response_data = ERROR_HANDLER.database_errors("executed_portfolio", "No open positions found for the specified portfolio leg.")
                    return JSONResponse(content=response_data, status_code=200)
                
                try:
                    if broker_type == "flattrade":
                        try:
                            flattrade = config.flattrade_api[broker_user_id]
                        except KeyError:
                            response_data = {"message": "Broker user ID not found"}
                            return JSONResponse(content=response_data, status_code=500)
                        
                        if not executed_portfolio_details.square_off:
                            for executedPortfolio in executed_portfolio_details:
                                flattrade_square_off = flattrade.place_order(
                                    buy_or_sell="S" if executedPortfolio.transaction_type == "BUY" else "B",
                                    product_type="I" if executedPortfolio.product_type == "MIS" else "M",
                                    exchange=executedPortfolio.exchange,
                                    tradingsymbol=executedPortfolio.trading_symbol,
                                    quantity=executedPortfolio.netqty,
                                    discloseqty=0,
                                    price_type='MKT',
                                    price=0,
                                    trigger_price=None,
                                    retention='DAY',
                                    remarks=executedPortfolio.strategy_tag
                                )
                            
                                order_book_send = config.flattrade_api[broker_user_id].get_order_book()
                                positions_info = config.flattrade_api[broker_user_id].get_positions()
                                holdings_info  = config.flattrade_api[broker_user_id].get_holdings()
                                print("\n\n\n\n")
                                print("order_book_send:", order_book_send)
                                config.all_flattrade_details[broker_user_id] = {
                                    'order': order_book_send,
                                    "holdings": holdings_info,
                                    "positions": positions_info
                                }
        
                                if flattrade_square_off['stat'] == 'Ok':
                                    executedPortfolio.square_off = True
                                    last_avgprc = order_book_send[0]['avgprc']
                                    print("sell_price:",last_avgprc)
                                    executedPortfolio.sell_price = last_avgprc
                                    db.commit()
                                    response_data = {'message': 'Max loss per trade square off successfully', 'Square_off': flattrade_square_off}
                                    return JSONResponse(content=response_data, status_code=200)
                                else:
                                    response_data = {'message': 'Square off failed. No open positions found.'}
                                    return JSONResponse(content=response_data, status_code=200)
                    elif broker_type == "fyers":
                        try:
                            fyers = config.OBJ_fyers[broker_user_id]
                            print(fyers)
                        except KeyError:
                            response_data = {"message": "Broker user ID not found"}
                            return JSONResponse(content=response_data, status_code=500)
                        
                        if not executed_portfolio_details.square_off:
                            for executedPortfolio in executed_portfolio_details:
                                data = {
                                    "orderTag": executedPortfolio.strategy_tag,
                                    "segment": [10],
                                    'id': executedPortfolio.order_id,
                                    "side": [config.fyers_data['Side'][executedPortfolio.transaction_type]]
                                }
                                square_off = fyers.exit_positions(data)
                                print(square_off)
                            
                                fyers_order = config.OBJ_fyers[broker_user_id].orderbook()
                                fyers_position = config.OBJ_fyers[broker_user_id].positions()
                                fyers_holdings = config.OBJ_fyers[broker_user_id].holdings()
                                config.fyers_orders_book[broker_user_id] = {"orderbook": fyers_order, "positions": fyers_position, "holdings": fyers_holdings}
                                
                                if square_off['s'] == 'ok':
                                    executedPortfolio.square_off = True
                                    if executedPortfolio.transaction_type=="BUY":
                                        executedPortfolio.sell_price=square_off['tradedPrice']
                                    else:
                                        executedPortfolio.buy_price=square_off['tradedPrice']
                                    db.commit()
                                    response_data = {'message': 'Max loss per trade square off successfully', 'Square_off': square_off}
                                    return JSONResponse(content=response_data, status_code=200)
                                else:
                                    response_data = ERROR_HANDLER.fastAPI_errors("square_off_maxloss_per_trade", 'Square off failed. No open positions found.')
                                    return JSONResponse(content=response_data, status_code=200)
                    elif broker_type == "angelone":
                            try:
                                angelone = config.SMART_API_OBJ_angelone[broker_user_id]
                            except KeyError:
                                response_data = {"message": "Broker user ID not found"}
                                return JSONResponse(content=response_data, status_code=500)
                            
                            if not executed_portfolio_details.square_off:
                                for executedPortfolio in executed_portfolio_details:
                                    data = {
                                        "variety": executedPortfolio.variety,
                                        "orderTag": executedPortfolio.strategy_tag,
                                        "tradingsymbol": executedPortfolio.trading_symbol,
                                        "symboltoken": executedPortfolio.symbol_token,
                                        "exchange": executedPortfolio.exchange,
                                        "quantity": int(executedPortfolio.netqty),
                                        "producttype": "INTRADAY" if executedPortfolio.product_type == "MIS" else "CARRYFORWARD",
                                        "transactiontype": "SELL" if executedPortfolio.transaction_type == "BUY" else "BUY",
                                        "price": executedPortfolio.price,
                                        "duration": executedPortfolio.duration,
                                        "ordertype": "MARKET"
                                    }
                                    angelone_square_off = angelone.placeOrderFullResponse(data)
                                    print(angelone_square_off)
                                    order = config.SMART_API_OBJ_angelone[broker_user_id].orderBook()
                                    positions = config.SMART_API_OBJ_angelone[broker_user_id].position()
                                    holdings = config.SMART_API_OBJ_angelone[broker_user_id].holding()
                                    all_holdings = config.SMART_API_OBJ_angelone[broker_user_id].allholding()
                                    config.all_angelone_details[broker_user_id] = {"orderbook": order, "positions": positions, "holdings": holdings, "all_holdings": all_holdings}
                                    if angelone_square_off['message'] == 'SUCCESS':
                                        executedPortfolio.square_off = True
                                        if executedPortfolio.transaction_type=="BUY":
                                            executedPortfolio.sell_price=order['data'][::-1][0]['averageprice']
                                        else:
                                            executedPortfolio.buy_price=order['data'][::-1][0]['averageprice']
                                        db.commt()
                                        response_data = {'message': 'Portfolio leg manual square off successfully', 'Square_off': angelone_square_off}
                                        return JSONResponse(content=response_data, status_code=200)
                                    else:
                                        response_data = ERROR_HANDLER.database_errors("executed_portfolio", 'Square off failed. No open positions found.')
                                        return JSONResponse(content=response_data, status_code=200)
                    elif broker_type == "pseudo_account":
                        data = {"broker_user_id" : broker_user_id, "username" : username, "broker_type" : broker_type, "trading_symbol" : trading_symbol, "exchange" : "NFO"}

                        pseudo_api = PseudoAPI(data=data)
                        square_off_response = pseudo_api.square_off()

                        response_data = {'message': square_off_response}
                        return JSONResponse(content=response_data, status_code=200)
                
                except KeyError:
                    response_data = ERROR_HANDLER.fastAPI_errors("square_off_maxloss_per_trade", "Broker user ID not found.")
                    return JSONResponse(content=response_data, status_code=500)
            except KeyError:
                    response_data = ERROR_HANDLER.fastAPI_errors("square_off_maxloss_per_trade", "Broker user ID not found.")
                    return JSONResponse(content=response_data, status_code=500)
    
    def square_off_equity_maxloss_per_trade(self,username, trading_symbol, broker_type, broker_user_id,db: Session = Depends(get_db)):
            try:
                # Fetch existing user
                existing_user = db.query(User).filter_by(username=username).first()
                if not existing_user:
                    response_data = {'message': "User does not exist"}
                    return JSONResponse(content=response_data, status_code=404)
                
                user_id = existing_user.id
    
                # Fetch the specific executed portfolio leg
                executed_portfolio_details = db.query(ExecutedEquityOrders).filter_by(user_id=user_id, trading_symbol=trading_symbol).first()
                print("executed_portfolio_details:", executed_portfolio_details)
                if not executed_portfolio_details:
                    response_data = {'message': "No open positions found for the specified stock symbol."}
                    return JSONResponse(content=response_data, status_code=200)
                
                try:
                    if broker_type == "flattrade":
                        try:
                            flattrade = config.flattrade_api[broker_user_id]
                        except KeyError:
                            response_data = {"message": "Broker user ID not found"}
                            return JSONResponse(content=response_data, status_code=500)
                        
                        if not executed_portfolio_details.square_off:
                            for executedPortfolio in executed_portfolio_details:
                                flattrade_square_off = flattrade.place_order(
                                    buy_or_sell="S" if executedPortfolio.transaction_type == "BUY" else "B",
                                    product_type="I" if executedPortfolio.product_type == "MIS" else "C",
                                    exchange="NSE",
                                    tradingsymbol=executedPortfolio.trading_symbol,
                                    quantity=executedPortfolio.quantity,
                                    discloseqty=0,
                                    price_type='MKT',
                                    price=0,
                                    trigger_price=None,
                                    retention='DAY',
                                    remarks=executedPortfolio.strategy_tag
                                )
                            
                                order_book_send = config.flattrade_api[broker_user_id].get_order_book()
                                positions_info = config.flattrade_api[broker_user_id].get_positions()
                                holdings_info  = config.flattrade_api[broker_user_id].get_holdings()
                                print("\n\n\n\n")
                                print("order_book_send:", order_book_send)
                                config.all_flattrade_details[broker_user_id] = {
                                    'order': order_book_send,
                                    "holdings": holdings_info,
                                    "positions": positions_info
                                }
                                
                                if flattrade_square_off['stat'] == 'Ok':
                                    executedPortfolio.square_off = True
                                    last_avgprc = order_book_send[0]['avgprc']
                                    print("sell_price:",last_avgprc)
                                    executedPortfolio.sell_price = last_avgprc
                                    db.commit()
                                    response_data = {'message': 'Max loss per trade square off successfully', 'Square_off': flattrade_square_off}
                                    return JSONResponse(content=response_data, status_code=200)
                                else:
                                    response_data = {'message': 'Square off failed. No open positions found.'}
                                    return JSONResponse(content=response_data, status_code=200)
                                
                    elif broker_type == "fyers":
                        try:
                            fyers = config.OBJ_fyers[broker_user_id]
                            print(fyers)
                        except KeyError:
                            response_data = {"message": "Broker user ID not found"}
                            return JSONResponse(content=response_data, status_code=500)
                    
                        if not executed_portfolio_details.square_off:
                            for executedPortfolio in executed_portfolio_details:
                                symbol = executedPortfolio.trading_symbol
                                product_type = "CNC" if executedPortfolio.product_type == 'NRML' else "INTRADAY"
                                symbol_id=symbol +'-'+ product_type
                                data = {
                                    "id":symbol_id
                                }
                                square_off = fyers.exit_positions(data=data)
                                print(square_off)
                            
                                fyers_order = config.OBJ_fyers[broker_user_id].orderbook()
                                fyers_position = config.OBJ_fyers[broker_user_id].positions()
                                fyers_holdings = config.OBJ_fyers[broker_user_id].holdings()
                                config.fyers_orders_book[broker_user_id] = {"orderbook": fyers_order, "positions": fyers_position, "holdings": fyers_holdings}
                                
                                if square_off['s'] == 'ok':
                                    executedPortfolio.square_off = True
                                    if executedPortfolio.transaction_type=="BUY":
                                       executedPortfolio.sell_price=square_off['tradedPrice']
                                    else:
                                       executedPortfolio.buy_price=square_off['tradedPrice']
                                    db.commit()
                                    response_data = {'message': 'Maxloss per trade manual square off successfully', 'Square_off': square_off}
                                    return JSONResponse(content=response_data, status_code=200)
                                else:
                                    response_data = ERROR_HANDLER.fastAPI_errors("square_off_equity_maxloss_per_trade", 'Square off failed. No open positions found.')
                                    return JSONResponse(content=response_data, status_code=200)
                                
                    elif broker_type == "angelone":
                            try:
                                angelone = config.SMART_API_OBJ_angelone[broker_user_id]
                            except KeyError:
                                response_data = {"message": "Broker user ID not found"}
                                return JSONResponse(content=response_data, status_code=500)
                            if not executed_portfolio_details.square_off:
                                for executedPortfolio in executed_portfolio_details:
                                    data = {
                                        "variety": "NORMAL",
                                        "orderTag": executedPortfolio.strategy_tag,
                                        "tradingsymbol": executedPortfolio.trading_symbol,
                                        "symboltoken": executedPortfolio.symbol_token,
                                        "exchange": "NSE",
                                        "quantity": int(executedPortfolio.netqty),
                                        "producttype": "INTRADAY" if executedPortfolio.product_type == "MIS" else "DELIVERY",
                                        "transactiontype": "SELL" if executedPortfolio.transaction_type == "BUY" else "BUY",
                                        "price": 0,
                                        "duration": "DAY",
                                        "ordertype": "MARKET"
                                    }
                                    angelone_square_off = angelone.placeOrderFullResponse(data)
                                    print(angelone_square_off)
                                    order = config.SMART_API_OBJ_angelone[broker_user_id].orderBook()
                                    positions = config.SMART_API_OBJ_angelone[broker_user_id].position()
                                    holdings = config.SMART_API_OBJ_angelone[broker_user_id].holding()
                                    all_holdings = config.SMART_API_OBJ_angelone[broker_user_id].allholding()
                                    config.all_angelone_details[broker_user_id] = {"orderbook": order, "positions": positions, "holdings": holdings, "all_holdings": all_holdings}
                                    if angelone_square_off['message'] == 'SUCCESS':
                                        executedPortfolio.square_off = True
                                        if executedPortfolio.transaction_type=="BUY":
                                            executedPortfolio.sell_price=order['data'][::-1][0]['averageprice']
                                        else:
                                            executedPortfolio.buy_price=order['data'][::-1][0]['averageprice']
                                        db.commit()
                                        response_data = {'message': 'Maxloss per trade square off successfully', 'Square_off': angelone_square_off}
                                        return JSONResponse(content=response_data, status_code=200)
                                    else:
                                        response_data = ERROR_HANDLER.database_errors("executed_portfolio", 'Square off failed. No open positions found.')
                                        return JSONResponse(content=response_data, status_code=200)
                    
                    elif broker_type == "pseudo_account":
                        # Ensure broker_user_id is available in data
                        # data = request.json
                        broker_user_id = data['broker_user_id']
                        print("broker_user_id:", broker_user_id, "\n\\n\n\n\n")
                        trading_symbol = data['trading_symbol']
                        broker_type = data['broker_type']
                        existing_equity_orders = ExecutedEquityOrders.query.filter_by(
                            user_id=user_id,
                            broker_user_id=broker_user_id,
                            trading_symbol=trading_symbol,
                            square_off=False
                        ).all()
                    
                        print(existing_equity_orders, "\n\n\n\n\n\n")  # Debugging line
                        
                        sell_order_id = random.randint(10*14, 10*15 - 1)
                        from datetime import datetime
                        
                        for equity_order in existing_equity_orders:
                            token = equity_order.symbol_token
                            sell_price = config.angelone_live_ltp[token]
                            equity_order.sell_price = sell_price
                            equity_order.squared_off_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                            equity_order.square_off = True
                            equity_order.sell_qty = equity_order.buy_qty
                            equity_order.sell_order_id = sell_order_id
                            db.commit()
                        
                        response_data = {'message': "Equity Square Off Successful (Max loss per trade level) !!"}
                        return JSONResponse(content=response_data, status_code=200)
                    
                except KeyError:
                    response_data = ERROR_HANDLER.fastAPI_errors("square_off_equity_maxloss_per_trade", "Broker user ID not found.")
                    return JSONResponse(content=response_data, status_code=500)
            except KeyError:
                response_data = ERROR_HANDLER.fastAPI_errors("square_off_equity_maxloss_per_trade", "Broker user ID not found.")
                return JSONResponse(content=response_data, status_code=500)
    
    
    
    
    def execcute_broker_integration(self, broker, username, db: Session = Depends(get_db)):
        try:
            user = db.query(User).filter(User.username == username).first()
            if not user:
                raise HTTPException(status_code=404, detail="User not found.")
            return {"message": f"Broker integration executed for {username} with {broker}"}
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error in broker integration: {str(e)}")
       
router = APIRouter()

@router.post(USERSETTING_ROUTES.get_routes('validation'))
async def validate_account(request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    print('data', data)
    user_data = data['users'][0]
    print("Incoming data:", user_data) 
    integration = BrokerIntegration()
    return await integration.account_validation(AccountValidationData(**user_data), db)
@router.get("/read")
async def execute_broker_integration(request: Request, db: Session = Depends(get_db)):
    try:
        data = await request.json()
        broker = data['broker']
        username = data['username']
        user = db.query(User).filter(User.username == username).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found.")
        return {"message": f"Broker integration executed for {username} with {broker}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in broker integration: {str(e)}")
    
# FastAPI Function for Deleting all the broker accounts
@router.delete(USERSETTING_ROUTES.get_routes('delete_broker_account'))
async def delete_broker_account(username: str, broker_user_id: str, broker: str, db: Session = Depends(get_db)):
    integration = BrokerIntegration()
    return integration.delete_broker_account(username, broker_user_id, broker, db)

@router.put(USERSETTING_ROUTES.get_routes('update_password'))
async def update_password(username: str, broker_user_id: str, password: str,  db: Session = Depends(get_db)):
    integration = BrokerIntegration()
    return integration.update_password(username, broker_user_id, password, db)

@router.post(USERSETTING_ROUTES.get_routes('logout'))
async def logout(username: str, broker_user_id: str, db: Session = Depends(get_db)):
    integration = BrokerIntegration()
    return integration.logout(username, broker_user_id, db)

@router.post(USERSETTING_ROUTES.get_routes('forgot_password'))
async def forget_password(username: str, db: Session = Depends(get_db)):
    integration = BrokerIntegration()
    return integration.forget_password(username, db)

@router.post(USERSETTING_ROUTES.get_routes('verify_otp'))
async def verify_otp(username: str, request: Request, db: Session = Depends(get_db)):
    integration = BrokerIntegration()
    return integration.verify_otp(username, request, db)

@router.post(USERSETTING_ROUTES.get_routes('get_strategy_account'))
def get_strategy_account(username: str, db: Session = Depends(get_db)):
    integration = BrokerIntegration()
    return integration.get_startegy_account(username, db)