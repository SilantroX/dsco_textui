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
