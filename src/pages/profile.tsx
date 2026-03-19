import { PageTransition } from "@/components/ui/page-transition";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, ShieldCheck, CreditCard, LogOut, ChevronRight, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const navigate = useNavigate();
  const user = {
    name: "Александр Смирнов",
    phone: "+7 (999) 123-45-67",
    email: "a.smirnov@example.com",
    address: "г. Москва, ул. Тверская, д. 15, кв. 42",
    status: "verified",
    memberSince: "Март 2025",
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <PageTransition className="space-y-6 pb-20">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Профиль</h1>
          <p className="text-gray-500">Управление личными данными и настройками.</p>
        </div>
        <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-gray-200">
          <Settings className="h-4 w-4 text-gray-600" />
        </Button>
      </div>

      {/* Main Profile Card */}
      <Card className="bg-white border-gray-100 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-orange-100 to-amber-50 opacity-50" />
        <CardContent className="p-6 relative pt-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                <img
                  src="https://picsum.photos/seed/alex/200/200"
                  alt={user.name}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {user.status === "verified" && (
                <div className="absolute bottom-0 right-0 bg-emerald-500 text-white rounded-full p-1 border-2 border-white shadow-sm">
                  <ShieldCheck className="h-4 w-4" />
                </div>
              )}
            </div>
            
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h2>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
                <Badge variant="success" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                  Аккаунт подтвержден
                </Badge>
                <Badge variant="outline" className="text-gray-500 border-gray-200">
                  С нами с {user.memberSince}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Info */}
      <Card className="bg-white border-gray-100 shadow-sm">
        <CardHeader className="pb-3 border-b border-gray-50">
          <CardTitle className="text-lg font-semibold text-gray-900">Личные данные</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-50">
            <ProfileRow icon={Phone} label="Телефон" value={user.phone} />
            <ProfileRow icon={Mail} label="Email" value={user.email} />
            <ProfileRow icon={MapPin} label="Адрес регистрации" value={user.address} />
          </div>
        </CardContent>
      </Card>

      {/* Settings & Preferences */}
      <Card className="bg-white border-gray-100 shadow-sm">
        <CardHeader className="pb-3 border-b border-gray-50">
          <CardTitle className="text-lg font-semibold text-gray-900">Настройки</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-50">
            <ActionRow icon={CreditCard} label="Способы оплаты" description="Привязанные карты и счета" />
            <ActionRow icon={ShieldCheck} label="Безопасность" description="Пароль, PIN-код, Face ID" />
            <ActionRow icon={User} label="Водители" description="Управление доступом к автомобилю" />
          </div>
        </CardContent>
      </Card>

      {/* Logout */}
      <div className="pt-4">
        <Button onClick={handleLogout} variant="ghost" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 justify-start h-14 px-6 rounded-xl">
          <LogOut className="mr-3 h-5 w-5" />
          Выйти из аккаунта
        </Button>
      </div>
    </PageTransition>
  );
}

function ProfileRow({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex items-start gap-4 p-4 sm:p-6 hover:bg-gray-50/50 transition-all duration-300 group">
      <div className="mt-0.5 bg-gray-100 p-2 rounded-lg text-gray-500 shrink-0 group-hover:bg-white group-hover:shadow-sm group-hover:text-orange-600 transition-all duration-300">
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
        <p className="text-base text-gray-900 truncate group-hover:text-orange-600 transition-colors">{value}</p>
      </div>
      <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        Изменить
      </Button>
    </div>
  );
}

function ActionRow({ icon: Icon, label, description }: { icon: any, label: string, description: string }) {
  return (
    <button className="w-full flex items-center gap-4 p-4 sm:p-6 hover:bg-gray-50/80 transition-all duration-300 text-left group">
      <div className="bg-gray-100 p-2.5 rounded-xl text-gray-600 shrink-0 group-hover:bg-white group-hover:shadow-md group-hover:text-orange-600 group-hover:scale-110 transition-all duration-300">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-base font-semibold text-gray-900 mb-0.5 group-hover:text-orange-600 transition-colors">{label}</p>
        <p className="text-sm text-gray-500 truncate">{description}</p>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all duration-300 shrink-0" />
    </button>
  );
}
