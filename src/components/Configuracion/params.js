

export const params={
    lang:["es", "en"],
    data:[{
        category:"balance",
        widget:["balance-electrico"]
    },
    {
        category:"demanda",
        widget:["evolucion", "variacion-componentes", "variacion-componentes-movil", "ire-general", "ire-general-anual",
        "ire-general-movil", "ire-industria", "ire-industria-anual", "ire-industria-movil", "ire-servicios", "ire-servicios-anual",
    "ire-servicios-movil", "ire-otras", "ire-otras-anual", "ire-otras-movil", "demanda-maxima-diaria", "demanda-maxima-horaria","perdidas-transporte",
"potencia-maxima-instantanea","variacion-demanda", "potencia-maxima-instantanea-variacion", "potencia-maxima-instantanea-variacion-historico",
"demanda-tiempo-real", "variacion-componentes-anual" ]
    },{
        category:"generacion",
        widget:["estructura-generacion", "evolucion-renovable-no-renovable", "estructura-renovables", "estructura-generacion-emisiones-asociadas",
    "evolucion-estructura-generacion-emisiones-asociadas", "no-renovables-detalle-emisiones-CO2", "maxima-renovable", "potencia-instalada", "maxima-renovable-historico",
"maxima-sin-emisiones-historico"]
    },
    {
        category:"intercambios",
        widget:["francia-frontera","portugal-frontera", "marruecos-frontera", "andorra-frontera","lineas-francia", "lineas-portugal", "lineas-marruecos",
        "lineas-andorra", "francia-frontera-programado","portugal-frontera-programado","marruecos-frontera-programado","andorra-frontera-programado",
    "enlace-baleares", "frontera-fisicos","todas-fronteras-fisicos","frontera-programados","todas-fronteras-programados"]
    },
    {
        category:"transporte",
        widget:["energia-no-suministrada-ens","indice-indisponibilidad","tiempo-interrupcion-medio-tim","kilometros-lineas","indice-disponibilidad","numero-cortes",
    "ens-tim","indice-disponibilidad-total"]
    },
    {
        category:"mercados",
        widget:["componentes-precio-energia-cierre-desglose","componentes-precio","energia-gestionada-servicios-ajuste","energia-restricciones","precios-restricciones",
    "reserva-potencia-adicional","banda-regulacion-secundaria","energia-precios-regulacion-secundaria","energia-precios-regulacion-terciaria","energia-precios-gestion-desvios",
"coste-servicios-ajuste","volumen-energia-servicios-ajuste-variacion","precios-mercados-tiempo-real","energia-precios-ponderados-gestion-desvios-before","energia-precios-ponderados-gestion-desvios",
"energia-precios-ponderados-gestion-desvios-after"]
    }
],
time_trunc:["hour", "day", "month", "year"]
}