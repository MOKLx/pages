import { useState, useEffect } from "react";
import { Form, useActionData, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field"

/*
export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "");
  const code = String(formData.get("code") ?? "");
  const intent = formData.get("intent");

  if (intent === "send-code") {
    return { step: "code", email };
  }

  if (intent === "login") {
    return { success: true, email };
  }
  return null;
}



export default function Login() {
  const actionData = useActionData() as { step?: string; success?: boolean; email?: string; error?: string } | null;
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "code" | "forward">("email");
  

  useEffect(() => {
    if (actionData?.step === "code") {
      setStep("code");
    }
    
    if (actionData?.success && actionData?.email) {
      localStorage.setItem("userEmail", actionData.email);
      navigate("/calendar");
    }
  }, [actionData, navigate]);*/

export default function LoginPage() {
  const navigate = useNavigate();
  
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const intent = submitter?.value;

    if (intent === "send-code") {
      setStep("code");
      return;
    }

    if (intent === "login") {
      localStorage.setItem("userEmail", email);
      navigate("/calendar");
      return;
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold tracking-tight">
                Přihlášení kódem
              </CardTitle>
              <CardDescription>
                {step === "email" 
                ? "Zadejte e-mail pro zaslání jednorázového kódu." 
                : "Kód jsme vám úspěšně odeslali."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form /*method="post"*/ onSubmit={handleSubmit}>
                <FieldGroup>
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="email">E-mailová adresa</FieldLabel>
                      {step === "code" && (
                        
                        <button
                          type="button"
                          onClick={() => setStep("email")}
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Zpět na změnu e-mailu
                        </button>
                      )}
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="text"
                      placeholder="jmeno@domena.cz"
                      required
                      onChange={(e) => setEmail(e.target.value)} //
                      value={email} //
                      //defaultValue={actionData?.email ?? ""}
                      readOnly={step === "code"} 
                      className={step === "code" ? "bg-muted text-muted-foreground cursor-not-allowed" : ""}
                    />
                  </Field>

                  {step === "code" && (
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="code">Kód</FieldLabel>
                    </div>
                    <Input 
                      id="code"
                      name="code"
                      type="text"
                      placeholder="123456"
                      onChange={(e) => setCode(e.target.value)} //
                      required
                      maxLength={6}
                      autoFocus />
                  </Field>
                  )}
                  
                  <Field>
                    <Button type="submit" 
                      name="intent" 
                      value={step === "email" ? "send-code" : "login"} 
                      className="w-full"
                    >
                      {step === "email" ? "Zaslat kód" : "Přihlásit se"}
                    </Button>

                    <FieldDescription className="text-center">
                      Nemáte účet? <a href="#">Registrovat</a>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}