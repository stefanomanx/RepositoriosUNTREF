TP Integrador - Módulo 3
=========================

Instrucciones para ejecutar las pruebas y generar un reporte HTML.

1) Subir al repositorio git

 - Inicializar/git add/commit/push (ejemplo):

```bash
git init
git add .
git commit -m "Agregar tests Cypress y scripts de ejecución"
git remote add origin <url-de-tu-repo>
git branch -M main
git push -u origin main
```

2) Ejecutar tests y generar HTML (en Windows PowerShell):

```powershell
cd 'TP Integrador - Modulo 3'
.\run_tests.ps1
```

Esto instalará dependencias (npm) y ejecutará Cypress con el reporter mochawesome,
generando los archivos HTML en la carpeta `reports`.
