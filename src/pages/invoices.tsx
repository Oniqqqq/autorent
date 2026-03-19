import { PageTransition } from "@/components/ui/page-transition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Receipt, AlertCircle, CheckCircle2, ChevronRight, Download, CreditCard, Lock, History } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Invoices() {
  const [filter, setFilter] = useState("all");

  const invoices = [
    {
      id: "INV-2026-001",
      title: "Первоначальный взнос",
      amount: 92000,
      dueDate: "2026-03-25",
      status: "pending",
      items: [
        { name: "Обеспечительный платеж", amount: 68000 },
        { name: "Комиссия за выдачу", amount: 24000 },
      ]
    },
    {
      id: "INV-2026-002",
      title: "Ежемесячный платеж (Апрель)",
      amount: 68000,
      dueDate: "2026-04-25",
      status: "upcoming",
      items: [
        { name: "Арендная плата", amount: 68000 },
      ]
    },
    {
      id: "INV-2026-000",
      title: "Бронирование автомобиля",
      amount: 5000,
      dueDate: "2026-03-15",
      status: "paid",
      paidDate: "2026-03-14",
      items: [
        { name: "Услуга бронирования", amount: 5000 },
      ]
    }
  ];

  const filteredInvoices = invoices.filter(inv => {
    if (filter === "all") return true;
    if (filter === "pending") return inv.status === "pending";
    if (filter === "paid") return inv.status === "paid";
    if (filter === "overdue") return inv.status === "overdue";
    return true;
  });

  const statusConfig = {
    pending: { label: "Ожидает оплаты", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", icon: AlertCircle },
    paid: { label: "Оплачен", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", icon: CheckCircle2 },
    upcoming: { label: "Предстоящий", color: "text-gray-500", bg: "bg-gray-50", border: "border-gray-200", icon: Clock },
    overdue: { label: "Просрочен", color: "text-red-600", bg: "bg-red-50", border: "border-red-200", icon: AlertCircle },
  };

  return (
    <PageTransition className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Счета</h1>
          <p className="text-gray-500">Начисления и оплаты по вашей подписке.</p>
        </div>
        <Button asChild variant="outline" size="sm" className="hidden sm:flex text-gray-600 border-gray-200">
          <Link to="/payments">
            <History className="mr-2 h-4 w-4" />
            История платежей
          </Link>
        </Button>
      </div>

      {/* Summary Block */}
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-0 shadow-xl shadow-gray-900/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <CardContent className="p-6 sm:p-8 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between gap-6">
            <div className="space-y-2">
              <p className="text-gray-400 font-medium">К оплате сейчас</p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">{formatCurrency(92000)}</h2>
              </div>
              <div className="flex items-center gap-2 mt-2 text-amber-400 text-sm font-medium">
                <AlertCircle className="h-4 w-4" />
                <span>1 счет ожидает оплаты</span>
              </div>
            </div>
            <div className="flex flex-col justify-end">
              <Button size="lg" className="w-full sm:w-auto bg-white text-gray-900 hover:bg-gray-100 shadow-lg shadow-white/10">
                Оплатить всё
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 gap-2 hide-scrollbar">
        {[
          { id: "all", label: "Все" },
          { id: "pending", label: "Ожидают оплаты" },
          { id: "paid", label: "Оплачены" },
          { id: "overdue", label: "Просрочены" },
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
              filter === f.id 
                ? "bg-gray-900 text-white shadow-md" 
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Invoice List */}
      <div className="space-y-4">
        {filteredInvoices.map(invoice => {
          const config = statusConfig[invoice.status as keyof typeof statusConfig];
          const StatusIcon = config.icon;
          const isPending = invoice.status === "pending" || invoice.status === "overdue";

          return (
            <Card key={invoice.id} className={cn(
              "overflow-hidden transition-all duration-300 hover:shadow-lg group cursor-pointer hover:-translate-y-0.5",
              isPending ? "border-amber-200 shadow-md shadow-amber-100/50" : "border-gray-100"
            )}>
              <CardContent className="p-0">
                <div className="p-5 sm:p-6 flex flex-col sm:flex-row gap-4 justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{invoice.title}</h3>
                        <p className="text-sm text-gray-500 font-mono mt-0.5">№ {invoice.id}</p>
                      </div>
                      <Badge variant="outline" className={cn("border", config.bg, config.color, config.border)}>
                        <StatusIcon className="w-3.5 h-3.5 mr-1" />
                        {config.label}
                      </Badge>
                    </div>
                    
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900">{formatCurrency(invoice.amount)}</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                      <span className={cn(
                        "font-medium flex items-center gap-1.5",
                        isPending ? "text-amber-700" : "text-gray-500"
                      )}>
                        <Clock className="w-4 h-4" />
                        {invoice.status === "paid" ? `Оплачен ${formatDate(invoice.paidDate!)}` : `Оплатить до ${formatDate(invoice.dueDate)}`}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between sm:items-end gap-4 border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-100">
                    <Button variant="ghost" size="icon" className="hidden sm:flex text-gray-400 group-hover:text-gray-900 group-hover:bg-gray-100">
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                    
                    {isPending ? (
                      <Button className="w-full sm:w-auto shadow-sm">
                        <CreditCard className="mr-2 h-4 w-4" /> Оплатить
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full sm:w-auto text-gray-600">
                        <Download className="mr-2 h-4 w-4" /> Квитанция
                      </Button>
                    )}
                  </div>
                </div>
                
                {/* Expandable Details (Simulated) */}
                {isPending && (
                  <div className="bg-gray-50/50 border-t border-gray-100 p-5 sm:p-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Детали счета</h4>
                    <div className="space-y-2 mb-4">
                      {invoice.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-gray-600">{item.name}</span>
                          <span className="text-gray-900 font-medium">{formatCurrency(item.amount)}</span>
                        </div>
                      ))}
                      <div className="pt-2 mt-2 border-t border-gray-200 flex justify-between font-semibold">
                        <span className="text-gray-900">Итого к оплате</span>
                        <span className="text-gray-900">{formatCurrency(invoice.amount)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 bg-white p-3 rounded-lg border border-gray-200">
                      <Lock className="h-4 w-4 text-emerald-500 shrink-0" />
                      <p>Оплата проходит через защищенный платежный шлюз. Ваши данные зашифрованы.</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </PageTransition>
  );
}

// Mock Clock icon since it wasn't imported from lucide-react in the previous block
function Clock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
