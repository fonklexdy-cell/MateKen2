// Este archivo es 100% aislado. No interfiere con el resto de tu aplicación.
async function verificarUsuarioPremium(usuarioId) {
    try {
           const urlSupabase = `https://tgmoicflaqbvmjdqqzxk.supabase.co/rest/v1/profiles?id=eq.${usuarioId}&select=es_premium`;

        const respuesta = await fetch(urlSupabase, {
            method: 'GET',
            headers: {
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnbW9pY2ZsYXFidm1qZHFxenhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ5ODU2OTIsImV4cCI6MjAzMDU2MTY5Mn0.TRfYfJWmOXBnjo03JBux7DJoqYoiah_b1d7TMVmHfCQ',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnbW9pY2ZsYXFidm1qZHFxenhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ5ODU2OTIsImV4cCI6MjAzMDU2MTY5Mn0.TRfYfJWmOXBnjo03JBux7DJoqYoiah_b1d7TMVmHfCQ'
            }
        });

        if (!respuesta.ok) return false;
        
        const datos = await respuesta.json();
        
        // Retorna el valor directamente de la lista
        return datos.length > 0 ? datos[0].es_premium : false;

    } catch (error) {
        // ESCUDO DE PROTECCIÓN: Si Supabase falla, la app no se cae.
        console.error("Supabase protegido: La app sigue funcionando con normalidad.", error);
        return false;
    }
}
