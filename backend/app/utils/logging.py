import logging
import os
from logging.handlers import RotatingFileHandler


log_directory = os.path.join(os.path.dirname(__file__), "logs")
os.makedirs(log_directory, exist_ok=True)
log_file_path = os.path.join(log_directory, "app.log")

handler = RotatingFileHandler(log_file_path)
handler.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s-%(levelname)s-%(message)s')
handler.setFormatter(formatter)

app_logger = logging.getLogger("app_logger")
app_logger.addHandler(handler)
app_logger.setLevel(logging.INFO)
