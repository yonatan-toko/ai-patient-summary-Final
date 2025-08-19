import argparse, base64, gzip, os, pathlib, sys
import requests

def export_events(api_key: str, secret_key: str, start: str, end:str, region: str, output: str):
    
    base = "https://amplitude.com/api/2/export" if region == "US" else "https://amplitude.eu/api/2/export"
    url = f"{base}?start={start}&end={end}"
    auth = base64.b64encode(f"{api_key}:{secret_key}".encode()).decode()
    headers = {"Authorization": f"Basic {auth}"}

    r= requests.get(url, headers=headers, timeout=60)

    if r.status_code == 200:
        pathlib.Path(output).parent.mkdir(parents=True, exist_ok=True)
        with open(output, "wb") as f:
            f.write(r.content)
        print(f"Exported events from {start} to {end} to {output}")
    else:
        print(f"Failed to export events: {r.status_code} {r.text}", file=sys.stderr)
        sys.exit(1)
        

if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("--api-key", required=True, help="Amplitude API key")
    p.add_argument("--secret-key", required=True, help="Amplitude secret key")
    p.add_argument("--start", required=True)
    p.add_argument("--end", required=True)
    p.add_argument("--region", choices=["US", "EU"], default="US", help="Region for Amplitude")
    p.add_argument("--output", default="amplitude_export.json.gz")
    args = p.parse_args()
    export_events(args.api_key, args.secret_key, args.start, args.end, args.region, args.output)