# dsco_textui

Text UI for FiveM. Compatible with Standalone, ESX and QBCore.
Text UI para FiveM. Compatible con Standalone, ESX y QBCore.

**Discord:** https://discord.gg/cheBPA2Fg3

---

## Installation / Instalación

1. Copy the `dsco_textui` folder into your `resources/` folder
   Copia la carpeta `dsco_textui` en tu carpeta `resources/`
2. Add `ensure dsco_textui` to your `server.cfg`
   Agrega `ensure dsco_textui` en tu `server.cfg`

---

## Usage — Standalone / Uso — Standalone

```lua
exports["dsco_textui"]:ShowUI("E", "Open inventory")
exports["dsco_textui"]:HideUI()
```

---

## Usage — ESX / Uso — ESX

Replace `esx_textui` with `dsco_textui`. Same signature, no further changes needed.
Reemplaza `esx_textui` por `dsco_textui`. Misma firma, sin cambiar nada más.

```lua
-- Before / Antes:  exports["esx_textui"]:TextUI("Press [E]", "info")
-- Now / Ahora:
exports["dsco_textui"]:TextUI("Press [E]", "info")
exports["dsco_textui"]:HideUI()
```

---

## Usage — QBCore / Uso — QBCore

There are 3 ways. Pick whichever works best for you.
Hay 3 formas. Elige la que mejor te convenga.

### Option 1 — Change the resource in your script (simplest)

### Opción 1 — Cambiar el recurso en tu script (más simple)

Replace `qb-core` with `dsco_textui`. Exact same signature.
Reemplaza `qb-core` por `dsco_textui`. Misma firma exacta.

```lua
-- Before / Antes:  exports["qb-core"]:DrawText("text", "left")
-- Now / Ahora:
exports["dsco_textui"]:DrawText("text", "left")
exports["dsco_textui"]:HideText()
exports["dsco_textui"]:ChangeText("new text", "left")
exports["dsco_textui"]:KeyPressed()
```

### Option 2 — Events (no changes to your scripts at all)

### Opción 2 — Eventos (sin cambiar nada en tus scripts)

If your scripts already use events, it works automatically.
Si tus scripts ya usan eventos, funciona automáticamente.

```lua
TriggerEvent("qb-core:client:DrawText",   "text", "left")
TriggerEvent("qb-core:client:ChangeText", "new text", "left")
TriggerEvent("qb-core:client:HideText")
TriggerEvent("qb-core:client:KeyPressed")

-- From server / Desde servidor:
TriggerClientEvent("qb-core:client:DrawText", source, "text", "left")
TriggerClientEvent("qb-core:client:HideText", source)
```

### Option 3 — Patch qb-core (all scripts work without any changes)

### Opción 3 — Patch en qb-core (todos los scripts funcionan sin cambios)

Edit `qb-core/client/functions.lua` and replace the 4 local functions.
Edita `qb-core/client/functions.lua` y reemplaza las 4 funciones locales.

```lua
local function hideText()
    exports["dsco_textui"]:HideText()
end

local function drawText(text, position)
    exports["dsco_textui"]:DrawText(text, position)
end

local function changeText(text, position)
    exports["dsco_textui"]:ChangeText(text, position)
end

local function keyPressed()
    exports["dsco_textui"]:KeyPressed()
end
```

---
