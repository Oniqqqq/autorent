import { PageTransition } from "@/components/ui/page-transition";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, HelpCircle, FileText, Bell, ShieldAlert, PhoneCall, MessageSquare, Settings } from "lucide-react";

export function More() {
  const menuItems = [
    {
      group: "Поддержка",
      items: [
        { icon: MessageSquare, label: "Чат с поддержкой", description: "Отвечаем в течение 5 минут" },
        { icon: PhoneCall, label: "Позвонить нам", description: "8 800 555-35-35" },
        { icon: HelpCircle, label: "Частые вопросы", description: "База знаний и инструкции" },
      ]
    },
    {
      group: "Сервис",
      items: [
        { icon: FileText, label: "Договоры и акты", description: "Ваши документы по подписке" },
        { icon: ShieldAlert, label: "Страховые случаи", description: "Что делать при ДТП" },
        { icon: Bell, label: "Уведомления", description: "Настройка пушей и SMS" },
      ]
    },
    {
      group: "О приложении",
      items: [
        { icon: Settings, label: "Настройки приложения", description: "Тема, язык, кэш" },
        { icon: FileText, label: "Правовая информация", description: "Пользовательское соглашение" },
      ]
    }
  ];

  return (
    <PageTransition className="space-y-6 pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Еще</h1>
        <p className="text-gray-500">Дополнительные возможности и настройки.</p>
      </div>

      <div className="space-y-6">
        {menuItems.map((group, idx) => (
          <div key={idx}>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">
              {group.group}
            </h2>
            <Card className="bg-white border-gray-100 shadow-sm overflow-hidden">
              <CardContent className="p-0 divide-y divide-gray-50">
                {group.items.map((item, itemIdx) => (
                  <button
                    key={itemIdx}
                    className="w-full flex items-center gap-4 p-4 sm:p-5 hover:bg-gray-50/80 transition-all duration-300 text-left group"
                  >
                    <div className="bg-gray-50 p-2.5 rounded-xl text-gray-500 shrink-0 group-hover:bg-white group-hover:shadow-md group-hover:text-orange-600 group-hover:scale-110 transition-all duration-300">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-semibold text-gray-900 mb-0.5 group-hover:text-orange-600 transition-colors">{item.label}</p>
                      <p className="text-sm text-gray-500 truncate">{item.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      
      <div className="text-center pt-8 pb-4">
        <p className="text-xs text-gray-400">Версия приложения 1.2.4 (build 402)</p>
      </div>
    </PageTransition>
  );
}
