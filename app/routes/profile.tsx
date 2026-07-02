import { Mail, Calendar, Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Menu } from "~/components/menu"
import { useEffect } from "react";

const user = {
  name: "Jméno Příjmení",
  email: "jmeno@domena.cz",
  tel: "+420123456789",
  joined: "12. 04. 2024",
};

export default function UserInfoPage() {

  useEffect(() => {
      const savedEmail = localStorage.getItem("userEmail");
      if (savedEmail) {
          user.name = savedEmail;
      }
  }, []);

  return (
    <>
      <Menu user={user.name}/>

      <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-6">
        <Card className="w-full">
          <CardHeader className="space-y-4 flex flex-col sm:flex-row sm:items-center sm:gap-6 sm:space-y-0">

            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold shrink-0 mx-auto sm:mx-0">
              IMG
            </div>
            
            {/* Jméno a Bio */}
            <div className="sm:text-left space-y-1">
              <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
              <CardDescription className="text-sm">Registrovaný uživatel</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">

            <hr className="border-border" />

            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Detaily účtu</h3>
              
              <div className="flex items-center gap-3 text-sm">
                <Mail size={20} className="text-muted-foreground" />
                <span className="font-medium">E-mail:</span>
                <span className="text-muted-foreground break-all">{user.email}</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Phone size={20} className="text-muted-foreground" />
                <span className="font-medium">Telefoní číslo:</span>
                <span className="text-muted-foreground">{user.tel}</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Calendar size={20} className="text-muted-foreground" />
                <span className="font-medium">Členem od:</span>
                <span className="text-muted-foreground">{user.joined}</span>
              </div>
            </div>

            <hr className="border-border" />

            <div className="flex justify-end">
              <Button className="w-full sm:w-auto">
                Upravit profil
              </Button>
            </div>

          </CardContent>
        </Card>
      </div>
    </>
  );
}