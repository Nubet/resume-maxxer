#!/usr/bin/env bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT" || exit 1

export PYTHONUTF8=1
export PYTHONIOENCODING=utf-8

echo "Uruchamianie Resume Maxxer..."
echo "Sprawdzanie zależności..."

if command -v python3 &>/dev/null; then
    good_python="python3"
elif command -v python &>/dev/null; then
    good_python="python"
else
    echo "Błąd: Nie znaleziono Python 3. Wymagany Python 3.10+."
    exit 1
fi

PYTHON_VER=$($good_python --version 2>&1)
echo "Python: $PYTHON_VER"

if ! command -v node &>/dev/null; then
    echo "Błąd: Nie znaleziono Node.js. Wymagany Node.js 18+."
    exit 1
fi
NODE_VER=$(node --version)
echo "Node.js: $NODE_VER"

if command -v typst &>/dev/null; then
    TYPST_VER=$(typst --version 2>&1)
    echo "Typst CLI: $TYPST_VER"
else
    echo "Brak systemowego Typst CLI. Używanie biblioteki Python typst."
fi

if [ ! -f "$PROJECT_ROOT/backend/.env" ]; then
    if [ -f "$PROJECT_ROOT/backend/.env.example" ]; then
        cp "$PROJECT_ROOT/backend/.env.example" "$PROJECT_ROOT/backend/.env"
    else
        cat <<EOF > "$PROJECT_ROOT/backend/.env"
OPENROUTER_API_KEY=
OPENROUTER_MODEL=anthropic/claude-3.5-sonnet
PORT=8000
ENVIRONMENT=development
EOF
    fi
    echo "Utworzono backend/.env"
fi

if [ ! -f "$PROJECT_ROOT/frontend/.env.local" ] && [ ! -f "$PROJECT_ROOT/frontend/.env" ]; then
    if [ -f "$PROJECT_ROOT/frontend/.env.example" ]; then
        cp "$PROJECT_ROOT/frontend/.env.example" "$PROJECT_ROOT/frontend/.env.local"
    else
        cat <<EOF > "$PROJECT_ROOT/frontend/.env.local"
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
EOF
    fi
    echo "Utworzono frontend/.env.local"
fi

check_port() {
    local port=$1
    $good_python -c "
import socket
s = socket.socket()
s.settimeout(0.5)
res = s.connect_ex(('127.0.0.1', $port))
s.close()
exit(0 if res == 0 else 1)
" 2>/dev/null
}

if check_port 8000; then
    echo "Port 8000 jest zajęty."
fi

if check_port 3000; then
    echo "Port 3000 jest zajęty."
fi

echo "Uruchamianie backendu..."
cd "$PROJECT_ROOT/backend" || exit 1

if [ ! -d "venv" ]; then
    $good_python -m venv venv
    
    if [ -f "venv/Scripts/activate" ]; then
        source venv/Scripts/activate
    else
        source venv/bin/activate
    fi
    
    pip install --upgrade pip >/dev/null 2>&1
    pip install -r requirements.txt
else
    if [ -f "venv/Scripts/activate" ]; then
        source venv/Scripts/activate
    else
        source venv/bin/activate
    fi
fi

python run.py > /dev/null 2>&1 &
BACKEND_PID=$!

sleep 2
if check_port 8000; then
    echo "Backend działa (PID: $BACKEND_PID, port 8000)"
else
    echo "Błąd uruchamiania backendu."
fi

echo "Uruchamianie frontendu..."
cd "$PROJECT_ROOT/frontend" || exit 1

if [ ! -d "node_modules" ]; then
    npm install
fi

npm run dev > /dev/null 2>&1 &
FRONTEND_PID=$!

sleep 3
echo "Frontend działa (PID: $FRONTEND_PID, port 3000)"

cd "$PROJECT_ROOT" || exit 1

echo "Resume Maxxer uruchomiony."
echo "UI: http://localhost:3000"
echo "API: http://127.0.0.1:8000"

cleanup() {
    echo "Zatrzymywanie serwerów..."
    
    if [ -n "$BACKEND_PID" ]; then
        kill "$BACKEND_PID" 2>/dev/null
    fi
    if [ -n "$FRONTEND_PID" ]; then
        kill "$FRONTEND_PID" 2>/dev/null
    fi
    
    pkill -P "$BACKEND_PID" 2>/dev/null
    pkill -P "$FRONTEND_PID" 2>/dev/null
    
    exit 0
}

trap cleanup SIGINT SIGTERM

while true; do
    sleep 1
done
