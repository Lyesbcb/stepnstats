import time
start_time = time.time()

def start():
    start_time = time.time()

def stop():
    print("--- %s seconds ---" % (time.time() - start_time))
