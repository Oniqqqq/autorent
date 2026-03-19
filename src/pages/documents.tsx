import { PageTransition } from "@/components/ui/page-transition";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, UploadCloud, AlertCircle, CheckCircle2, Clock, Image as ImageIcon, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export function Documents() {
  const documents = [
    {
      id: 1,
      title: "Паспорт РФ (разворот с фото)",
      description: "Главный разворот паспорта с фотографией и данными",
      status: "approved",
      date: "19 марта 2026",
      preview: "https://picsum.photos/seed/passport/200/150",
    },
    {
      id: 2,
      title: "Паспорт РФ (прописка)",
      description: "Страница с действующей регистрацией",
      status: "approved",
      date: "19 марта 2026",
      preview: "https://picsum.photos/seed/propiska/200/150",
    },
    {
      id: 3,
      title: "Водительское удостоверение (лицевая сторона)",
      description: "Лицевая сторона ВУ с фотографией",
      status: "rejected",
      reason: "Блики на фотографии, часть текста не читается. Пожалуйста, переснимите при ровном освещении без вспышки.",
      date: "19 марта 2026",
      preview: "https://picsum.photos/seed/vu-front/200/150",
    },
    {
      id: 4,
      title: "Водительское удостоверение (обратная сторона)",
      description: "Обратная сторона ВУ с категориями",
      status: "pending",
      date: "19 марта 2026",
      preview: "https://picsum.photos/seed/vu-back/200/150",
    },
    {
      id: 5,
      title: "Селфи с паспортом",
      description: "Фотография лица вместе с открытым паспортом",
      status: "missing",
    },
  ];

  const statusConfig = {
    approved: { icon: CheckCircle2, color: "text-emerald-500", badge: "success", label: "Принят" },
    rejected: { icon: AlertCircle, color: "text-red-500", badge: "error", label: "Отклонен" },
    pending: { icon: Clock, color: "text-amber-500", badge: "warning", label: "На проверке" },
    missing: { icon: UploadCloud, color: "text-gray-400", badge: "default", label: "Не загружен" },
  };

  return (
    <PageTransition className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Документы</h1>
        <p className="text-gray-500">Загрузите и проверьте документы для завершения оформления.</p>
      </div>

      <Card className="bg-gradient-to-br from-orange-50 to-white border-orange-100 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-semibold text-gray-900 text-lg">Статус загрузки</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> 4 из 6 обработаны</span>
                <span className="text-gray-300">•</span>
                <span className="flex items-center gap-1 text-red-600 font-medium"><AlertCircle className="h-4 w-4" /> 1 требует замены</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
              <FileText className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-orange-100/50 flex gap-3">
            <AlertCircle className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">
              Следите, чтобы все данные были хорошо видны, а фото было сделано при ровном освещении без бликов.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {documents.map((doc) => {
          const config = statusConfig[doc.status as keyof typeof statusConfig];
          const StatusIcon = config.icon;

          return (
            <Card key={doc.id} className={cn(
              "overflow-hidden transition-all hover:shadow-md",
              doc.status === "rejected" ? "border-red-200 bg-red-50/30" : "border-gray-100"
            )}>
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  {/* Preview Area */}
                  <div className="sm:w-48 h-32 sm:h-auto bg-gray-50 border-b sm:border-b-0 sm:border-r border-gray-100 relative flex items-center justify-center shrink-0 overflow-hidden group-hover:bg-gray-100 transition-colors">
                    {doc.preview ? (
                      <>
                        <img src={doc.preview} alt={doc.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                        <Badge variant={config.badge as any} className="absolute bottom-2 left-2 shadow-sm backdrop-blur-md bg-white/90">
                          {config.label}
                        </Badge>
                      </>
                    ) : (
                      <div className="flex flex-col items-center text-gray-400 gap-2">
                        <ImageIcon className="h-8 w-8 opacity-50" />
                        <span className="text-xs font-medium uppercase tracking-wider">Нет фото</span>
                      </div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-1">
                        <h4 className="font-semibold text-gray-900 text-lg leading-tight">{doc.title}</h4>
                        {doc.status !== "missing" && (
                          <StatusIcon className={cn("h-5 w-5 shrink-0", config.color)} />
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{doc.description}</p>
                      
                      {doc.status === "rejected" && (
                        <div className="mt-3 p-3 bg-red-50 text-red-800 text-sm rounded-lg border border-red-100 flex gap-2">
                          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                          <p>{doc.reason}</p>
                        </div>
                      )}
                      
                      {doc.date && doc.status !== "rejected" && (
                        <p className="text-xs text-gray-400 mt-2">Обновлено: {doc.date}</p>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto pt-2">
                      {doc.status === "missing" ? (
                        <Button size="sm" className="w-full sm:w-auto">
                          <UploadCloud className="mr-2 h-4 w-4" /> Загрузить
                        </Button>
                      ) : doc.status === "rejected" ? (
                        <Button size="sm" variant="default" className="w-full sm:w-auto bg-red-600 hover:bg-red-700">
                          <RefreshCw className="mr-2 h-4 w-4" /> Заменить файл
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" className="w-full sm:w-auto">
                          Открыть
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </PageTransition>
  );
}
