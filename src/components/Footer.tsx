"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Footer() {
  const pathname = usePathname()
  const isEspacioCalma = pathname === "/espacio-calma"
  return (
    <footer className={`mt-auto ${isEspacioCalma ? "bg-transparent" : "bg-[#E8E3CC] dark:bg-[#06090d]"}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="font-semibold text-foreground mb-3">Hábito Calma</h3>
            <p className="text-foreground leading-relaxed">
              Una biblioteca de hábitos con base científica para vivir con más calma, claridad y energía.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Enlaces</h3>
            <ul className="space-y-2" role="list">
              <li>
                <Link href="/catalogo" className="text-foreground/85 hover:text-primary-dark transition-colors duration-200">
                  Catálogo de hábitos
                </Link>
              </li>
              <li>
                <Link href="/espacio-calma" className="text-foreground/85 hover:text-primary-dark transition-colors duration-200">
                  Espacio de calma
                </Link>
              </li>
              <li>
                <Link href="/sobre-este-proyecto" className="text-foreground/85 hover:text-primary-dark transition-colors duration-200">
                  Sobre este proyecto
                </Link>
              </li>
              <li>
                <Link href="/avisos-legales" className="text-foreground/85 hover:text-primary-dark transition-colors duration-200">
                  Avisos legales
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Transparencia</h3>
            <ul className="space-y-2 text-foreground/85" role="list">
              <li>Sin almacenamiento de datos personales</li>
              <li>Sin cookies de seguimiento</li>
              <li>Sin inicio de sesión</li>
              <li>Gratuito, sin publicidad</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 text-center text-sm text-foreground/80">
          <p>
            Este contenido está creado con ayuda de IA, revisado y curado por humanos. No sustituye consejo médico,
            psicológico ni profesional.
          </p>
          <p className="mt-2">&copy; {new Date().getFullYear()} Hábito Calma</p>
        </div>
      </div>
    </footer>
  )
}
