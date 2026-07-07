#!/usr/bin/env bash

echo "Zatrzymywanie Resume Maxxer..."

kill_port() {
    local port=$1
    python3 -c "
import psutil
for conn in psutil.net_connections():
    if conn.laddr and conn.laddr.port == $port and conn.pid:
        try:
            p = psutil.Process(conn.pid)
            p.terminate()
            print(f'Zatrzymano proces {p.name()} (PID: {conn.pid}) na porcie $port')
        except Exception:
            pass
" 2>/dev/null || \
    python -c "
import psutil
for conn in psutil.net_connections():
    if conn.laddr and conn.laddr.port == $port and conn.pid:
        try:
            p = psutil.Process(conn.pid)
            p.terminate()
            print(f'Zatrzymano proces {p.name()} (PID: {conn.pid}) na porcie $port')
        except Exception:
            pass
" 2>/dev/null
}

kill_port 8000
kill_port 3000

pkill -f "python run.py" 2>/dev/null && echo "Zatrzymano python run.py"
pkill -f "next-server" 2>/dev/null && echo "Zatrzymano next.js"

echo "Procesy zatrzymane."
