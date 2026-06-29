export async function onRequestPost(context) {
  try {
    // 1. Recibe los datos enviados desde tu formulario web
    const { nombre, email } = await context.request.json();

    // 2. Valida que no estén vacíos
    if (!nombre || !email) {
      return new Response("Faltan campos obligatorios", { status: 400 });
    }

    // 3. Los guarda en la tabla 'usuarios' usando la vinculación 'DB' que hiciste en Cloudflare
    await context.env.DB.prepare(
      "INSERT INTO usuarios (nombre, email) VALUES (?, ?)"
    )
    .bind(nombre, email)
    .run();

    // 4. Responde a la web que todo salió bien
    return new Response(JSON.stringify({ success: true, message: "Usuario registrado con éxito" }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
