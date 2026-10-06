"""Simple integration test script for backend API.

Usage:
  python tests/integration_test.py --file data/corpus/ccae3481761a480e8bcc9faa68be3c43.png

It uploads a file, then calls ingest, ocr, nlp, and plagiarism endpoints in sequence.
"""
import argparse
import requests
import time
import sys


def main(api_url: str, file_path: str):
    s = requests.Session()

    print("Uploading file:", file_path)
    with open(file_path, "rb") as f:
        files = {"file": (file_path.split("/")[-1], f)}
        r = s.post(f"{api_url}/upload/", files=files)

    print("Upload status:", r.status_code)
    if not r.ok:
        print(r.text)
        return 1

    data = r.json()
    file_id = data.get("file_id")
    print("Received file_id:", file_id)

    endpoints = ["ingest", "ocr", "nlp", "plagiarism"]

    for ep in endpoints:
        print(f"Calling {ep} for {file_id}")
        rr = s.post(f"{api_url}/{ep}/{file_id}")
        print(ep, rr.status_code)
        try:
            print(rr.json())
        except Exception:
            print(rr.text)

        if not rr.ok:
            print(f"{ep} failed, stopping.")
            return 2

        # small pause for file system consistency
        time.sleep(0.5)

    print("Integration sequence completed successfully")
    return 0


if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("--api", dest="api_url", default="http://localhost:8000", help="Base API URL")
    p.add_argument("--file", dest="file", required=True, help="Path to file to upload")
    args = p.parse_args()
    sys.exit(main(args.api_url, args.file))
