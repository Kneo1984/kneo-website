# 
#   A U T O  D A S H   Deep-Sea-Corals    CSV  Power BI  PDF/PNG/PPT 
# 
#   1) CSV-Export  (MySQL 8 CLI)
#   2) Auto-Refresh PBIX + PDF-Export  (pbixrefresher.exe)
#   3) PDF  PNG (Ghostscript)   corals_dashboard.png
#   4) PNG  PPTX  (PowerPoint COM)      corals_dashboard.pptx
# ---------------------------------------------------------------------------

#  PARAMETER 
$mysqlExe       = 'C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe'
$mysqlUser      = 'root'
$mysqlPwd       = 'Scheisser2008()'
$dbName         = 'abschlussprojekt'

$pbixFile       = "$HOME\OneDrive\Desktop\Power-BI_Visualisierungen.pbix"
$pbixRefresher  = 'C:\Tools\pbixrefresher\pbixrefresher.exe'

$gsExe          = 'C:\Program Files\gs\gs10.03.0\bin\gswin64c.exe'   # Ghostscript 10.x
$pptTemplate    = ''   # leer = neues leeres Deck

$exportDir      = "$HOME\Desktop\AUTO_DASH_CORALS"
$pdfOut         = Join-Path $exportDir 'corals_dashboard.pdf'
$pngOut         = Join-Path $exportDir 'corals_dashboard.png'
$pptOut         = Join-Path $exportDir 'corals_dashboard.pptx'

$tables         = @('corals_clean','v_depthzone_counts','v_top10_species','v_yearly_counts')

#  0) PREP  
if (-not (Test-Path $exportDir)) { New-Item -ItemType Directory -Path $exportDir | Out-Null }

#  1) CSV-EXPORT 
Write-Host "`n  Exportiere CSVs " -ForegroundColor Cyan
foreach ($t in $tables) {
    $csvPath = "$exportDir\$t.csv"
    $sql     = "SELECT * FROM $t INTO OUTFILE '$csvPath' FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\n';"
    & "$mysqlExe" -u $mysqlUser -p$mysqlPwd -e "$sql" $dbName 2>$null
    if (Test-Path $csvPath) { Write-Host "   $t  $csvPath" } else { Write-Warning "   $t nicht erzeugt" }
}

#  2) POWER BI REFRESH + PDF 
if (Test-Path $pbixRefresher) {
    Write-Host "`n  Aktualisiere PBIX & exportiere PDF " -ForegroundColor Cyan
    & "$pbixRefresher" --file "`"$pbixFile`"" --export-pdf "`"$pdfOut`"" --close --wait
    if (Test-Path $pdfOut) { Write-Host "   PDF  $pdfOut" } else { Write-Warning "   PDF nicht erzeugt" }
}
else {
    Write-Warning "`n  pbixrefresher.exe nicht gefunden  PDF-Export wird übersprungen."
    Start-Process -FilePath "$Env:ProgramFiles\Microsoft Power BI Desktop\bin\PBIDesktop.exe" -ArgumentList "`"$pbixFile`""
}

#  3) PDF  PNG 
if (Test-Path $gsExe -and Test-Path $pdfOut) {
    Write-Host "`n  Konvertiere PDF  PNG " -ForegroundColor Cyan
    & "$gsExe" -dSAFER -dBATCH -dNOPAUSE -sDEVICE=png16m -r300 `
               -dFirstPage=1 -dLastPage=1 -sOutputFile="$pngOut" "$pdfOut"
    if (Test-Path $pngOut) { Write-Host "   PNG  $pngOut" } else { Write-Warning "   PNG nicht erzeugt" }
}
else {
    Write-Warning "`n  Ghostscript oder PDF fehlt  PNG-Export wird übersprungen."
}

#  4) PNG  PPTX 
if (Test-Path $pngOut) {
    Write-Host "`n  Erzeuge PowerPoint " -ForegroundColor Cyan
    $ppt = New-Object -ComObject PowerPoint.Application
    $ppt.Visible = [Microsoft.Office.Interop.PowerPoint.MsoTriState]::msoTrue
    $pres = if ($pptTemplate -and (Test-Path $pptTemplate)) {
        $ppt.Presentations.Open($pptTemplate, $true, $false, $false)
    } else {
        $ppt.Presentations.Add()
    }
    $slide = $pres.Slides.Add(1, 12)   # 12 = ppLayoutBlank
    $slide.Shapes.AddPicture($pngOut, $false, $true, 0, 0, $pres.PageSetup.SlideWidth, $pres.PageSetup.SlideHeight) | Out-Null
    $pres.SaveAs($pptOut)
    $pres.Close(); $ppt.Quit()
    Write-Host "   PPTX  $pptOut"
}

Write-Host "`n  MONSTER fertig." -ForegroundColor Green
