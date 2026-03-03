FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        build-essential \
        libffi-dev \
        libssl-dev \
        unrar-free \
        libarchive-tools \
        rclone \
        fuse3 \
    && rm -rf /var/lib/apt/lists/*

RUN echo "user_allow_other" >> /etc/fuse.conf

COPY pyproject.toml README.md ./
COPY decypharr ./decypharr

RUN python -m pip install --upgrade pip \
    && python -m pip install .

EXPOSE 8282

CMD ["decypharr", "--config", "/data"]
