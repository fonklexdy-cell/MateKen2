export async function onRequestPost(context) {
  try {
    // Lee lo que el usuario escribe en tu formulario web
    const { nombre, correo } = await context.request.json();

    if (!nombre || !correo) {
      return new Response("Faltan campos obligatorios", { status: 400 });
    }

    // Guarda los datos usando los nombres exactos de tus columnas
    await context.env.DB.prepare(
      "INSERT INTO usuarios (nombre, correo) VALUES (?, ?)"
    )
    .bind(nombre, correo)
    .run();

    return new Response(JSON.stringify({ success: true, message: "Guardado en Cloudflare D1" }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
