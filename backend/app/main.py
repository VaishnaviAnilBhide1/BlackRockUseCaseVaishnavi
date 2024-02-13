from fastapi import FastAPI
from app.routes import route_calculate
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Adding CORS middleware to allow requests from localhost:3003
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Including the routes from route_calculate
app.include_router(route_calculate.router)

"""
This script creates a FastAPI application with CORS middleware configured to allow requests from localhost:3003.
It includes routes from the route_calculate module.
"""

