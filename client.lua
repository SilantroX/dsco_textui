-- ─────────────────────────────────────────
--  CÓDIGO ORIGINAL (sin cambios)
-- ─────────────────────────────────────────
hide = true
function MostrarUI(tecla, accion)
    SendNUIMessage({
        type = 'showTextUI',
        tecla = tecla,
        accion = accion,
    })
    hide = false
end

function OcultarUI()
    if hide then return end
    SendNUIMessage({
        type = 'hideTextUI',
    })
    hide = true
end

exports("MostrarUI", function(tecla, accion)
    MostrarUI(tecla, accion)
end)

exports("OcultarUI", function()
    OcultarUI()
end)

-- ─────────────────────────────────────────
--  BRIDGE ESX
--  Uso: exports["dsco_textui"]:TextUI("Presiona [E]", "info")
--  Uso: exports["dsco_textui"]:HideUI()
-- ─────────────────────────────────────────
exports("TextUI", function(mensaje, tipo)
    MostrarUI("", mensaje)
end)

exports("HideUI", function()
    OcultarUI()
end)

-- ─────────────────────────────────────────
--  BRIDGE QBCORE
--
--  OPCIÓN 1 — exports (cambia qb-core por dsco_textui en tu script):
--    exports["dsco_textui"]:DrawText("Presiona ~INPUT_CONTEXT~", "left")
--    exports["dsco_textui"]:HideText()
--
--  OPCIÓN 2 — eventos (funciona sin cambiar nada en tus scripts):
--    TriggerEvent("qb-core:client:DrawText", "texto", "left")
--    TriggerEvent("qb-core:client:HideText")
--
--  OPCIÓN 3 — patch en qb-core/client/functions.lua (ver README)
-- ─────────────────────────────────────────
exports("DrawText", function(text, position)
    MostrarUI("E", text)
end)

exports("HideText", function()
    OcultarUI()
end)

exports("ChangeText", function(text, position)
    -- Actualiza el texto sin re-animar
    SendNUIMessage({
        type   = 'showTextUI',
        tecla  = '',
        accion = text,
    })
    hide = false
end)

exports("KeyPressed", function()
    CreateThread(function()
        SendNUIMessage({ type = 'keyPressed' })
        Wait(500)
        OcultarUI()
    end)
end)

-- Eventos QBCore (TriggerEvent / TriggerClientEvent)
RegisterNetEvent('qb-core:client:DrawText', function(text, pos) MostrarUI("", text) end)
RegisterNetEvent('qb-core:client:ChangeText', function(text, pos)
    SendNUIMessage({ type = 'showTextUI', tecla = '', accion = text })
    hide = false
end)
RegisterNetEvent('qb-core:client:HideText', function() OcultarUI() end)
RegisterNetEvent('qb-core:client:KeyPressed', function()
    CreateThread(function()
        SendNUIMessage({ type = 'keyPressed' })
        Wait(500)
        OcultarUI()
    end)
end)

AddEventHandler('qb-core:client:DrawText', function(text, pos) MostrarUI("", text) end)
AddEventHandler('qb-core:client:ChangeText', function(text, pos)
    SendNUIMessage({ type = 'showTextUI', tecla = '', accion = text })
    hide = false
end)
AddEventHandler('qb-core:client:HideText', function() OcultarUI() end)
AddEventHandler('qb-core:client:KeyPressed', function()
    CreateThread(function()
        SendNUIMessage({ type = 'keyPressed' })
        Wait(500)
        OcultarUI()
    end)
end)
