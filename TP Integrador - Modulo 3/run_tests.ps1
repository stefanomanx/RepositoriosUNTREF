Set-Location -Path (Split-Path -Path $MyInvocation.MyCommand.Path)
Write-Host "Instalando dependencias npm..."
npm install
Write-Host "Ejecutando Cypress y generando reporte mochatawesome..."
npm run cypress:run
Write-Host "Ejecución finalizada. Revisa la carpeta 'reports' para el HTML generado."
