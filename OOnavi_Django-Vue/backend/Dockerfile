FROM python:3.6
ENV PYTHONUNBUFFERED 1
RUN ["apt-get", "clean"]
RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "vim"]
RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN pip install -r requirements.txt
COPY scripts/start*.sh /
ADD . /code/
