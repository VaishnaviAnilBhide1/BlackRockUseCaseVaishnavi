from fastapi import APIRouter, Request
from starlette.responses import Response
from mpmath import mp
import json
from app.utils.logging import app_logger as logger
import math

router = APIRouter()

mp.dps = 50

def validate_json_content_type(request: Request) -> int:
    """
    Validates if the content type of the request is JSON.
    Args:
        request (Request): The incoming request object.

    Returns:
        int: 0 if content type is JSON, 1 otherwise.
    """
    content_type = request.headers.get("Content-Type")
    if (content_type.lower() != "application/json"):
        return 1
    return 0

def handle_exception(status_code: int, msg: str) -> Response:
    """
    Creates a response with the specified status code and message.
    Args:
        status_code (int): The HTTP status code.
        msg (str): The message to be included in the response.

    Returns:
        Response: The response object.
    """
    return Response(content=msg, status_code=status_code)

def validate_request(req: dict) -> int:
    """
    Validates the request parameters.
    Args:
        req (dict): The request parameters.

    Returns:
        int: 0 if parameters are valid, 1 otherwise.
    """
    try:
        if ('x' not in req
                or 'y' not in req
                or 'z' not in req
                or 'sigma' not in req
                or 'rho' not in req
                or 'beta' not in req
                or 't' not in req):
            logger.info("Params are invalid")
            logger.info(req)
            return 1
        else:
            logger.info("Validated parameters")
        for val in req:
            req[val] = mp.mpf(req[val])
        return 0
    except Exception as e:
        logger.error(e)
        return 1

def calculate(params: dict, res: dict, n: int) -> int:
    """
    Calculates the parameters.
    Args:
        params (dict): The parameters for calculation.
        res (dict): The resulting dictionary.
        n (int): The iteration number.

    Returns:
        int: 0 if calculation is successful, 1 otherwise.
    """
    try:
        x = (params["x"] \
            + (params["z"] * params["sigma"]
                * (params["y"] - params["x"])
                * params["t"]))
        y = params["y"] \
            + (params["x"]
                * (params["rho"] - params["z"])
                - params["z"] * params["y"]) \
            * params["t"]
        z = params["z"] \
            + ((params["x"] * params["y"])
               - (params["beta"] * params["z"])) \
            * params["t"]

        res[n] = [x, y, z]

        params["x"] = x
        params["y"] = y
        params["z"] = z

        logger.info("Calculated parameters")
        return 0
    except Exception as e:
        logger.error("Unable to calculate parameters. {}".format(e))
        logger.error(e)
        return 1

def process_response(res: dict) -> int:
    """
    Processes the response dictionary.
    Args:
        res (dict): The response dictionary.

    Returns:
        int: 0 if processing is successful, 1 otherwise.
    """
    try:
        for n in res:
            for i in range(0, 3):
                res[n][i] = round(float(res[n][i]), 3)
        logger.info("Processed response {}".format(res))
        return 0
    except Exception as e:
        logger.error("Cannot convert to float. Error {}".format(e))
        return 1

@router.post("/calculate")
async def process_data(request: Request) -> Response:
    """
    Processes the incoming data.
    Args:
        request (Request): The incoming request object.

    Returns:
        Response: The response object.
    """
    try:
        if (validate_json_content_type(request=request) == 1):
            return handle_exception(status_code=415,
                                    msg="Unsupported Media Type, use 'application/json'")
        req = json.loads(await request.body())
        logger.info('Request is {}'.format(req))
        params = {
            "x": req.get('x0'),
            "y": req.get('y0'),
            "z": req.get('z0'),
            "sigma": req.get('sigma'),
            "rho": req.get('rho'),
            "beta": req.get('beta'),
            "t": req.get('t')
        }

        if (validate_request(params) == 1):
            return handle_exception(status_code=422,
                                    msg="Bad Request")
        res = dict()
        for n in range(1, 21):
            if (calculate(params, res, n) == 1):
                return handle_exception(status_code=500,
                                        msg="Internal Server Error")

        if (process_response(res) == 1):
            return handle_exception(status_code=500,
                                    msg="Internal Server Error")
        json_data = json.dumps(res)
        logger.info(json_data)

        return Response(content=json_data,
                        status_code=200,
                        media_type="application/json")
    except Exception as e:
        # Handle any errors that might occur during processing'
        logger.error(e)
        return handle_exception(status_code=500,
                                msg="Internal Server error")
