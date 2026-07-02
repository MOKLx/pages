import { Menu } from "~/components/menu"
import { useEffect, useState, useRef } from "react";
import { Calendar } from "~/components/ui/calendar"
import { format } from "date-fns";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "~/components/ui/dialog";

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
  const [selectedTime, setSelectedTime] = useState("")
  
  const [dialogOpen, setDialogOpen] = useState(false);;

  const curRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const savedEmail = localStorage.getItem("userEmail");
        if (savedEmail) {
            setUser(savedEmail);
        }
        
        setTimeout(() => {
          if (curRef.current) {
              const todayElement = curRef.current?.querySelector(".rdp-today");
              
              if (todayElement) {
                todayElement.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                  inline: "center"
                });
              }
            }
        }, 200);
    }, []);

  useEffect(() => {
    if (date && curRef.current) {
        setTimeout(() => {
          curRef.current?.scrollIntoView({ 
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

    <div
      ref={curRef}
      className="flex flex-col w-full items-center justify-center text-lg mt-[1vh] mb-[1vh] md:mt-[4vh] md:mb-[4vh] gap-2 md:gap-10 overflow-x-hidden"
      >
      <h2 className="text-l font-bold tracking-tight text-foreground md:text-xl">
          {user} - Rezervace termínu
        </h2>

        <Calendar
            mode="single"
            onSelect={setDate}
            showWeekNumber
            className="rounded-lg border w-full md:w-auto"
            locale={cs}
            weekStartsOn={1}
            dataAppts={appts}
            maxAppts={6}
            title="Vyberte den"
        />

        {date && (
          <div 
            ref={curRef}
            className="space-y-2 scroll-mt-24 pb-12 animate-in fade-in duration-200 flex flex-col justify-evenly items-center">

            <p className="text-lg font-semibold text-muted-foreground text-center">
              Vyberte {user !== "admin" && ("dostupný")} čas pro: {format(date, "d. M. yyyy")}
            </p>

            <div className="flex flex-col md:flex-row justify-evenly items-center gap-1 w-fit bg-card border p-2 rounded-xl shadow-sm">
              {POSSIBLE_TIMES.map((time, index) => {
                return (
                    <Button
                      key={index}
                      variant={times[index] === 0 || user == "admin" ? "default" : "outline"}
                      className="h-20 font-medium flex-1 font-extrabold"
                      disabled={!(times[index] === 0) && user !== "admin"}
                      onClick={() => {
                        setSelectedTime(time);                        
                        setDialogOpen(true);
                      }}
                    >
                      <div className="h-16 flex flex-col justify-around">
                          <span className="font-bold">{time}</span>
                          {
                              {
                                  0: <span className="text-green-600">VOLNO</span>,
                                  1: (user === "admin" ? <span>Jméno<br/>zákazníka</span> : <span className="text-red-500">OBSAZENO</span>),
                              } [times[index]] || <span className="text-red-500">ZRUŠENO</span>
                          }
                      </div>

                    </Button>
                );
              })}
            </div>
          </div>
        )}
    </div>

    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:w-auto">
        <DialogHeader>
          <DialogTitle>{(user === "admin" ? "Spravovat termín" : "Zarezervovat termín?")}</DialogTitle>
          <DialogDescription>
            {(user === "admin" ? "(zrušení termínu i automaticky zruší a refunduje rezervaci)" : "Chce se zarezervovat a přejít na platbu?")}
            
          </DialogDescription>
        </DialogHeader>

        <div className="py-2 text-sm text-muted-foreground">
          <p><strong>Datum:</strong> {date ? format(date, "d. M. R") : ""} ({date?.toLocaleDateString('cs-CZ', { weekday: 'long' })})</p>
          <p><strong>Termín:</strong> {selectedTime}</p>
          {user === "admin" && times[POSSIBLE_TIMES.indexOf(selectedTime)] === 1 && (<p><strong>Zákazník:</strong> Jméno Zákazníka</p>)}
        </div>

        <DialogFooter className="flex flex-row gap-2">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="flex-1">
              {(user === "admin" ? "Zavřít" : "Ne")}
            </Button>
          </DialogClose>
          {user === "admin" && times[POSSIBLE_TIMES.indexOf(selectedTime)] === 1 && (
          <Button type="submit" className="flex-1">
            Zrušit rezervaci
          </Button>)}
          <Button type="submit" className="flex-1">
            {(user === "admin" ? (times[POSSIBLE_TIMES.indexOf(selectedTime)] === 2 ? "Obnovit" : "Zrušit") + " termín" : "Ano")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
}
