<?php
// Install npm
passthru("npm install");

// Build assets
passthru("npm run build");
