import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sobre este proyecto — Hábito Calma",
  description: "Qué es Hábito Calma, por qué existe y nuestros principios de transparencia.",
}

export default function SobrePage() {
  return (
    <>
      <Header />
      <main>
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">Sobre este proyecto</h1>
          <p className="text-text-muted text-lg font-light mb-10">Qué es Hábito Calma y por qué existe.</p>

          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">¿Qué es Hábito Calma?</h2>
            <p className="text-foreground leading-relaxed mb-4">
              Hábito Calma es una biblioteca gratuita de hábitos generales con base científica, explicados de forma
              clara y accesible. No es una aplicación de productividad ni un diario de seguimiento. Es un lugar donde
              aprender sobre hábitos que pueden mejorar tu bienestar, sin presión, sin culpa, sin prisas.
            </p>
            <p className="text-foreground leading-relaxed">
              Cada hábito incluye una explicación sencilla de cómo funciona en tu organismo, por qué ayuda, cómo
              empezar hoy mismo y qué errores evitar. Todo explicado con terminología científica pero en un lenguaje
              que cualquier persona puede entender.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">¿Por qué existe?</h2>
            <p className="text-foreground leading-relaxed mb-4">
              Porque la información sobre salud y bienestar suele venir en dos formatos igualmente poco útiles: o es
              demasiado técnica (llena de jerga que solo entienden profesionales) o es demasiado superficial (tips
              rápidos sin explicación ni contexto).
            </p>
            <p className="text-foreground leading-relaxed mb-4">
              Hábito Calma nace del convencimiento de que entender el porqué científico de un hábito —cómo afecta a
              tus hormonas, a tu sistema nervioso, a tu metabolismo— es lo que realmente motiva un cambio sostenible.
            </p>
            <p className="text-foreground leading-relaxed">
              Además, queríamos crear un espacio digital que se sintiera como un refugio: sin ruido, sin notificaciones,
              sin publicidad, sin recolección de datos, sin presión. Un lugar donde puedas ir a aprender y a respirar.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">Nuestros principios</h2>
            <ul className="space-y-4">
              {[
                {
                  title: "Calma y claridad",
                  desc: "Diseño visual tranquilo, contenido claro, sin estímulos innecesarios. La web debe sentirse como un espacio seguro.",
                },
                {
                  title: "Ciencia accesible",
                  desc: "Cada explicación está basada en fisiología, neurociencia y endocrinología, pero escrita para que cualquier persona la entienda.",
                },
                {
                  title: "Control del usuario",
                  desc: "Tú decides cuándo y cómo usar la web. El sonido nunca se activa automáticamente. Las animaciones son suaves y respetan la opción de movimiento reducido.",
                },
                {
                  title: "Privacidad total",
                  desc: "No almacenamos datos personales, no usamos cookies de seguimiento, no hay inicio de sesión. No necesitamos saber quién eres para ayudarte.",
                },
                {
                  title: "Gratuidad",
                  desc: "Hábito Calma es y será siempre gratuito. Sin suscripciones, sin compras dentro de la app, sin publicidad.",
                },
              ].map((item, i) => (
                <li key={i} className="bg-surface border border-muted/40 rounded-xl p-5">
                  <h3 className="font-display font-semibold text-foreground mb-1.5">{item.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">Notas de transparencia</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-primary-light/10 rounded-xl border border-primary-light/20">
                <span className="shrink-0 text-lg mt-0.5">🤖</span>
                <div>
                  <p className="font-medium text-foreground text-sm mb-0.5">Contenido asistido por IA</p>
                  <p className="text-sm text-text-muted">
                    Este contenido está creado con ayuda de inteligencia artificial, pero todo es revisado y curado por
                    humanos. Verificamos la precisión científica y adaptamos el lenguaje para que sea claro y accesible.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-secondary-light/10 rounded-xl border border-secondary-light/20">
                <span className="shrink-0 text-lg mt-0.5">🔒</span>
                <div>
                  <p className="font-medium text-foreground text-sm mb-0.5">Privacidad de datos</p>
                  <p className="text-sm text-text-muted">
                    No almacenamos datos personales. No hay formularios, no hay registro, no hay cookies de
                    seguimiento. Tu visita es anónima.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-tertiary-light/10 rounded-xl border border-tertiary-light/20">
                <span className="shrink-0 text-lg mt-0.5">🎮</span>
                <div>
                  <p className="font-medium text-foreground text-sm mb-0.5">Control total</p>
                  <p className="text-sm text-text-muted">
                    El sonido y las animaciones son opcionales y completamente controlables por el usuario. Nada se
                    activa automáticamente sin tu consentimiento explícito.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-warning/10 border border-warning/20 rounded-2xl p-6 sm:p-8">
            <h2 className="font-display text-lg font-semibold text-foreground mb-3">Descargo de responsabilidad</h2>
            <p className="text-foreground leading-relaxed text-[15px]">
              Esta web no sustituye consejo médico, psicológico ni profesional. El contenido de Hábito Calma es
              informativo y educativo, pero no debe utilizarse como diagnóstico, tratamiento o recomendación médica. Si
              tienes problemas de salud física o mental, consulta siempre con un profesional sanitario cualificado.
            </p>
          </section>

          <div className="mt-10 text-center">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors duration-300"
            >
              Explorar hábitos
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
