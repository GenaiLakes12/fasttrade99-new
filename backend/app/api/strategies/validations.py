from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from app.database.connection import get_db
from app.models.user import (
    # BrokerCredentials,
    User,
    Strategies,
    Portfolio,
    StrategyMultipliers,
)
from .error_handlers import ERROR_HANDLER

# from .routes import STRATEGIE_ROUTES
from fastapi import APIRouter
from fastapi import Depends, Request
from sqlalchemy.orm import Session


# from app.api.brokers import config

router = APIRouter()
app = FastAPI()


# Multileg class for all Multi leg related operations
class Strategies_class:

    async def store_broker_and_strategy_info(
        self, data: dict, username: str, db: Session = Depends(get_db)
    ):
        try:
            # data = await request.json()  # FastAPI uses 'await' for request body parsing
            print("entered into store broker and strategy info")
            # Check if the user exists
            user = db.query(User).filter_by(username=username).first()
            print("user", user)
            if not user:
                response_data = ERROR_HANDLER.database_errors(
                    "{user}", "User Does not exist"
                )
                print(response_data)
                return JSONResponse(content=response_data, status_code=500)

            # Always create a new Strategies record
            strategy = Strategies(user_id=user.id)
            print("strategy", data)
            strategy_tag = data.get("strategy_tag")
            print("strategyLabel 1 printing", strategy_tag)


            print("broker_user_id", data.get("broker_user_id"))
            if (
                len(data.get("broker_user_id", [])) == 0
            ):  # Ensuring 'broker_user_id' is safely accessed
                response_data = ERROR_HANDLER.fast_api_errors(
                    "Store_broker_and_strategy_info",
                    f"Please map the Strategy Tag : {strategy_tag}, to at least one trading account",
                )
                print(response_data)
                return JSONResponse(content=response_data, status_code=500)

            broker_user_id = data.get("broker_user_id", [])
            multipliers = data.get("multiplier", [])
            # Initialize a dictionary to store multipliers for different broker_user_id
            broker_multipliers = {}
            print("entered into broker_multipliers")
            # Iterate through broker_user_id and store corresponding multipliers
            for idx, broker_user_id in enumerate(broker_user_id):
                # Use a default multiplier if the index is out of range in multipliers list
                multiplier = multipliers[idx] if idx < len(multipliers) else None
                broker_multipliers[broker_user_id] = multiplier

            # Debug output
            print("Broker multipliers:", broker_multipliers)

            strategy.strategy_tag = data.get("strategy_tag")
            strategy.alias = data.get("alias")
            strategy.max_profit = data.get("max_profit")
            strategy.max_loss = data.get("max_loss")
            strategy.broker_user_id = "".join(map(str, data.get("broker_user_id", [])))
            strategy.broker = "".join(map(str, data.get("broker", [])))
            print("broker_user_id verification", strategy.broker_user_id)
            try:
                db.add(strategy)
                print("strategy added to db1")
                db.commit()
                print("strategy added to db2")
            except Exception as e:
                print("Error during commit:", e)
                db.rollback()  # Roll back the transaction if there was an error
                response_data = ERROR_HANDLER.database_errors(
                    "Store_broker_and_strategy_info", str(e)
                )
                print(response_data)
                return JSONResponse(content=response_data, status_code=500)

            # Check if strategy_tag is unique
            existing_strategy = (
                db.query(Strategies)
                .filter_by(strategy_tag=strategy.strategy_tag)
                .first()
            )
            existing_portfolio = (
                db.query(Portfolio).filter_by(strategy=strategy.strategy_tag).all()
            )
            print("existing_portfolio check", existing_portfolio)
            if existing_strategy:
                if existing_portfolio:
                    for portfolio in existing_portfolio:
                        portfolio.strategy_accounts_id = "".join(
                            map(str, data.get("broker_user_id", []))
                        )
                        portfolio.strategy_accounts = "".join(
                            map(str, data.get("broker", []))
                        )
                else:
                    pass

                # Changing the strategy
                existing_strategy.alias = data.get("alias")
                existing_strategy.broker_user_id = "".join(
                    map(str, data.get("broker_user_id", []))
                )
                existing_strategy.broker = "".join(map(str, data.get("broker", [])))

                db.add(existing_strategy)
                db.commit()

                # Update multipliers for existing strategy
                for broker_user_id, multiplier in broker_multipliers.items():
                    existing_strategy_multiplier = (
                        db.query(StrategyMultipliers)
                        .filter_by(
                            strategy_id=existing_strategy.id,
                            broker_user_id=broker_user_id,
                        )
                        .first()
                    )
                    if existing_strategy_multiplier:
                        existing_strategy_multiplier.multiplier = multiplier
                    else:
                        new_strategy_multiplier = StrategyMultipliers(
                            strategy_id=existing_strategy.id,
                            broker_user_id=broker_user_id,
                            multiplier=multiplier,
                        )
                        db.add(new_strategy_multiplier)

                db.commit()
                return JSONResponse(
                    content={"message": "Strategy updated successfully"},
                    status_code=200,
                )
            else:
                print("committed")
                # Continue with the database interaction for new strategy
                db.add(strategy)
                db.commit()

                # Store multipliers for new strategy
                for broker_user_id, multiplier in broker_multipliers.items():
                    new_strategy_multiplier = StrategyMultipliers(
                        strategy_id=strategy.id,
                        broker_user_id=broker_user_id,
                        multiplier=multiplier,
                    )
                    db.add(new_strategy_multiplier)

                db.commit()

                return JSONResponse(
                    content={"message": "Strategy saved successfully"}, status_code=200
                )

        except Exception as e:
            response_data = ERROR_HANDLER.fast_api_errors(
                "Store_broker_and_strategy_info", str(e)
            )
            print(response_data)
            return JSONResponse(content=response_data, status_code=500)
            # new_strategy_multiplier = StrategyMultipliers(strategy_id=strategy.id, broker_user_id=broker_user_id, multiplier=multiplier)

    def update_max_profit_loss(
        self,
        username: str,
        strategy_tag: str,
        data: dict,
        db: Session = Depends(get_db),
    ):
        try:
            print("entering update max profit loss")
            user = db.query(User).filter_by(username=username).first()
            if not user:
                return JSONResponse(
                    content={"message": "User not found"}, status_code=404
                )

            # Get the strategy by strategy_tag
            print("users found", user)
            strategy = db.query(Strategies).filter_by(strategy_tag=strategy_tag).first()

            if not strategy:
                return JSONResponse(
                    content={"message": "Strategy not found"}, status_code=404
                )
            print("strategy found", strategy)

            try:
                # Extract max_profit, max_loss, and other times from the request
                max_profit = data.get("max_profit")
                max_loss = data.get("max_loss")
                open_time = data.get("open_time")
                close_time = data.get("close_time")
                square_off_time = data.get("square_off_time")
                from datetime import datetime

                # Convert times to datetime.time objects if provided
                if open_time:
                    open_time = datetime.strptime(open_time, "%H:%M:%S").time()
                if close_time:
                    close_time = datetime.strptime(close_time, "%H:%M:%S").time()
                if square_off_time:
                    square_off_time = datetime.strptime(
                        square_off_time, "%H:%M:%S"
                    ).time()

                # Update the strategy's max_profit, max_loss, and times
                strategy.max_profit = max_profit
                strategy.max_loss = max_loss
                strategy.open_time = open_time
                strategy.close_time = close_time
                strategy.square_off_time = square_off_time

                # Commit changes to the database
                db.commit()

                response_data = {
                    "message": f"Strategy data updated successfully for {strategy_tag} strategy"
                }
                print(response_data)
                return JSONResponse(content=response_data, status_code=200)

            except ValueError as ve:
                # Handle invalid time format errors
                return JSONResponse(
                    content={
                        "message": "Invalid time format provided",
                        "error": str(ve),
                    },
                    status_code=400,
                )

        except Exception as e:
            # Handle any other exceptions and rollback the session
            db.rollback()
            return JSONResponse(
                content={
                    "message": "An error occurred while updating strategy data",
                    "error": str(e),
                },
                status_code=500,
            )

    def retrieve_strategy_info(
        self, username=str, strategy_tag=str, db: Session = Depends(get_db)
    ):
        try:
            # Check if the user exists
            user = db.query(User).filter_by(username=username).first()
            if not user:
                response_data = ERROR_HANDLER.database_errors("user", "User not found")
                print(response_data)
                return JSONResponse(content=response_data, status_code=404)

            # Retrieve strategy information for the user
            strategies = db.query(Strategies).filter_by(user_id=user.id).all()

            # Prepare the response
            strategy_info = []
            for strategy in strategies:
                strategy_data = {
                    "strategy_tag": strategy.strategy_tag,
                    "alias": strategy.alias,
                    "max_profit": strategy.max_profit,
                    "max_loss": strategy.max_loss,
                    "profit_locking": strategy.profit_locking,
                    "reached_profit": strategy.reached_profit,
                    "locked_min_profit": strategy.locked_min_profit,
                    "open_time": (
                        strategy.open_time.strftime("%H:%M:%S")
                        if strategy.open_time
                        else "00:00:00"
                    ),
                    "close_time": (
                        strategy.close_time.strftime("%H:%M:%S")
                        if strategy.close_time
                        else "00:00:00"
                    ),
                    "square_off_time": (
                        strategy.square_off_time.strftime("%H:%M:%S")
                        if strategy.square_off_time
                        else "00:00:00"
                    ),
                    "broker_user_id": strategy.broker_user_id.split(
                        ","
                    ),  # Convert back to a list
                    "broker": strategy.broker.split(","),  # Convert back to a list
                    "allowed_trades": strategy.allowed_trades,
                    "entry_order_retry": strategy.entry_order_retry,
                    "entry_retry_count": strategy.entry_retry_count,
                    "exit_order_retry": strategy.exit_order_retry,
                    "entry_retry_wait": strategy.entry_retry_wait,
                    "exit_retry_count": strategy.exit_retry_count,
                    "exit_retry_wait": strategy.exit_retry_wait,
                    "exit_max_wait": strategy.exit_max_wait,
                }

                # Retrieve multipliers for each broker_user_id
                multipliers = {}
                for broker_user_id in strategy_data["broker_user_id"]:
                    multiplier_record = (
                        db.query(StrategyMultipliers)
                        .filter_by(
                            strategy_id=strategy.id, broker_user_id=broker_user_id
                        )
                        .first()
                    )
                    if multiplier_record:
                        multipliers[broker_user_id] = multiplier_record.multiplier
                    else:
                        multipliers[broker_user_id] = None

                strategy_data["multiplier"] = multipliers

                strategy_info.append(strategy_data)

            return JSONResponse(content={"strategies": strategy_info}, status_code=200)

        except Exception as e:
            response_data = ERROR_HANDLER.fast_api_errors(
                "retrieve_strategy_info", str(e)
            )
            print(response_data)
            return JSONResponse(
                content={"error": response_data["message"]}, status_code=500
            )

    async def delete_strategy_tag(
        self, userId: str, strategy_tag: str, db: Session = Depends(get_db)
    ):
        try:
            print("process started for deleting strategy tag")
            # Check if the user exists
            user = db.query(User).filter_by(username=userId).first()
            print("user found", user)
            print("deleting user", userId)
            if not user:
                return JSONResponse(
                    content={"error": "User not found"}, status_code=404
                )

            # Retrieve strategy information for the user
            strategy = (
                db.query(Strategies)
                .filter_by(user_id=user.id, strategy_tag=strategy_tag)
                .first()
            )
            if not strategy:
                response_data = ERROR_HANDLER.database_errors(
                    "strategies", "Strategy not found"
                )
                print(response_data)
                return JSONResponse(content=response_data["message"], status_code=404)

            # Retrieve and delete associated multipliers
            multipliers = (
                db.query(StrategyMultipliers).filter_by(strategy_id=strategy.id).all()
            )
            for multiplier in multipliers:
                db.delete(multiplier)

            # Delete the strategy
            print("goinng to delete strategy in db")
            db.delete(strategy)
            print("deleted strategy in db")
            db.commit()
            print("committed in db7")

            return JSONResponse(
                content={
                    "message": "Strategy Tag and Associated Multipliers Deleted Successfully"
                },
                status_code=200,
            )

        except Exception as e:
            response_data = ERROR_HANDLER.fast_api_errors("delete_strategy_tag", str(e))
            print(response_data)
            return JSONResponse(
                content={"error": response_data["message"]}, status_code=500
            )

    async def update_strategy_profit_locking(
        self, username: str, strategy_tag: str, db: Session = Depends(get_db)
    ):
        request = Request()
        data = await request.json()
        user = db.query(User).filter_by(username=username).first()
        if not user:
            response_data = ERROR_HANDLER.fast_api_errors("user", "User not found")
            print(response_data)
            raise HTTPException(status_code=404, detail=response_data)

        if "profit_locking" not in data:
            response_data = ERROR_HANDLER.fast_api_errors(
                "update_strategy_profit_locking", "Profit locking data not provided"
            )
            print(response_data)
            raise HTTPException(status_code=400, detail=response_data)
        try:
            profit_locking_data = [x for x in data["profit_locking"].split(",")]
            if len(profit_locking_data) != 4:
                raise ValueError("Invalid profit locking data format")
        except ValueError:
            response_data = ERROR_HANDLER.fast_api_errors(
                "update_strategy_profit_locking", "Invalid profit locking data format"
            )
            print(response_data)
            raise HTTPException(status_code=400, detail=response_data)

        credential = db.query(Strategies).filter_by(strategy_tag=strategy_tag).first()
        if not credential:
            response_data = ERROR_HANDLER.database_errors(
                "strategies", "Credential not found"
            )
            print(response_data)
            raise HTTPException(status_code=404, detail=response_data)

        credential.profit_locking = "".join(map(str, profit_locking_data))
        db.commit()

        # Check if profit_locking is equal to ",,,"
        if credential.profit_locking == ",,,":
            # Set reached_profit and locked_min_profit to 0
            credential.reached_profit = 0
            credential.locked_min_profit = 0
            db.commit()

        return JSONResponse(
            content={
                "message": f"Profit locking updated successfully for {strategy_tag} Strategy"
            },
            status_code=200,
        )

    async def update_strategy_profit_trail_values(
        self,
        username: str,
        request: Request,
        strategy_tag: str,
        db: Session = Depends(get_db),
    ):
        data = await request.json()  # Assuming JSON data is sent with the request
        existing_user = db.query(User).filter_by(username=username).first()
        if not existing_user:
            response_data = ERROR_HANDLER.database_errors("user", "User does not exist")
            raise HTTPException(status_code=404, detail=response_data)

        strategy_info = (
            db.query(Strategies).filter_by(strategy_tag=strategy_tag).first()
        )
        print("strategy_info:", strategy_info)
        if not strategy_info:
            response_data = ERROR_HANDLER.database_errors(
                "strategies", "Strategy not found"
            )
            print(response_data)
            raise HTTPException(status_code=404, detail=response_data)

        # Query current reached_profit and locked_min_profit values
        reached_profit = data.get("reached_profit", strategy_info.reached_profit)
        locked_min_profit = data.get(
            "locked_min_profit", strategy_info.locked_min_profit
        )

        # Update the reached_profit and locked_min_profit values
        strategy_info.reached_profit = reached_profit
        strategy_info.locked_min_profit = locked_min_profit

        db.commit()

        return JSONResponse(
            content={"message": "Strategy profit trail values updated successfully"}
        )

    def update_wait_time(self, username, strategy_tag, db: Session = Depends(get_db)):
        user = db.query(User).filter_by(username=username).first()
        if not user:
            return JSONResponse({"message": "User not found"}, status_code=404)

        # Get the strategy by strategy_tag
        strategy = db.query(Strategies).filter_by(strategy_tag=strategy_tag).first()
        request = Request()
        allowed_trades = request.json.get("allowed_trades")
        entry_order_retry = request.json.get("entry_order_retry")
        entry_retry_count = request.json.get("entry_retry_count")
        entry_retry_wait = request.json.get("entry_retry_wait")
        exit_order_retry = request.json.get("exit_order_retry")
        exit_retry_count = request.json.get("exit_retry_count")
        exit_retry_wait = request.json.get("exit_retry_wait")
        exit_max_wait = request.json.get("exit_max_wait")

        # Update the strategy's max_profit and max_loss
        strategy.allowed_trades = allowed_trades
        strategy.entry_order_retry = entry_order_retry
        strategy.entry_retry_count = entry_retry_count
        strategy.entry_retry_wait = entry_retry_wait
        strategy.exit_order_retry = exit_order_retry
        strategy.exit_retry_count = exit_retry_count
        strategy.exit_retry_wait = exit_retry_wait
        strategy.exit_max_wait = exit_max_wait

        # Commit changes to the database
        db.commit()
        response_data = {
            "message": f"Wait time updated successfully for {strategy_tag} strategy"
        }
        return response_data


# Main router for general strategy operations
strategies_router = APIRouter()


@strategies_router.post("/store_broker_and_strategy_info")
async def store_broker_and_strategy_info(request: Request, db: Session = Depends(get_db)):
    try:
        # Parse JSON data
        data = await request.json()
        print("Printing data:", data)

        # Extract necessary fields
        strategy_tag = data["formData"]
        print("Strategy Tag:", strategy_tag)
        userId = strategy_tag["strategy_tag"]
        print("Incoming data:", data, "Username:", userId)

        # Call the Strategies_class method
        integration = Strategies_class()
        return await integration.store_broker_and_strategy_info(strategy_tag, userId, db)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid JSON payload")
    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Missing key in request: {str(e)}")


@strategies_router.put("/update_max_profit_loss")
async def update_max_profit_loss(request: Request, db: Session = Depends(get_db)):
    try:
        # Parse JSON data
        data = await request.json()
        print("Incoming data:", data)

        # Extract necessary fields
        new_data = data["strategies"][0]
        print("New data:", new_data)
        username = new_data["userId"]
        strategy_tag = new_data["strategy_tag"]

        # Call the Strategies_class method
        integration = Strategies_class()
        return await integration.update_max_profit_loss(username, strategy_tag, db)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid JSON payload")
    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Missing key in request: {str(e)}")


@strategies_router.delete("/delete_strategy/{userId}/{strategy_tag}")
async def delete_strategy_tag(userId: str, strategy_tag: str, db: Session = Depends(get_db)):
    print("Received userId:", userId, "strategy_tag:", strategy_tag)
    integration = Strategies_class()
    return await integration.delete_strategy_tag(userId, strategy_tag, db)


@strategies_router.put("/update_strategy_profit_locking")
async def update_strategy_profit_locking(username: str,request:Request, strategy_tag: str, db: Session = Depends(get_db)):
    try:
        # Parse JSON data
        data = await request.json()
        print("Incoming data:", data)
        username = data["userId"]
        strategy_tag = data["strategy_tag"]
        
        integration = Strategies_class()
        return await integration.update_strategy_profit_locking(username, strategy_tag, db)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid JSON payload")
    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Missing key in request: {str(e)}")

@strategies_router.get("/retrieve_strategy_info")
async def retrieve_strategy_info(username: str, request:Request,strategy_tag: str, db: Session = Depends(get_db)):
    try:
        # Parse JSON data
        data = await request.json()
        print("Incoming data:", data)
        
        new_data = data["strategies"][0]
        print("New data:", new_data)
        username = new_data["userId"]
        strategy_tag = new_data["strategy_tag"]
        
        integration = Strategies_class()
        return await integration.retrieve_strategy_info(username, strategy_tag, db)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid JSON payload")
    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Missing key in request: {str(e)}")

@strategies_router.put("/update_strategy_profit_trail_values")
async def update_strategy_profit_trail_values(username: str,request:Request, strategy_tag: str, db: Session = Depends(get_db)):
    try:
        # Parse JSON data
        data = await request.json()
        print("Incoming data:", data)
        
        new_data = data["strategies"][0]
        username = new_data["userId"]
        strategy_tag = new_data["strategy_tag"]
        
        integration = Strategies_class()
        return await integration.update_strategy_profit_trail_values(username, strategy_tag, db)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid JSON payload")
    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Missing key in request: {str(e)}")
