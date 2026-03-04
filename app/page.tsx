import Link from "next/link"
import { Scale, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-6 h-20 flex items-center justify-between border-b bg-white top-0 z-50 sticky">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-[#0B1528] text-white">
            <Scale className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#0B1528]">Legalbos</span>
        </div>

        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <Link href="#features" className="hover:text-gray-900 transition-colors">Características</Link>
          <Link href="#pricing" className="hover:text-gray-900 transition-colors">Precios</Link>
          <Link href="#about" className="hover:text-gray-900 transition-colors">Sobre nosotros</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-bold text-gray-600 hover:text-gray-900">
            Iniciar sesión
          </Link>
          <Link href="/register">
            <Button className="bg-[#0B1528] text-white hover:bg-slate-800 font-bold rounded-full px-6">
              Empezar ahora
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
          <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6">
            Legaltech de nueva generación
          </span>
          <h1 className="text-5xl md:text-[66px] leading-[1.1] font-extrabold tracking-tight text-[#0B1528] max-w-5xl mb-6">
            El CRM definitivo <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-[#0B1528] to-blue-400 bg-[length:200%_auto] animate-text-gradient">con IA</span><br className="hidden md:block" /> para abogados y procuradores
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mb-10 font-medium">
            Gestiona tus casos, clientes y todas las comunicaciones en un solo lugar con Legalbos. Potencia la eficiencia de tu despacho desde el primer día.
          </p>
          <div className="flex items-center gap-4 mb-16">
            <Link href="/register">
              <Button size="lg" className="bg-[#0B1528] hover:bg-slate-800 text-white font-bold h-14 px-8 rounded-full text-lg">
                Empezar ahora
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-2 border-gray-200 text-gray-700 font-bold h-14 px-8 rounded-full text-lg hover:bg-gray-50">
              Saber más
            </Button>
          </div>

          {/* Trust block */}
          <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
            <div className="flex -space-x-3">
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            </div>
            <span>Únete a más de <strong>500+ despachos</strong> en toda España</span>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-gray-50 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1528] mb-4">Todo lo que tu despacho necesita</h2>
              <p className="text-gray-500 font-medium text-lg max-w-2xl">
                Nuestra plataforma está diseñada para optimizar cada proceso legal, permitiéndote centrarte en lo que realmente importa: tus clientes.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-none shadow-sm shadow-gray-100 p-2">
                <CardHeader>
                  <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                    <Scale className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-bold">Gestión de Casos</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-500 font-medium">
                    Organiza todos tus expedientes de forma digital y segura. Accede a la documentación desde cualquier dispositivo.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm shadow-gray-100 p-2">
                <CardHeader>
                  <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <CardTitle className="text-xl font-bold">Facturación Automatizada</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-500 font-medium">
                    Genera facturas, gestiona minutas y controla pagos de manera sencilla y automatizada.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm shadow-gray-100 p-2">
                <CardHeader>
                  <div className="h-12 w-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <CardTitle className="text-xl font-bold">Calendario Judicial</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-500 font-medium">
                    Sincroniza tus vistas, plazos procesales y recordatorios automáticamente con LexNet y agendas externas.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1528] mb-4">Planes adaptados a tu crecimiento</h2>
            <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto mb-16">
              Precios transparentes sin costes ocultos. Elige el plan que mejor se adapte al tamaño de tu equipo.
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Basic */}
              <Card className="border border-gray-200 shadow-sm text-left p-2 flex flex-col hover:border-blue-200 transition-colors">
                <CardHeader>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Unipersonal</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold text-[#0B1528]">29,90€</span>
                    <span className="text-gray-500 font-medium text-sm">/mes</span>
                  </div>
                  <CardDescription className="text-sm font-medium pt-4 pb-2">Perfecto para abogados autónomos.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <Button variant="outline" className="w-full font-bold h-12 rounded-lg border-2 mb-8">Elegir Plan</Button>
                  <ul className="space-y-4 text-sm font-medium text-gray-600 flex-1">
                    <li className="flex gap-3 items-center"><CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" /> 1 Licencia Profesional</li>
                    <li className="flex gap-3 items-center"><CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" /> Gestión integral de expedientes</li>
                    <li className="flex gap-3 items-center"><CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" /> Almacenamiento en la nube 10GB</li>
                    <li className="flex gap-3 items-center"><CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" /> Soporte básico por email</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Pro */}
              <Card className="border-2 border-[#0B1528] shadow-xl text-left p-2 flex flex-col relative transform md:-translate-y-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0B1528] text-white text-[10px] font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                  Recomendado
                </div>
                <CardHeader>
                  <span className="text-xs font-bold text-[#1c4ed8] uppercase tracking-wider mb-2 block">2 - 5 Abogados</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold text-[#0B1528]">49,90€</span>
                    <span className="text-gray-500 font-medium text-sm">/mes</span>
                  </div>
                  <CardDescription className="text-sm font-medium pt-4 pb-2">Para pequeños despachos en crecimiento.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <Button className="w-full bg-[#0B1528] text-white font-bold h-12 rounded-lg mb-8 hover:bg-slate-800">Elegir Plan</Button>
                  <ul className="space-y-4 text-sm font-medium text-gray-600 flex-1">
                    <li className="flex gap-3 items-center"><CheckCircle2 className="h-5 w-5 text-[#1c4ed8] flex-shrink-0" /> Hasta 5 Licencias</li>
                    <li className="flex gap-3 items-center"><CheckCircle2 className="h-5 w-5 text-[#1c4ed8] flex-shrink-0" /> Colaboración en tiempo real</li>
                    <li className="flex gap-3 items-center"><CheckCircle2 className="h-5 w-5 text-[#1c4ed8] flex-shrink-0" /> Almacenamiento en la nube 100GB</li>
                    <li className="flex gap-3 items-center"><CheckCircle2 className="h-5 w-5 text-[#1c4ed8] flex-shrink-0" /> Soporte prioritario 24/7</li>
                    <li className="flex gap-3 items-center"><CheckCircle2 className="h-5 w-5 text-[#1c4ed8] flex-shrink-0" /> Informes de rentabilidad</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Enterprise */}
              <Card className="border border-gray-200 shadow-sm text-left p-2 flex flex-col hover:border-blue-200 transition-colors">
                <CardHeader>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">6+ Abogados</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold text-[#0B1528]">95€</span>
                    <span className="text-gray-500 font-medium text-sm">/mes</span>
                  </div>
                  <CardDescription className="text-sm font-medium pt-4 pb-2">Solución integral para grandes firmas.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <Button variant="outline" className="w-full font-bold h-12 rounded-lg border-2 mb-8">Contactar ventas</Button>
                  <ul className="space-y-4 text-sm font-medium text-gray-600 flex-1">
                    <li className="flex gap-3 items-center"><CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" /> Licencias ilimitadas</li>
                    <li className="flex gap-3 items-center"><CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" /> Panel de administración avanzado</li>
                    <li className="flex gap-3 items-center"><CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" /> Almacenamiento ilimitado</li>
                    <li className="flex gap-3 items-center"><CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" /> Gestor de cuenta dedicado</li>
                    <li className="flex gap-3 items-center"><CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" /> API de integración personalizada</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#0B1528] py-24 px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">¿Listo para transformar tu práctica legal?</h2>
          <p className="text-xl text-blue-100/70 max-w-2xl mx-auto mb-10 font-medium">
            Únete a cientos de abogados que ya optimizan su tiempo y mejoran la rentabilidad de su despacho con Legalbos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="bg-white text-[#0B1528] hover:bg-gray-100 font-bold h-14 px-8 rounded-full text-lg w-full sm:w-auto">
                Empezar ahora gratis
              </Button>
            </Link>
          </div>
          <p className="text-sm text-blue-100/50 font-medium mt-6">Prueba gratuita de 14 días. No requiere tarjeta de crédito.</p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-[#0B1528] text-white">
                <Scale className="h-3 w-3" />
              </div>
              <span className="font-bold tracking-tight text-[#0B1528]">Legalbos</span>
            </div>
            <p className="text-sm text-gray-500 font-medium pr-4">
              Simplificando la gestión legal para el abogado del siglo XXI. Tecnología robusta para despachos exigentes.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Producto</h3>
            <ul className="space-y-3 text-sm text-gray-500 font-medium">
              <li><Link href="#" className="hover:text-gray-900">Características</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Seguridad</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Integraciones</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Actualizaciones</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Compañía</h3>
            <ul className="space-y-3 text-sm text-gray-500 font-medium">
              <li><Link href="#" className="hover:text-gray-900">Sobre nosotros</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Blog</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Prensa</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Carreras</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-gray-500 font-medium">
              <li><Link href="#" className="hover:text-gray-900">Aviso legal</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Privacidad</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Cookies</Link></li>
              <li><Link href="#" className="hover:text-gray-900">Términos de servicio</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-medium">
          <p>© 2024 Legalbos Software S.L. Todos los derechos reservados.</p>
          <p>Hecho con ❤️ para abogados.</p>
        </div>
      </footer>
    </div >
  )
}
// Memoria: Landing page diseñada sin imágenes completas, rápida y visualmente atractiva con llamadas a la acción directas al login y registro.
