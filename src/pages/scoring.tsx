import { PageTransition } from "@/components/ui/page-transition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, AlertCircle, ChevronRight, ShieldCheck, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export function Scoring() {
  const steps = [
    {
      id: 1,
      title: "Кредитная история",
      description: "Проверка кредитного рейтинга и отсутствия задолженностей",
      status: "success",
      date: "19 марта 2026, 10:45",
    },
    {
      id: 2,
      title: "Проверка личности",
      description: "Сверка данных паспорта и селфи",
      status: "pending",
      date: "В процессе",
    },
    {
      id: 3,
      title: "Дополнительная проверка",
      description: "Анализ водительского стажа и истории штрафов",
      status: "waiting",
      date: "Ожидает завершения предыдущего этапа",
    },
    {
      id: 4,
      title: "Финальное решение",
      description: "Одобрение заявки и формирование договора",
      status: "waiting",
      date: "Ожидает завершения всех этапов",
    },
  ];

  return (
    <PageTransition className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Проверка данных</h1>
        <p className="text-gray-500">Мы проверяем ваши документы и данные перед активацией подписки.</p>
      </div>

      <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
        <CardContent className="p-6 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900 text-lg">Общий статус:</h3>
                <Badge variant="warning" className="bg-amber-100 text-amber-800 border-amber-200">В процессе</Badge>
              </div>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                Обычно проверка занимает от нескольких минут до одного рабочего дня
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0 shadow-inner">
              <Activity className="h-6 w-6 text-amber-600" />
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-amber-100/50 flex gap-3 items-start">
            <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-900">
                Нужно повторно загрузить документ для продолжения проверки
              </p>
              <p className="text-xs text-gray-600">
                Фотография водительского удостоверения не прошла автоматическую проверку из-за бликов.
              </p>
              <Button asChild size="sm" variant="outline" className="mt-2 text-amber-700 border-amber-200 hover:bg-amber-50">
                <Link to="/documents">
                  Перейти к документам <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Этапы проверки</h3>
        
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
          {steps.map((step, index) => {
            const isSuccess = step.status === "success";
            const isPending = step.status === "pending";
            const isWaiting = step.status === "waiting";
            
            return (
              <div key={step.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active hover:-translate-y-0.5 transition-transform duration-300">
                {/* Icon */}
                <div className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md",
                  isSuccess ? "bg-emerald-500 text-white" : 
                  isPending ? "bg-amber-500 text-white animate-pulse" : 
                  "bg-gray-100 text-gray-400"
                )}>
                  {isSuccess ? <CheckCircle2 className="w-5 h-5" /> : 
                   isPending ? <Clock className="w-5 h-5" /> : 
                   <ShieldCheck className="w-5 h-5" />}
                </div>
                
                {/* Content */}
                <div className={cn(
                  "w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl border transition-all",
                  isSuccess ? "bg-emerald-50/30 border-emerald-100" : 
                  isPending ? "bg-amber-50/30 border-amber-200 shadow-md shadow-amber-100/50" : 
                  "bg-gray-50 border-gray-100 opacity-60"
                )}>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className={cn("font-semibold text-base", isWaiting ? "text-gray-500" : "text-gray-900")}>
                        {step.title}
                      </h4>
                      {isSuccess && <Badge variant="success" className="bg-emerald-100 text-emerald-700 border-emerald-200">Успешно</Badge>}
                      {isPending && <Badge variant="warning" className="bg-amber-100 text-amber-800 border-amber-200">В процессе</Badge>}
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                    <p className={cn("text-xs mt-2 font-medium", 
                      isSuccess ? "text-emerald-600" : 
                      isPending ? "text-amber-600" : 
                      "text-gray-400"
                    )}>
                      {step.date}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
