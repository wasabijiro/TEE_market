FROM python:3.9-slim

WORKDIR /app

COPY enclave.py .

# VSOCKモードで動作（デフォルト）
CMD ["python3", "enclave.py", "--port", "9001"]
