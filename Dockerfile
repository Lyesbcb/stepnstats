FROM ubuntu:20.04
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update
# Install all the requirements
RUN apt-get install unzip python3.10 npm wget -y
RUN npm cache clean -f
RUN npm install -g n
RUN wget -N https://chromedriver.storage.googleapis.com/103.0.5060.134/chromedriver_linux64.zip -P ~/Downloads
RUN unzip ~/Downloads/chromedriver_linux64.zip -d ~/Downloads
RUN mv -f ~/Downloads/chromedriver /usr/local/share/
RUN chmod +x /usr/local/share/chromedriver
RUN ln -s /usr/local/share/chromedriver /usr/local/bin/chromedriver
RUN ln -s /usr/local/share/chromedriver /usr/bin/chromedriver
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt install ./google-chrome-stable_current_amd64.deb -y
COPY ./stepnstats/ /stepntats/