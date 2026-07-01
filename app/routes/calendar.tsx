import { Menu } from "~/components/menu"
import { useEffect, useState, useRef } from "react";
import { Calendar } from "~/components/ui/calendar"
import { format } from "date-fns";
import { Button } from "~/components/ui/button";

import { cs } from "date-fns/locale";

const appts: Record<string, number[]> = {
  "2026-07-01": [1, 1, 1, 1, 1, 1],
  "2026-07-02": [1, 1, 1, 1, 1, 1],
  "2026-07-03": [1, 1, 0, 0, 1, 1],
  "2026-07-04": [1, 0, 0, 0, 1, 1],
  "2026-07-05": [1, 0, 1, 0, 1, 0],
  "2026-07-06": [1, 1, 1, 1, 1, 1],
  "2026-07-07": [1, 1, 1, 1, 2, 2],
  "2026-07-08": [1, 1, 0, 0, 1, 1],
  "2026-07-09": [1, 0, 0, 0, 1, 1],
  "2026-07-10": [1, 0, 1, 0, 1, 0],
  "2026-07-11": [1, 1, 1, 1, 1, 1],
  "2026-07-12": [1, 1, 1, 1, 1, 1],
  "2026-07-13": [1, 1, 0, 0, 1, 1],
  "2026-07-14": [1, 0, 0, 0, 1, 1],
  "2026-07-15": [1, 0, 1, 0, 1, 0],
  "2026-07-16": [2, 2, 1, 1, 1, 1],
  "2026-07-17": [1, 1, 1, 1, 2, 2],
  "2026-07-18": [1, 1, 0, 2, 2, 2],
  "2026-07-19": [1, 0, 0, 0, 1, 1],
  "2026-07-20": [1, 0, 1, 0, 1, 0],
  "2026-07-21": [1, 1, 1, 1, 1, 1],
  "2026-07-22": [1, 1, 1, 1, 1, 1],
  "2026-07-23": [1, 1, 0, 0, 1, 1],
  "2026-07-24": [1, 0, 0, 0, 1, 1],
  "2026-07-25": [1, 0, 1, 0, 1, 0],
  "2026-07-26": [2, 2, 1, 1, 1, 1],
  "2026-07-27": [1, 1, 1, 1, 2, 2],
  "2026-07-28": [1, 1, 0, 2, 2, 2],
  "2026-07-29": [1, 0, 0, 0, 1, 1],
  "2026-07-30": [1, 0, 1, 0, 1, 0],
}

const POSSIBLE_TIMES = ["10:00 - 10:30", "10:30 - 11:00", "11:00 - 11:30", "11:30 - 12:00", "12:00 - 12:30", "12:30 - 13:00"];

export default function CalendarPage() {
  const [user, setUser] = useState("Můj Profil");
  
  const [date, setDate] = useState<Date | undefined>(undefined);

  const timeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const savedEmail = localStorage.getItem("userEmail");
        if (savedEmail) {
            setUser(savedEmail);
        }
    }, []);

  useEffect(() => {
    if (date && timeRef.current) {
        setTimeout(() => {
        timeRef.current?.scrollIntoView({ 
            behavior: "smooth",
            block: "nearest"
        });
        }, 50);
    }
  }, [date]);

  const times = appts[date ? format(date, "yyyy-MM-dd") : ""] || [0, 0, 0, 0, 0, 0];
  
  return (
    <>
    <Menu user={user} />
    <div className="flex flex-col w-full items-center justify-center text-lg mt-[4vh] mb-[4vh] gap-10">
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {user} - Rezervace termínu
        </h2>
        <Calendar
            mode="single"
            onSelect={setDate}
            showWeekNumber
            className="rounded-lg border"
            locale={cs}
            weekStartsOn={1}
            dataAppts={appts}
            maxAppts={6}
            title="Vyberte den"
        />
        {date && (
          <div 
            ref={timeRef}
            className="space-y-2 scroll-mt-24 pb-12 animate-in fade-in duration-200">
            <p className="text-lg font-semibold text-muted-foreground text-center">
              Vyberte dostupný čas pro: {format(date, "d. M. yyyy")}
            </p>

            <div className="flex flex-row justify-evenly items-center gap-1 w-full bg-card border p-2 rounded-xl shadow-sm">
              {POSSIBLE_TIMES.map((time, index) => {
                return (
                  <Button
                    key={index}
                    variant={times[index] === 0 ? "default" : "outline"}
                    className="h-20 font-medium flex-1 font-extrabold"
                    disabled={!(times[index] === 0)}
                    onClick={() => alert(`Vybrali jste čas ${time} dne ${format(date, "d. M.")}`)}
                  >
                    <div className="h-16 flex flex-col justify-around">
                        <span className="font-bold">{time}</span>
                        {
                            {
                                0: <span className="text-green-600">VOLNO</span>,
                                1: <span className="text-red-500">OBSAZENO</span>,
                            }[times[index]] || <span className="text-red-500">ZRUŠENO</span>
                        }
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>
        )}
    </div>
    </>
  );
}
