# 🖥️ dsco_textui — Text UI for FiveM

> **Bilingual / Bilingüe** — English & Español

[![Discord](https://img.shields.io/badge/Discord-Join%20Server-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/cheBPA2Fg3)
[![FiveM](https://img.shields.io/badge/FiveM-Compatible-F40552?style=for-the-badge&logo=fivem&logoColor=white)](https://fivem.net/)
[![Framework](https://img.shields.io/badge/Compatible-Standalone%20%7C%20ESX%20%7C%20QBCore-orange?style=for-the-badge)](https://fivem.net/)

---

## 🌐 English

### Overview

A lightweight and flexible Text UI resource for FiveM. Designed as a drop-in replacement for the default text UIs in ESX and QBCore — with zero or minimal changes required in your existing scripts.

---

### 🚀 Installation

1. Copy the `dsco_textui` folder into your server's `resources/` directory.
2. Add the following line to your `server.cfg`:
   ```
   ensure dsco_textui
   ```
3. Restart your server. That's it!

---

### 🎮 Usage

Choose the integration method that fits your setup:

---

#### Standalone

Use the exports directly in any script:

```lua
exports["dsco_textui"]:ShowUI("E", "Open inventory")
exports["dsco_textui"]:HideUI()
```

---

#### ESX

A direct drop-in replacement for `esx_textui`. Just swap the resource name — the function signature is identical.

```lua
-- ❌ Before
exports["esx_textui"]:TextUI("Press [E]", "info")

-- ✅ Now
exports["dsco_textui"]:TextUI("Press [E]", "info")
exports["dsco_textui"]:HideUI()
```

---

#### QBCore

There are **3 integration options** — pick the one that best fits your workflow:

---

##### Option 1 — Change the resource name *(simplest)*

Swap `qb-core` for `dsco_textui` in your scripts. The function signatures are identical.

```lua
-- ❌ Before
exports["qb-core"]:DrawText("text", "left")

-- ✅ Now
exports["dsco_textui"]:DrawText("text", "left")
exports["dsco_textui"]:HideText()
exports["dsco_textui"]:ChangeText("new text", "left")
exports["dsco_textui"]:KeyPressed()
```

---

##### Option 2 — Use Events *(no script changes required)*

If your scripts already trigger QBCore events, `dsco_textui` listens for them automatically — no edits needed.

```lua
-- Client-side
TriggerEvent("qb-core:client:DrawText",   "text", "left")
TriggerEvent("qb-core:client:ChangeText", "new text", "left")
TriggerEvent("qb-core:client:HideText")
TriggerEvent("qb-core:client:KeyPressed")

-- Server-side
TriggerClientEvent("qb-core:client:DrawText",   source, "text", "left")
TriggerClientEvent("qb-core:client:HideText",   source)
```

---

##### Option 3 — Patch qb-core *(all scripts work without any changes)*

Edit `qb-core/client/functions.lua` and replace the 4 local text UI functions. After this, every script on your server will use `dsco_textui` automatically.

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

> ⚠️ **Remember to restart your server** after patching `qb-core/client/functions.lua`.

---
---

## 🌐 Español

### Descripción General

Un recurso de Text UI ligero y flexible para FiveM. Diseñado como reemplazo directo de las Text UI predeterminadas de ESX y QBCore — con cambios mínimos o nulos en tus scripts existentes.

---

### 🚀 Instalación

1. Copia la carpeta `dsco_textui` dentro del directorio `resources/` de tu servidor.
2. Añade la siguiente línea a tu `server.cfg`:
   ```
   ensure dsco_textui
   ```
3. Reinicia tu servidor. ¡Listo!

---

### 🎮 Uso

Elige el método de integración que mejor se adapte a tu configuración:

---

#### Standalone

Usa los exports directamente en cualquier script:

```lua
exports["dsco_textui"]:ShowUI("E", "Abrir inventario")
exports["dsco_textui"]:HideUI()
```

---

#### ESX

Reemplazo directo para `esx_textui`. Solo cambia el nombre del recurso — la firma de la función es idéntica.

```lua
-- ❌ Antes
exports["esx_textui"]:TextUI("Presiona [E]", "info")

-- ✅ Ahora
exports["dsco_textui"]:TextUI("Presiona [E]", "info")
exports["dsco_textui"]:HideUI()
```

---

#### QBCore

Hay **3 opciones de integración** — elige la que mejor se adapte a tu flujo de trabajo:

---

##### Opción 1 — Cambiar el nombre del recurso *(más simple)*

Reemplaza `qb-core` por `dsco_textui` en tus scripts. Las firmas de función son idénticas.

```lua
-- ❌ Antes
exports["qb-core"]:DrawText("texto", "left")

-- ✅ Ahora
exports["dsco_textui"]:DrawText("texto", "left")
exports["dsco_textui"]:HideText()
exports["dsco_textui"]:ChangeText("nuevo texto", "left")
exports["dsco_textui"]:KeyPressed()
```

---

##### Opción 2 — Usar Eventos *(sin modificar scripts)*

Si tus scripts ya lanzan eventos de QBCore, `dsco_textui` los escucha automáticamente — sin necesidad de editar nada.

```lua
-- Cliente
TriggerEvent("qb-core:client:DrawText",   "texto", "left")
TriggerEvent("qb-core:client:ChangeText", "nuevo texto", "left")
TriggerEvent("qb-core:client:HideText")
TriggerEvent("qb-core:client:KeyPressed")

-- Servidor
TriggerClientEvent("qb-core:client:DrawText",   source, "texto", "left")
TriggerClientEvent("qb-core:client:HideText",   source)
```

---

##### Opción 3 — Parchear qb-core *(todos los scripts funcionan sin cambios)*

Edita `qb-core/client/functions.lua` y reemplaza las 4 funciones locales de Text UI. Después de esto, todos los scripts del servidor usarán `dsco_textui` automáticamente.

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

> ⚠️ **Recuerda reiniciar tu servidor** después de parchear `qb-core/client/functions.lua`.

---

## 💬 Support / Soporte

Have questions or need help? Join our Discord community!  
¿Tienes dudas o necesitas ayuda? ¡Únete a nuestra comunidad de Discord!

[![Discord](https://img.shields.io/badge/Discord-Join%20Now-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/cheBPA2Fg3)

---

*Made with ❤️ for the FiveM community.*
