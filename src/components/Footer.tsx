import Link from "next/link"

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-muted/60 bg-surface-warm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="font-display font-semibold text-foreground mb-3">Hábito Calma</h3>
            <p className="text-text-muted leading-relaxed">
              Una biblioteca de hábitos con base científica para vivir con más calma, claridad y energía.
            </p>
          </div>

          <div>
            <h3 className="font-display font-semibold text-foreground mb-3">Enlaces</h3>
            <ul className="space-y-2" role="list">
              <li>
                <Link href="/catalogo" className="text-text-muted hover:text-primary-dark transition-colors duration-200">
                  Catálogo de hábitos
                </Link>
              </li>
              <li>
                <Link href="/espacio-calma" className="text-text-muted hover:text-primary-dark transition-colors duration-200">
                  Espacio de calma
                </Link>
              </li>
              <li>
                <Link href="/sobre-este-proyecto" className="text-text-muted hover:text-primary-dark transition-colors duration-200">
                  Sobre este proyecto
                </Link>
              </li>
              <li>
                <Link href="/avisos-legales" className="text-text-muted hover:text-primary-dark transition-colors duration-200">
                  Avisos legales
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-foreground mb-3">Transparencia</h3>
            <ul className="space-y-2 text-text-muted" role="list">
              <li>No almacenamos datos personales</li>
              <li>Sin cookies de seguimiento</li>
              <li>Sin inicio de sesión</li>
              <li>100% gratuito</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-muted/40 text-center text-xs text-text-light">
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
