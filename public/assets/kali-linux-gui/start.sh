#!/bin/bash
set -e

service xrdp start
python3 /opt/kali-webui/app.py &
tail -f /var/log/xrdp.log
