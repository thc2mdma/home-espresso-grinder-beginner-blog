param(
  [Parameter(Mandatory = $true)]
  [string]$Source,

  [string]$Destination = "..\src\content\blog"
)

$sourcePath = Resolve-Path $Source -ErrorAction Stop
$destinationPath = Join-Path $PSScriptRoot $Destination

if (-not (Test-Path $destinationPath)) {
  New-Item -ItemType Directory -Path $destinationPath | Out-Null
}

Get-ChildItem -Path $destinationPath -File -Include *.md, *.mdx | Remove-Item
Copy-Item -Path (Join-Path $sourcePath "*.md") -Destination $destinationPath -Force -ErrorAction SilentlyContinue
Copy-Item -Path (Join-Path $sourcePath "*.mdx") -Destination $destinationPath -Force -ErrorAction SilentlyContinue

Write-Output "Synced Markdown content from '$sourcePath' to '$destinationPath'."
