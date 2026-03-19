import { PageTransition } from "@/components/ui/page-transition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, ArrowUpRight, ArrowDownLeft, CheckCircle2, Clock, FileText, Filter } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function Payments() {
  const payments = [
    {
      id: "PAY-2026-003",
      title: "Ежемесячный платеж",
      amount: 68000,
      date: "2026-03-12T14:30:00Z",
      status: "success",
      type: "outcome",
      method: "•• 4567",
    },
    {
      id: "PAY-2026-002",
      title: "Штраф ПДД",
      amount: 3500,
      date: "2026-03-10T09:15:00Z",
      status: "processing",
      type: "outcome",
      method: "СБП",
    },
    {
      id: "PAY-2026-001",
      title: "Возврат залога",
      amount: 15000,
      date: "2026-03-05T11:20:00Z",
      status: "success",
      type: "income",
      method: "•• 4567",
    },
    {
      id: "PAY-2026-000",
      title: "Бронирование автомобиля",
      amount: 5000,
      date: "2026-03-01T16:45:00Z",
      status: "success",
      type: "outcome",
      method: "•• 4567",
    },
  ];

  const statusConfig = {
    success: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50", label: "Успешно" },
    processing: { icon: Clock, color: "text-amber-500", bg: "bg-amber-50", label: "В обработке" },
    failed: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-50", label: "Ошибка" },
  };

  return (
    <PageTransition className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">История платежей</h1>
          <p className="text-gray-500">Все операции по подписке и дополнительным начислениям.</p>
        </div>
        <Button variant="outline" size="icon" className="shrink-0 h-10 w-10 rounded-full border-gray-200">
          <Filter className="h-4 w-4 text-gray-600" />
        </Button>
      </div>

      {/* Summary Block */}
      <Card className="bg-white border-gray-100 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-2 divide-x divide-gray-100">
            <div className="p-6 space-y-2">
              <p className="text-sm text-gray-500 font-medium">Потрачено в марте</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{formatCurrency(76500)}</p>
            </div>
            <div className="p-6 space-y-2">
              <p className="text-sm text-gray-500 font-medium">Возвраты</p>
              <p className="text-2xl sm:text-3xl font-bold text-emerald-600">{formatCurrency(15000)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment List */}
      <div className="space-y-3">
        {payments.map(payment => {
          const config = statusConfig[payment.status as keyof typeof statusConfig];
          const StatusIcon = config.icon;
          const isIncome = payment.type === "income";

          return (
            <Card key={payment.id} className="overflow-hidden transition-all duration-300 hover:shadow-md border-gray-100 group cursor-pointer hover:-translate-y-0.5">
              <CardContent className="p-4 sm:p-5 flex items-center gap-4">
                <div className={cn(
                  "h-12 w-12 rounded-full flex items-center justify-center shrink-0 transition-colors",
                  isIncome ? "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100" : "bg-gray-50 text-gray-600 group-hover:bg-gray-100"
                )}>
                  {isIncome ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-gray-900 truncate pr-4">{payment.title}</h3>
                    <span className={cn(
                      "font-semibold whitespace-nowrap",
                      isIncome ? "text-emerald-600" : "text-gray-900"
                    )}>
                      {isIncome ? "+" : "-"}{formatCurrency(payment.amount)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-gray-500 truncate">
                      <span>{formatDate(payment.date)}</span>
                      <span className="text-gray-300">•</span>
                      <span className="flex items-center gap-1">
                        <CreditCard className="h-3.5 w-3.5" />
                        {payment.method}
                      </span>
                    </div>
                    
                    <div className={cn("flex items-center gap-1.5 text-xs font-medium", config.color)}>
                      <StatusIcon className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">{config.label}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="flex justify-center pt-4">
        <Button variant="ghost" className="text-gray-500 hover:text-gray-900">
          Показать еще
        </Button>
      </div>
    </PageTransition>
  );
}

// Mock AlertCircle icon since it wasn't imported from lucide-react in the previous block
function AlertCircle(props: any) {
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
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
