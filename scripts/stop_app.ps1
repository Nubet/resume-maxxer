$ErrorActionPreference = "SilentlyContinue"
Write-Host "Zatrzymywanie Resume Maxxer..."

function Kill-Port($Port) {
    $connections = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
    foreach ($conn in $connections) {
        if ($conn.OwningProcess -and $conn.OwningProcess -ne 0) {
            $proc = Get-Process -Id $conn.OwningProcess -ErrorAction SilentlyContinue
            if ($proc) {
                Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
                Write-Host "Zatrzymano proces $($proc.ProcessName) (PID: $($proc.Id)) na porcie $Port"
            }
        }
    }
}

Kill-Port 8000
Kill-Port 3000

Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle -match "next" -or $_.Path -match "frontend" } | Stop-Process -Force
Get-Process -Name "python" -ErrorAction SilentlyContinue | Where-Object { $_.Path -match "backend" } | Stop-Process -Force

Write-Host "Procesy zatrzymane."
