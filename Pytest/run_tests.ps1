# run_tests.ps1
# Ejecuta pytest y genera resultado.txt y report.html

Set-Location -Path (Split-Path -Path $MyInvocation.MyCommand.Path)
pip install -r requirements.txt
pytest --maxfail=0 --disable-warnings --html=report.html > resultado.txt
Write-Host "Tests ejecutados. Verificar resultado.txt y report.html"
