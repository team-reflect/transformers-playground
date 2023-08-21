from typing import List 
import random
import json

def read_file():
    with open("./data/Hans_Christian_Andersen.txt", ) as f:
        return f.read()


def split_evenly(paragraphs: List[str]) -> List[List[str]]:
    chunks: List[List[str]] = []
    for i in range(0, len(paragraphs), 10):
        chunks.append(paragraphs[i:i+10])
    return chunks


def split_randomly(paragraphs: List[str]) -> List[List[str]]:
    chunks: List[List[str]] = []
    n = len(paragraphs)
    i = 0

    while i < n-1:
        if random.random() < 0.9:
            chunk_size = random.randint(1, 10)
        else:
            chunk_size = random.randint(10, 100)
        chunks.append(paragraphs[i:i+chunk_size])
        i += chunk_size
    return chunks

def write_chunks(chunks: List[List[str]], filename: str):
    print(f"writing {len(chunks)} chunks to {filename}")
    output = [
        f"Note {i}\n\n" + "\n".join(chunk)
        for i, chunk in enumerate(chunks) 
    ]
    with open(f'./data/{filename}', 'w') as f:
        f.write(json.dumps(output, indent=2))

def main():
    text = read_file()
    print('characters', len(text))
    print('words', len(text.split(" ")))
    paragraphs = text.split("\n\n")
    print('paragraphs', len(paragraphs))

    write_chunks(split_evenly(paragraphs), 'transformers-input-evenly.json')
    write_chunks(split_randomly(paragraphs), 'transformers-input-randomly.json')


if __name__ == '__main__':
    main()
