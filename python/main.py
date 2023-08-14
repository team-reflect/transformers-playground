import json
import time

from transformers import pipeline

with open("data/transformers-input.json") as f:
    text_list = json.loads(f.read())


extractor = pipeline("feature-extraction", "sentence-transformers/all-MiniLM-L6-v2")


def extract(text: str):
    try:
        result = extractor(
            text,
            pooling="mean",
            normalize=True,
            truncation=True,
        )
        return len(result[0])
    except Exception as e:
        return str(e)


start_time = 0


def get_time():
    return f"{int(time.time() - start_time)} seconds"


for index, text in enumerate(text_list):
    result = extract(text)
    if start_time == 0:
        start_time = time.time()
    print(f"index: {index}; time: {get_time()}; result length: {result}")
