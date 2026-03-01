import urllib.request
import sys

project = "8151387560676308887"
screen = "b6fefe4c445d4d03aa85da10f118b2e7"

prefixes = [
    "https://storage.googleapis.com/hubble-serverless-bucket/stitch/projects",
    "https://storage.googleapis.com/stitch-public-results",
    "https://storage.googleapis.com/marmoset-public",
    "https://storage.googleapis.com/app-stitch-imports",
    "https://storage.googleapis.com/app-stitch-public",
    "https://storage.googleapis.com/makani-public/stitch",
    "https://storage.googleapis.com/stitch-exports",
    "https://storage.googleapis.com/stitch-artifacts",
    "https://storage.googleapis.com/ugc-stitch",
    "https://storage.googleapis.com/marmoset-stitch-public",
    "https://storage.googleapis.com/b/stitch-prod.appspot.com/o",
    "https://storage.googleapis.com/b/stitch-exports"
]

for p in prefixes:
    urls_to_try = [
        f"{p}/{project}/{screen}/index.html",
        f"{p}/{project}/screens/{screen}/index.html",
        f"{p}/projects/{project}/screens/{screen}/index.html",
        f"{p}/stitch/{project}/{screen}/index.html"
    ]
    for url in urls_to_try:
        try:
            req = urllib.request.Request(url, method="HEAD")
            resp = urllib.request.urlopen(req, timeout=3)
            if resp.status == 200:
                print("FOUND:", url)
                sys.exit(0)
        except Exception as e:
            pass
            
print("NOT FOUND")
