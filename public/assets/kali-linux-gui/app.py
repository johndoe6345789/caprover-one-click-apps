import os
import platform
import psutil
from flask import Flask, jsonify

app = Flask(__name__)


def format_bytes(num: float) -> str:
    for unit in ["B", "KB", "MB", "GB", "TB"]:
        if num < 1024:
            return f"{num:.2f} {unit}"
        num /= 1024
    return f"{num:.2f} PB"


def system_stats() -> dict:
    memory = psutil.virtual_memory()
    disk = psutil.disk_usage('/')
    return {
        "platform": platform.platform(),
        "cpu_percent": psutil.cpu_percent(interval=0.5),
        "memory": {
            "total": format_bytes(memory.total),
            "used": format_bytes(memory.used),
            "percent": memory.percent,
        },
        "disk": {
            "total": format_bytes(disk.total),
            "used": format_bytes(disk.used),
            "percent": disk.percent,
        },
    }


@app.route('/')
def home():
    stats = system_stats()
    return (
        "<h1>Kali Linux GUI</h1>"
        f"<p>Platform: {stats['platform']}</p>"
        f"<p>CPU Usage: {stats['cpu_percent']}%</p>"
        f"<p>Memory Used: {stats['memory']['used']} / {stats['memory']['total']} ({stats['memory']['percent']}%)</p>"
        f"<p>Disk Used: {stats['disk']['used']} / {stats['disk']['total']} ({stats['disk']['percent']}%)</p>"
        f"<p>RDP port: {os.environ.get('RDP_PORT', '3389')}</p>"
        f"<p>Web UI port: {os.environ.get('WEBUI_PORT', '5000')}</p>"
    )


@app.route('/api/stats')
def api_stats():
    return jsonify(system_stats())


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('WEBUI_PORT', 5000)))
