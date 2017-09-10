cd "c:\Program Files\7-zip"

set MAIN = %HOMEPATH%\Projects\BLOG

set CURRENT = \angular-blog-interface

set test = test

set asd =%CURRENT%
%CURRENT%
for /f "tokens=1-4 delims=/ " %%i in ("%date%") do (
     set month=%%j
     set day=%%i
     set year=%%k
)
set datestr=%day%_%month%_%year%

7z a -mx=9 -tzip %MAIN%\backups\%datestr%\%datestr%_public_angular.zip %ROUTE%\src %ROUTE%\e2e %ROUTE%\.angular-cli.json %ROUTE%\back_up.bat %ROUTE%\karma.conf.js %ROUTE%\ng_build.bat %ROUTE%\ng_serve.bat %ROUTE%\package.json %ROUTE%\protractor.conf.json %ROUTE%\tsconfig.json %ROUTE%\tslint.json
