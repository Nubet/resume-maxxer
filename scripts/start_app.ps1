$ErrorActionPreference = "SilentlyContinue"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ScriptDir
Set-Location $ProjectRoot

$env:PYTHONUTF8 = "1"
$env:PYTHONIOENCODING = "utf-8"

Write-Host "Uruchamianie Resume Maxxer..."
Write-Host "Sprawdzanie zależności..."

$pythonCmd = "python"
if (Get-Command "python3" -ErrorAction SilentlyContinue) { $pythonCmd = "python3" }
$pythonVer = (& $pythonCmd --version 2>&1)
if ($LASTEXITCODE -ne 0) {
    Write-Host "Błąd: Nie znaleziono Python. Wymagany Python 3.10+."
    exit 1
}
Write-Host "Python: $pythonVer"

$nodeVer = (& node --version 2>&1)
if ($LASTEXITCODE -ne 0) {
    Write-Host "Błąd: Nie znaleziono Node.js."
    exit 1
}
Write-Host "Node.js: $nodeVer"

if (Get-Command "typst" -ErrorAction SilentlyContinue) {
    $typstVer = (& typst --version 2>&1)
    Write-Host "Typst CLI: $typstVer"
} else {
    Write-Host "Brak systemowego Typst CLI. Używanie biblioteki Python typst."
}

if (-not (Test-Path "$ProjectRoot\backend\.env")) {
    if (Test-Path "$ProjectRoot\backend\.env.example") {
        Copy-Item "$ProjectRoot\backend\.env.example" "$ProjectRoot\backend\.env"
    } else {
        Set-Content -Path "$ProjectRoot\backend\.env" -Value "OPENROUTER_API_KEY=`nOPENROUTER_MODEL=anthropic/claude-3.5-sonnet`nPORT=8000`nENVIRONMENT=development"
    }
    Write-Host "Utworzono backend\.env"
}

if (-not (Test-Path "$ProjectRoot\frontend\.env.local") -and -not (Test-Path "$ProjectRoot\frontend\.env")) {
    if (Test-Path "$ProjectRoot\frontend\.env.example") {
        Copy-Item "$ProjectRoot\frontend\.env.example" "$ProjectRoot\frontend\.env.local"
    } else {
        Set-Content -Path "$ProjectRoot\frontend\.env.local" -Value "NEXT_PUBLIC_API_URL=http://127.0.0.1:8000"
    }
    Write-Host "Utworzono frontend\.env.local"
}

function Test-Port($Port) {
    $conn = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
    return $null -ne $conn
}

if (Test-Port 8000) {
    Write-Host "Port 8000 jest zajęty."
}

if (Test-Port 3000) {
    Write-Host "Port 3000 jest zajęty."
}

Write-Host "Uruchamianie backendu..."
Set-Location "$ProjectRoot\backend"

if (-not (Test-Path "venv")) {
    & $pythonCmd -m venv venv
    & "$ProjectRoot\backend\venv\Scripts\python.exe" -m pip install --upgrade pip | Out-Null
    & "$ProjectRoot\backend\venv\Scripts\pip.exe" install -r requirements.txt | Out-Null
}

$backendProcess = Start-Process -FilePath "$ProjectRoot\backend\venv\Scripts\python.exe" -ArgumentList "run.py" -WorkingDirectory "$ProjectRoot\backend" -RedirectStandardOutput "NUL" -RedirectStandardError "NUL" -PassThru -NoNewWindow
Start-Sleep -Seconds 2

Write-Host "Uruchamianie frontendu..."
Set-Location "$ProjectRoot\frontend"

if (-not (Test-Path "node_modules")) {
    & npm install | Out-Null
}

$frontendProcess = Start-Process -FilePath "cmd.exe" -ArgumentList "/c npm run dev" -WorkingDirectory "$ProjectRoot\frontend" -RedirectStandardOutput "NUL" -RedirectStandardError "NUL" -PassThru -NoNewWindow
Start-Sleep -Seconds 3

Set-Location $ProjectRoot
Write-Host "Resume Maxxer uruchomiony."
Write-Host "UI: http://localhost:3000"
Write-Host "API: http://127.0.0.1:8000"

try {
    Read-Host "Naciśnij ENTER, aby wyjść"
} finally {
    Write-Host "Serwery działają w tle. Użyj stop_app.ps1 do zatrzymania."
}
