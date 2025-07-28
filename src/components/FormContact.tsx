

'use client';
export default function FormContact() {
  return (

    <form className="max-w-2xl mx-auto bg-white/5 backdrop-blur-md p-8 rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-white mb-4">Formulario de Contacto</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Nombre"
          className="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
          required
        />
        <textarea
          placeholder="Mensaje"
          className="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-amber-500 h-32"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-amber-500 text-white font-semibold rounded hover:bg-amber-600 transition-colors duration-300"
      >
        Enviar
      </button>
    </form>
  );
}
