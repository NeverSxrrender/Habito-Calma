import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Avisos legales — Hábito Calma",
  description: "Términos de uso, política de privacidad y aviso legal de Hábito Calma.",
}

export default function AvisosLegalesPage() {
  return (
    <>
      <Header />
      <main>
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">Avisos legales</h1>
          <p className="text-text-muted text-lg font-light mb-10">Términos de uso, privacidad y responsabilidad.</p>

          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">Términos de uso</h2>
            <div className="space-y-4 text-foreground leading-relaxed text-[15px]">
              <p>
                Al acceder y utilizar Hábito Calma, aceptas los siguientes términos y condiciones. Si no estás de
                acuerdo con alguno de estos términos, te recomendamos que no utilices esta web.
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  El contenido de esta web es únicamente informativo y educativo. No constituye consejo médico,
                  psicológico ni profesional de ningún tipo.
                </li>
                <li>
                  No garantizamos la exactitud, integridad o actualidad del contenido. Aunque nos esforzamos por
                  ofrecer información precisa basada en ciencia, los conocimientos evolucionan y pueden existir errores.
                </li>
                <li>
                  El uso que hagas de la información contenida en esta web es bajo tu propia responsabilidad.
                </li>
                <li>
                  No nos hacemos responsables de ningún daño o perjuicio derivado del uso de esta web o de la
                  información contenida en ella.
                </li>
                <li>
                  La web es gratuita y no requiere registro. No recopilamos datos personales de los usuarios.
                </li>
                <li>
                  Nos reservamos el derecho de modificar, suspender o interrumpir la web en cualquier momento sin
                  previo aviso.
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">Política de privacidad</h2>
            <div className="space-y-4 text-foreground leading-relaxed text-[15px]">
              <p>
                En Hábito Calma nos tomamos muy en serio tu privacidad. Esta política explica cómo manejamos tu
                información.
              </p>

              <h3 className="font-semibold text-foreground text-base mt-6">Datos que recopilamos</h3>
              <p>
                <strong>Ninguno.</strong> Hábito Calma no recopila, almacena ni procesa datos personales de los
                usuarios. No hay formularios de registro, no hay inicio de sesión, no hay formularios de contacto que
                almacenen información.
              </p>

              <h3 className="font-semibold text-foreground text-base mt-6">Cookies</h3>
              <p>
                Esta web no utiliza cookies de seguimiento, cookies de publicidad ni cookies de análisis que
                identifiquen tu actividad. Es posible que se utilicen cookies técnicas necesarias para el
                funcionamiento básico de la web (como la sesión de navegación), que no almacenan información personal.
              </p>

              <h3 className="font-semibold text-foreground text-base mt-6">Enlaces de sonido</h3>
              <p>
                Los sonidos disponibles en el Espacio de Calma se cargan desde fuentes externas (SoundHelix). Al
                reproducirlos, tu navegador se conecta a esos servidores, lo que puede generar registros anónimos de
                acceso. No tenemos control sobre estos registros.
              </p>

              <h3 className="font-semibold text-foreground text-base mt-6">Alojamiento</h3>
              <p>
                Esta web está alojada en Vercel, cuyos servidores pueden registrar direcciones IP de forma temporal
                con fines técnicos y de seguridad. Estos registros no están vinculados a ninguna información personal
                identificable ni los utilizamos para seguimiento.
              </p>

              <h3 className="font-semibold text-foreground text-base mt-6">Derechos</h3>
              <p>
                Dado que no recopilamos datos personales, no es necesario ejercer derechos de acceso, rectificación,
                cancelación u oposición sobre datos que no poseemos. Si tienes alguna pregunta sobre privacidad,
                puedes consultar el repositorio público del proyecto.
              </p>
            </div>
          </section>

          <section className="bg-warning/10 border border-warning/20 rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">Aviso legal</h2>
            <div className="space-y-4 text-foreground leading-relaxed text-[15px]">
              <p>
                <strong>Responsable del sitio web:</strong> Hábito Calma es un proyecto personal sin ánimo de lucro.
              </p>
              <p>
                <strong>Contenido general:</strong> Toda la información publicada en esta web tiene carácter
                meramente informativo y divulgativo. En ningún caso sustituye el consejo, diagnóstico o tratamiento
                de un profesional sanitario cualificado (médico, psicólogo, nutricionista, fisioterapeuta, etc.).
              </p>
              <p>
                <strong>Salud:</strong> Si tienes o sospechas que tienes un problema de salud física o mental,
                consulta a un profesional sanitario. No automediques ni modifiques tus hábitos de salud basándote
                únicamente en la información de esta web sin supervisión profesional.
              </p>
              <p>
                <strong>Propiedad intelectual:</strong> El contenido textual de esta web está creado con asistencia
                de inteligencia artificial y revisado por humanos. El diseño, el código y la estructura son
                propiedad del proyecto Hábito Calma. Puedes compartir la información citando la fuente.
              </p>
              <p>
                <strong>Enlaces externos:</strong> Esta web puede contener enlaces a sitios externos. No nos
                hacemos responsables del contenido ni de las políticas de privacidad de dichos sitios.
              </p>
              <p className="text-sm text-text-muted mt-4">
                Última actualización: junio 2026.
              </p>
            </div>
          </section>

          <div className="mt-10 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors duration-300"
            >
              Volver al inicio
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
