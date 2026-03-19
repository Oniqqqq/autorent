import { PageTransition } from "@/components/ui/page-transition";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, CreditCard, Clock, ChevronRight, CheckCircle2, AlertCircle, Car, ShieldCheck, Receipt } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <PageTransition className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Добрый день, Алексей</h1>
          <p className="text-sm text-gray-500 mt-1 max-w-sm">
            Оформление подписки движется по плану. Ниже — текущий статус и ближайшие действия.
          </p>
        </div>
        <Link to="/profile" className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm hover:opacity-90 transition-opacity">
          <img src="https://picsum.photos/seed/alexey/100/100" alt="Алексей" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
        </Link>
      </div>

      {/* Hero Card */}
      <Card className="overflow-hidden border-0 shadow-xl shadow-orange-500/5 bg-gradient-to-br from-white to-orange-50/30 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100/40 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <CardContent className="p-6 sm:p-8 relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Toyota Camry</h2>
                <Badge variant="outline" className="bg-white/50 backdrop-blur-sm border-orange-200 text-orange-700">Комфорт</Badge>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>Статус: <span className="font-medium text-gray-900">Оформление</span></span>
              </div>
            </div>
            <div className="hidden sm:flex h-16 w-16 rounded-2xl bg-orange-100 items-center justify-center">
              <Car className="h-8 w-8 text-orange-600" strokeWidth={1.5} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-8">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Ежемесячный платеж</p>
              <p className="text-xl sm:text-2xl font-semibold text-gray-900">{formatCurrency(68000)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Следующий шаг</p>
              <Link to="/documents" className="text-base sm:text-lg font-medium text-gray-900 flex items-center hover:text-orange-600 transition-colors">
                Подписать договор
                <ChevronRight className="h-4 w-4 ml-1 text-orange-500" />
              </Link>
            </div>
          </div>

          {/* Progress Visualization */}
          <Link to="/scoring" className="block space-y-3 group">
            <div className="flex justify-between text-xs font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
              <span>Прогресс оформления</span>
              <span className="text-orange-600 flex items-center">
                Шаг 3 из 4
                <ChevronRight className="h-3 w-3 ml-0.5" />
              </span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden flex">
              <div className="h-full bg-emerald-500 w-1/4 rounded-full border-r border-white/50" />
              <div className="h-full bg-emerald-500 w-1/4 rounded-full border-r border-white/50" />
              <div className="h-full bg-orange-500 w-1/4 rounded-full relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
              <div className="h-full bg-transparent w-1/4 rounded-full" />
            </div>
          </Link>
        </CardContent>
      </Card>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 px-1">Что нужно сделать сейчас</h3>
          
          <Link to="/documents" className="block">
            <Card className="group cursor-pointer hover:border-orange-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              <CardContent className="p-4 flex items-center space-x-4">
                <div className="h-12 w-12 rounded-xl bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 group-hover:scale-110 transition-all duration-300">
                  <FileText className="h-6 w-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Подписать договор</h4>
                  <p className="text-sm text-gray-500">Остался 1 документ</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all duration-300" />
              </CardContent>
            </Card>
          </Link>

          <Link to="/invoices" className="block">
            <Card className="group cursor-pointer hover:border-orange-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              <CardContent className="p-4 flex items-center space-x-4">
                <div className="h-12 w-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-orange-50 group-hover:scale-110 transition-all duration-300">
                  <CreditCard className="h-6 w-6 text-gray-600 group-hover:text-orange-600 transition-colors" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Оплатить взнос</h4>
                  <p className="text-sm text-gray-500">{formatCurrency(92000)}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all duration-300" />
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 px-1">Последние события</h3>
          
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                <div className="p-4 flex items-start space-x-3">
                  <div className="mt-0.5"><CheckCircle2 className="h-5 w-5 text-emerald-500" /></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Документы загружены</p>
                    <p className="text-xs text-gray-500 mt-0.5">Сегодня, 10:42</p>
                  </div>
                </div>
                <div className="p-4 flex items-start space-x-3">
                  <div className="mt-0.5"><Clock className="h-5 w-5 text-amber-500" /></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Проверка данных запущена</p>
                    <p className="text-xs text-gray-500 mt-0.5">Вчера, 16:30</p>
                  </div>
                </div>
                <div className="p-4 flex items-start space-x-3">
                  <div className="mt-0.5"><Receipt className="h-5 w-5 text-gray-400" /></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Счет выставлен</p>
                    <p className="text-xs text-gray-500 mt-0.5">17 марта, 12:00</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
