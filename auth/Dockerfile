FROM python:3.9.21-alpine3.21

RUN pip install --upgrade pip setuptools wheel

WORKDIR /auth

COPY . /auth

EXPOSE 80

RUN pip install -r requirements.txt

CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "80"]