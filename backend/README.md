API README

This api does this....

Usage 

The following endpoints are exposed as part of this API 

 -- /calculate -> 
    Type of request -> POST 
    Request Body -> JSON containing a structure similar to this 
                    {
                        "x0" : "101",
                        "y0" : "20",
                        "z0" : "30.45353",
                        "sigma" : "0.1234434443847847",
                        "rho" : "0.25",
                        "beta" : "0.456",
                        "t" : "0.23"
                    }

                    All the paramters should be numeric

 -- /docs -> Auto generated API documentation adhering to OpenAPI schema


Requirements 

Python > version 3 should be installed 
Usage

Unit test cases -> 

Unit test cases are present under app/tests/

To run these please run the command 

pytest app/tests



1. Start the Python virtual environment by executing the below commands 

    cd backend
    python -m venv .venv
    source ./.venv/bin/activate 

2. Install the required libraries
   
   pip3/pip install -r requirements.txt 

3. Start the backend server 
   
   uvicorn app.main:app --reload  [--port <port>]

   The default port is 8000


Logging 

The logs are present at app/utils/logs/logs.log 
