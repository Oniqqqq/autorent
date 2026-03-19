import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTransition } from "@/components/ui/page-transition";
import { Car, ShieldCheck, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("+7 (");
  const [code, setCode] = useState(["", "", "", ""]);
  const [countdown, setCountdown] = useState(24);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "code" && countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [step, countdown]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.startsWith("7")) val = val.substring(1);
    
    let formatted = "+7 (";
    if (val.length > 0) formatted += val.substring(0, 3);
    if (val.length >= 3) formatted += ") " + val.substring(3, 6);
    if (val.length >= 6) formatted += "-" + val.substring(6, 8);
    if (val.length >= 8) formatted += "-" + val.substring(8, 10);
    
    setPhone(formatted);
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    if (value && index < 3) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleGetCode = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("code");
    }, 1000);
  };

  const handleVerify = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("isLoggedIn", "true");
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-100/50 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-amber-50/50 blur-[80px] pointer-events-none" />

      <PageTransition className="w-full max-w-md z-10">
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 mb-6">
            <Car className="h-8 w-8 text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 mb-3">Личный кабинет</h1>
          <p className="text-gray-500 text-base max-w-[280px]">
            Управление подпиской, договоры и платежи в одном месте
          </p>
        </div>

        <Card className="border-0 shadow-xl shadow-gray-200/50 bg-white/80 backdrop-blur-xl overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-orange-400 to-amber-400" />
          
          {step === "phone" ? (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Вход по номеру</CardTitle>
                <CardDescription>
                  Введите телефон для доступа к вашей подписке
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="+7 (999) 000-00-00"
                    className="text-lg font-medium tracking-wide h-14 bg-gray-50/50 focus:bg-white transition-colors"
                  />
                  <p className="text-[13px] text-gray-500 flex items-center gap-1.5 px-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                    Используем номер для входа и уведомлений
                  </p>
                </div>
                <Button 
                  className="w-full h-14 text-base rounded-xl" 
                  onClick={handleGetCode}
                  disabled={phone.length < 18 || isLoading}
                >
                  {isLoading ? "Отправка..." : "Получить код"}
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </CardContent>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Введите код</CardTitle>
                <CardDescription>
                  Код отправлен на номер <span className="font-medium text-gray-900">{phone}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between gap-3">
                  {code.map((digit, i) => (
                    <Input
                      key={i}
                      id={`code-${i}`}
                      type="text"
                      inputMode="numeric"
                      value={digit}
                      onChange={(e) => handleCodeChange(i, e.target.value)}
                      className="w-14 h-16 text-center text-2xl font-semibold bg-gray-50/50 focus:bg-white rounded-2xl"
                      maxLength={1}
                    />
                  ))}
                </div>
                
                <div className="flex flex-col space-y-4">
                  <Button 
                    className="w-full h-14 text-base rounded-xl" 
                    onClick={handleVerify}
                    disabled={code.some(d => !d) || isLoading}
                  >
                    {isLoading ? "Проверка..." : "Продолжить"}
                  </Button>
                  
                  <div className="flex flex-col items-center space-y-3 text-sm">
                    <button 
                      onClick={() => setStep("phone")}
                      className="text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      Изменить номер
                    </button>
                    {countdown > 0 ? (
                      <span className="text-gray-400">
                        Отправить повторно через 00:{countdown.toString().padStart(2, '0')}
                      </span>
                    ) : (
                      <button 
                        onClick={() => setCountdown(24)}
                        className="text-orange-600 font-medium hover:text-orange-700 transition-colors"
                      >
                        Отправить код повторно
                      </button>
                    )}
                  </div>
                </div>
              </CardContent>
            </motion.div>
          )}
        </Card>
        
        <p className="text-center text-xs text-gray-400 mt-8">
          Ваши данные защищены и используются только для работы сервиса.
        </p>
      </PageTransition>
    </div>
  );
}
