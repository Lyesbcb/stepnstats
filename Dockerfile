FROM ubuntu:20.04
ARG DEBIAN_FRONTEND=noninteractive
ENV CHROME_VERSION=105.0.5195.52
# Update all packages 
RUN apt-get update
# Install all the requirements
RUN apt-get install unzip python3.10 npm python3-pip wget software-properties-common -y
RUN npm install -g pm2
# Install Chrome driver
RUN wget -N https://chromedriver.storage.googleapis.com/${CHROME_VERSION}/chromedriver_linux64.zip -P ~/Downloads
RUN unzip ~/Downloads/chromedriver_linux64.zip -d ~/Downloads
RUN mv -f ~/Downloads/chromedriver /usr/local/share/
RUN chmod +x /usr/local/share/chromedriver
RUN ln -s /usr/local/share/chromedriver /usr/local/bin/chromedriver
RUN ln -s /usr/local/share/chromedriver /usr/bin/chromedriver
# Install Chrome
RUN wget --no-verbose -O /tmp/chrome.deb https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_${CHROME_VERSION}-1_amd64.deb
RUN apt install -y /tmp/chrome.deb
RUN rm /tmp/chrome.deb
# Install all python packages
RUN pip install easyocr==1.5.0 opencv-python==4.5.4.60 pytesseract==0.3.9 matplotlib
# Install tesseract ocr
RUN add-apt-repository ppa:alex-p/tesseract-ocr-devel
RUN apt update
RUN apt install tesseract-ocr -y
# Copy backend code
COPY ./stepnstats/backend /stepnstats/

