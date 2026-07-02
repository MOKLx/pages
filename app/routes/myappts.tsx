import { Menu } from "~/components/menu"
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Button } from "~/components/ui/button"
import { Cross } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog"


const POSSIBLE_TIMES = ["10:00 - 10:30", "10:30 - 11:00", "11:00 - 11:30", "11:30 - 12:00", "12:00 - 12:30", "12:30 - 13:00"];


const myAppts: Record<string, string> = {
  "2026-07-01": POSSIBLE_TIMES[2],
  "2026-07-02": POSSIBLE_TIMES[2],
  "2026-07-03": POSSIBLE_TIMES[3],
  "2026-07-04": POSSIBLE_TIMES[4],
  "2026-07-05": POSSIBLE_TIMES[5],
  "2026-07-06": POSSIBLE_TIMES[1],
}

export default function MyApptsPage() {
  const [user, setUser] = useState("Můj Profil");
  
  const [selectedDate, setSelectedDate] = useState("")
  
  const [dialogOpen, setDialogOpen] = useState(false);;

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
        setUser(savedEmail);
    }
  }, []);

  return (
    <> 
      <Menu user={user}/>
      <div className="flex flex-col w-full items-center justify-center text-lg mt-[4vh] mb-[4vh] gap-10 overflow-x-hidden">
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {user} - Mé termíny
        </h2>

        <div className="space-y-2 scroll-mt-24 pb-12 animate-in fade-in duration-200 flex flex-col justify-evenly items-center">
          <div className="flex flex-col md:flex-row justify-evenly items-center gap-1 w-fit bg-card border p-2 rounded-xl shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Den</TableHead>
                  <TableHead className="text-center">Čas</TableHead>
                  <TableHead className="text-right">Zrušit?</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(myAppts).map(([date, time], index) => (
                  <TableRow key={date}>
                    <TableCell>
                      {date ? format(date, "d. M.") : ""}
                    </TableCell>
                    <TableCell className="text-center">
                      {time}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        key={index}
                        className="h-10 w-10 p-[10%]"
                        disabled={new Date() > new Date(date)}
                        onClick={() => {
                          setSelectedDate(date)
                          setDialogOpen(true);
                        }}
                      >
                        <Cross strokeWidth={3} className="!h-[100%] !w-[100%] text-red-500 hover:text-red-600 transition-colors rotate-45" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogTitle>Zarezervovat termín?</AlertDialogTitle>
              <AlertDialogDescription>
                Chce se zrušit termín {myAppts[selectedDate] || ""} <br/>
                dne {selectedDate ? format(selectedDate, "d. M.") : ""}?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Ne</AlertDialogCancel>
              <AlertDialogAction>Ano</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    </>
  );
}