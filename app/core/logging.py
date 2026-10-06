# app/core/logging.py
import logging
import structlog


def setup_logging():
    logging.basicConfig(
        level=logging.INFO,
        format="%(message)s",
    )

    structlog.configure(
        wrapper_class=structlog.make_filtering_bound_logger(logging.INFO),
        processors=[
            structlog.processors.TimeStamper(fmt="iso"),
            structlog.processors.JSONRenderer(),
        ],
    )

