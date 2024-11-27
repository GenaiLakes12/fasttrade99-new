from datetime import datetime, timezone, time
from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey, DateTime, Text, Time, Numeric
from sqlalchemy.orm import relationship
from app.database.connection import Base, engine

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    username = Column(String(50), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    mobile = Column(String(20), unique=True, nullable=False)
    
    max_loss = Column(String(500), default="0")
    max_profit = Column(String(500), default="0")
    subscription_start_date = Column(DateTime(timezone=True), default=datetime.now(timezone.utc))
    subscription_end_date = Column(DateTime(timezone=True))
    is_on_trial = Column(Boolean, default=True)
    num_of_users = Column(Integer, default=1)  
    subscription_type = Column(String(50), default='Free_Trial')  
    payment_order_id = Column(String(100), nullable=True)  
    payment_amount = Column(String(100), default="0") 
    payment_mode = Column(String(100), nullable=True) 
    renewal_period = Column(String(100))
    is_admin = Column(Boolean, default=False)
    
    broker_credentials = relationship("BrokerCredentials", back_populates="user", lazy=True)
    strategies = relationship('Strategies', back_populates="user", lazy=True)  # Establish relationship with Strategies

class Broker(Base):
    __tablename__ = 'brokers'
    
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    name = Column(String(100), unique=True, nullable=False)
    renewal_period = Column(String(100))

class BrokerCredentials(Base):
    __tablename__ = "broker_credentials"

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    username = Column(String(50))
    broker = Column(String(500))
    broker_user_id = Column(String(500))
    password = Column(Text)  # encrypted password
    api_key = Column(Text)   # encrypted API key
    qr_code = Column(Text)   # encrypted QR code
    secret_key = Column(Text, nullable=True)  # encrypted secret key
    client_id = Column(String(50))
    imei = Column(Text, nullable=True)  # encrypted IMEI
    vendor_code = Column(String(150))
    margin = Column(Text)
    enabled = Column(Boolean, default=True)
    display_name = Column(String(500))
    redirect_url = Column(String(500))
    max_loss = Column(String(500), default="0")
    max_profit = Column(String(500), default="0")
    profit_locking = Column(String(500), default=',,,')
    reached_profit = Column(Float, default=0)  
    locked_min_profit = Column(Float, default=0)
    available_balance = Column(String(500), default="0.00")
    user_multiplier = Column(String(500), default="1")
    max_loss_per_trade = Column(String(500), default="0")
    utilized_margin = Column(String(500), default="0")
    max_open_trades = Column(String(500), default="1")
    exit_time = Column(Time, default=time(0, 0, 0))

    user = relationship("User", back_populates="broker_credentials")

class Strategies(Base):
    __tablename__ = 'strategies'

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    alias = Column(String(50))
    strategy_tag = Column(String(50), unique=True, nullable=False)
    broker = Column(String(500))
    broker_user_id = Column(String(500))
    max_loss = Column(String(500), default="0")
    max_profit = Column(String(500), default="0")
    profit_locking = Column(String(500), default=',,,')
    reached_profit = Column(Float, default=0)
    locked_min_profit = Column(Float, default=0)
    open_time = Column(Time, default=time(0, 0, 0))
    close_time = Column(Time, default=time(0, 0, 0))
    square_off_time = Column(Time, default=time(0, 0, 0))
    allowed_trades = Column(String(100), default="Both")
    entry_order_retry = Column(Boolean, default=False)
    entry_retry_count = Column(String(100), default="0")
    entry_retry_wait = Column(String(500), default="0")
    exit_order_retry = Column(Boolean, default=False)
    exit_retry_count = Column(String(100), default="0")
    exit_retry_wait = Column(String(500), default="0")
    exit_max_wait = Column(String(500), default="0")

    # Relationship to StrategyMultipliers
    multipliers = relationship('StrategyMultipliers', back_populates='strategy', lazy=True, cascade="all, delete-orphan")

    # Missing relationship to User
    user = relationship("User", back_populates="strategies")

class StrategyMultipliers(Base):
    __tablename__ = 'strategy_multipliers'

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    strategy_id = Column(Integer, ForeignKey('strategies.id'), nullable=False)
    broker_user_id = Column(String(50), nullable=False)
    multiplier = Column(String(50))

    # Define the relationship back to Strategies
    strategy = relationship('Strategies', back_populates='multipliers')

class Portfolio(Base):
    __tablename__ = 'portfolio'

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    strategy = Column(String(500))
    strategy_accounts = Column(String(500))
    strategy_accounts_id = Column(String(500))
    variety = Column(String(50))
    order_type = Column(String(500))
    product_type = Column(String(500))
    duration = Column(String(500))
    exchange = Column(String(50))
    portfolio_name = Column(String(500), unique=False)
    remarks = Column(String(500))
    symbol = Column(String(500))
    enabled = Column(Boolean, default=False)
    start_time = Column(Time)
    end_time = Column(Time)
    square_off_time = Column(Time)
    buy_trades_first = Column(Boolean, default=False)

class PortfolioLegs(Base):  # Renamed class for better naming convention (camel case with no underscores)
    __tablename__ = 'portfolio_legs'  # Changed table name to follow consistent naming conventions

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    portfolio_id = Column(Integer, ForeignKey('portfolio.id'))  # ForeignKey added to link with Portfolio
    portfolio_name = Column(String(500), unique=False)
    transaction_type = Column(String(500))
    option_type = Column(String(500))
    lots = Column(String(500))
    expiry_date = Column(String(500))
    strike = Column(String(500))
    quantity = Column(String(500))
    target = Column(String(500), default="None")
    tgt_value = Column(String(500))
    trail_tgt = Column(String(500))
    stop_loss = Column(String(500), default="None")
    sl_value = Column(String(500))
    trail_sl = Column(String(500))
    limit_price = Column(String(500))
    
class ExecutedPortfolio(Base):
    __tablename__ = "executed_portfolios"  # Renamed for better table naming convention

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    strategy_tag = Column(String(100))
    portfolio_name = Column(String(100), unique=False)
    order_id = Column(String(100), unique=False)
    broker_user_id = Column(String(500))
    portfolio_status = Column(Boolean, default=True)  # Renamed for consistency
    transaction_type = Column(String(100))
    trading_symbol = Column(String(100))
    exchange = Column(String(100))
    product_type = Column(String(100))
    net_qty = Column(String(100))  # Renamed for clarity
    symbol_token = Column(String(100))
    variety = Column(String(100))
    duration = Column(String(100))
    price = Column(String(100))
    order_type = Column(String(100))
    status = Column(String(100))
    square_off = Column(Boolean, default=False)
    portfolio_leg_id = Column(Integer)
    reached_profit = Column(Float, default=0)
    locked_min_profit = Column(Float, default=0)
    buy_price = Column(String(100))
    sell_price = Column(String(100))
    master_account_id = Column(Integer, ForeignKey('master_accounts.id'))
    broker = Column(String)
    placed_time = Column(String)
    sell_order_id = Column(String(100), unique=False)
    squared_off_time = Column(String)
    buy_qty = Column(String(100))
    sell_qty = Column(String(100))

class ExecutedEquityOrders(Base):
    __tablename__ = "executed_equity_orders"  # Updated to follow naming conventions

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    order_id = Column(String(100), unique=False)
    sell_order_id = Column(String(100), unique=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    trading_symbol = Column(String(100))
    broker = Column(String(500))
    broker_user_id = Column(String(500))
    quantity = Column(String(500))
    transaction_type = Column(String(100))
    product_type = Column(String(100))
    strategy_tag = Column(String(100))
    buy_price = Column(String(100))
    sell_price = Column(String(100))
    symbol_token = Column(String(100))
    placed_time = Column(String(100))
    squared_off_time = Column(String(100))
    square_off = Column(Boolean, default=False)
    buy_qty = Column(String(100))
    sell_qty = Column(String(100))
    
class MasterAccount(Base):
    __tablename__ = 'master_accounts'
    
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    broker = Column(String, nullable=False)
    broker_user_id = Column(String, unique=True, nullable=False)
    copy_start_time = Column(Time)
    copy_end_time = Column(Time)
    copy_placement = Column(Boolean, default=True)
    copy_cancellation = Column(Boolean, default=True)
    copy_modification = Column(Boolean, default=True)
    parallel_order_execution = Column(Boolean, default=True)
    auto_split_frozen_qty = Column(Boolean, default=True)
    
    # Relationship with ChildAccount
    child_accounts = relationship(
        'ChildAccount', 
        back_populates='master_account', 
        cascade="all, delete-orphan"
    )

class ChildAccount(Base):
    __tablename__ = 'child_accounts'
    
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    broker = Column(String, nullable=False)
    broker_user_id = Column(String, unique=True, nullable=False)
    multiplier = Column(Integer, nullable=False, default=1)
    live = Column(Boolean, default=True)
    master_account_id = Column(Integer, ForeignKey('master_accounts.id'))
    
    # Relationship with MasterAccount
    master_account = relationship('MasterAccount', back_populates='child_accounts')

class Performance(Base):
    __tablename__ = 'portfolio_performance'
    
    id = Column(Integer, primary_key=True)
    portfolio_name = Column(String(100), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    broker_user_id = Column(String(100), nullable=False)
    max_pl = Column(Numeric, nullable=False)
    min_pl = Column(Numeric, nullable=False)
    max_pl_time = Column(Time, nullable=False)
    min_pl_time = Column(Time, nullable=False)


# Create all tables in the database
Base.metadata.create_all(bind=engine)
