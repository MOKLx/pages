import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { Form, Link, Links, Meta, Outlet, Scripts, ScrollRestoration, ServerRouter, UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, useActionData, useNavigate } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ThemeProvider } from "next-themes";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { cva } from "class-variance-authority";
import { Label, NavigationMenu, Slot } from "radix-ui";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { format } from "date-fns";
import { cs } from "date-fns/locale";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/@react-router/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = /* @__PURE__ */ __exportAll({
	default: () => handleRequest,
	streamTimeout: () => streamTimeout
});
var streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
	if (request.method.toUpperCase() === "HEAD") return new Response(null, {
		status: responseStatusCode,
		headers: responseHeaders
	});
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		let userAgent = request.headers.get("user-agent");
		let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
		let timeoutId = setTimeout(() => abort(), 6e3);
		const { pipe, abort } = renderToPipeableStream(/* @__PURE__ */ jsx(ServerRouter, {
			context: routerContext,
			url: request.url
		}), {
			[readyOption]() {
				shellRendered = true;
				const body = new PassThrough({ final(callback) {
					clearTimeout(timeoutId);
					timeoutId = void 0;
					callback();
				} });
				const stream = createReadableStreamFromReadable(body);
				responseHeaders.set("Content-Type", "text/html");
				pipe(body);
				resolve(new Response(stream, {
					headers: responseHeaders,
					status: responseStatusCode
				}));
			},
			onShellError(error) {
				reject(error);
			},
			onError(error) {
				responseStatusCode = 500;
				if (shellRendered) console.error(error);
			}
		});
	});
}
//#endregion
//#region app/root.tsx
var root_exports = /* @__PURE__ */ __exportAll({
	ErrorBoundary: () => ErrorBoundary,
	Layout: () => Layout,
	default: () => root_default
});
function Layout({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "cs",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
			/* @__PURE__ */ jsx("meta", {
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			}),
			/* @__PURE__ */ jsx(Meta, {}),
			/* @__PURE__ */ jsx(Links, {})
		] }), /* @__PURE__ */ jsxs("body", {
			className: "bg-background text-foreground antialiased",
			children: [
				/* @__PURE__ */ jsx(ThemeProvider, {
					attribute: "class",
					defaultTheme: "system",
					enableSystem: true,
					children
				}),
				/* @__PURE__ */ jsx(ScrollRestoration, {}),
				/* @__PURE__ */ jsx(Scripts, {})
			]
		})]
	});
}
var root_default = UNSAFE_withComponentProps(function App() {
	return /* @__PURE__ */ jsx(Outlet, {});
});
var ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary({ error }) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack;
	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
	}
	return /* @__PURE__ */ jsxs("main", {
		className: "container mx-auto p-4 pt-16",
		children: [
			/* @__PURE__ */ jsx("h1", { children: message }),
			/* @__PURE__ */ jsx("p", { children: details }),
			stack
		]
	});
});
//#endregion
//#region app/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region app/components/ui/button.tsx
var buttonVariants = cva("group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/80",
			outline: "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
			secondary: "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
			ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
			destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
			xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
			sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
			lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
			icon: "size-8",
			"icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
			"icon-sm": "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
			"icon-lg": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant = "default", size = "default", asChild = false, ...props }) {
	return /* @__PURE__ */ jsx(asChild ? Slot.Root : "button", {
		"data-slot": "button",
		"data-variant": variant,
		"data-size": size,
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
//#endregion
//#region app/components/ui/input.tsx
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ jsx("input", {
		type,
		"data-slot": "input",
		className: cn("h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", className),
		...props
	});
}
//#endregion
//#region app/components/ui/card.tsx
function Card({ className, size = "default", ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card",
		"data-size": size,
		className: cn("group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl", className),
		...props
	});
}
function CardHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-header",
		className: cn("group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-title",
		className: cn("font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm", className),
		...props
	});
}
function CardDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-description",
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function CardContent({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "card-content",
		className: cn("px-(--card-spacing)", className),
		...props
	});
}
//#endregion
//#region app/components/ui/label.tsx
function Label$1({ className, ...props }) {
	return /* @__PURE__ */ jsx(Label.Root, {
		"data-slot": "label",
		className: cn("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
		...props
	});
}
//#endregion
//#region app/components/ui/field.tsx
function FieldGroup({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "field-group",
		className: cn("group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4", className),
		...props
	});
}
var fieldVariants = cva("group/field flex w-full gap-2 data-[invalid=true]:text-destructive", {
	variants: { orientation: {
		vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
		horizontal: "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
		responsive: "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
	} },
	defaultVariants: { orientation: "vertical" }
});
function Field({ className, orientation = "vertical", ...props }) {
	return /* @__PURE__ */ jsx("div", {
		role: "group",
		"data-slot": "field",
		"data-orientation": orientation,
		className: cn(fieldVariants({ orientation }), className),
		...props
	});
}
function FieldLabel({ className, ...props }) {
	return /* @__PURE__ */ jsx(Label$1, {
		"data-slot": "field-label",
		className: cn("group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-data-checked:border-primary/30 has-data-checked:bg-primary/5 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border *:data-[slot=field]:p-2.5 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10", "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col", className),
		...props
	});
}
function FieldDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx("p", {
		"data-slot": "field-description",
		className: cn("text-left text-sm leading-normal font-normal text-muted-foreground group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5", "last:mt-0 nth-last-2:-mt-1", "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary", className),
		...props
	});
}
//#endregion
//#region app/routes/login.tsx
var login_exports = /* @__PURE__ */ __exportAll({
	action: () => action,
	default: () => login_default
});
async function action({ request }) {
	const formData = await request.formData();
	const email = String(formData.get("email") ?? "");
	const code = String(formData.get("code") ?? "");
	const intent = formData.get("intent");
	if (intent === "send-code") return {
		step: "code",
		email
	};
	if (intent === "login") {
		if (code === "123456") {}
		return {
			success: true,
			email
		};
	}
	return null;
}
var login_default = UNSAFE_withComponentProps(function Login() {
	const actionData = useActionData();
	const navigate = useNavigate();
	const [step, setStep] = useState("email");
	useEffect(() => {
		if (actionData?.step === "code") setStep("code");
		if (actionData?.success && actionData?.email) {
			localStorage.setItem("userEmail", actionData.email);
			navigate("/calendar");
		}
	}, [actionData, navigate]);
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-svh w-full items-center justify-center p-6 md:p-10",
		children: /* @__PURE__ */ jsx("div", {
			className: "w-full max-w-sm",
			children: /* @__PURE__ */ jsx("div", {
				className: "flex flex-col gap-6",
				children: /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, {
					className: "text-2xl font-bold tracking-tight",
					children: "Přihlášení kódem"
				}), /* @__PURE__ */ jsx(CardDescription, { children: step === "email" ? "Zadejte e-mail pro zaslání jednorázového kódu." : "Kód jsme vám úspěšně odeslali." })] }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(Form, {
					method: "post",
					children: /* @__PURE__ */ jsxs(FieldGroup, { children: [
						/* @__PURE__ */ jsxs(Field, { children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center",
							children: [/* @__PURE__ */ jsx(FieldLabel, {
								htmlFor: "email",
								children: "E-mailová adresa"
							}), step === "code" && /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setStep("email"),
								className: "ml-auto inline-block text-sm underline-offset-4 hover:underline",
								children: "Zpět na změnu e-mailu"
							})]
						}), /* @__PURE__ */ jsx(Input, {
							id: "email",
							name: "email",
							type: "text",
							placeholder: "jmeno@domena.cz",
							required: true,
							defaultValue: actionData?.email ?? "",
							readOnly: step === "code",
							className: step === "code" ? "bg-muted text-muted-foreground cursor-not-allowed" : ""
						})] }),
						step === "code" && /* @__PURE__ */ jsxs(Field, { children: [/* @__PURE__ */ jsx("div", {
							className: "flex items-center",
							children: /* @__PURE__ */ jsx(FieldLabel, {
								htmlFor: "code",
								children: "Kód"
							})
						}), /* @__PURE__ */ jsx(Input, {
							id: "code",
							name: "code",
							type: "text",
							placeholder: "123456",
							required: true,
							maxLength: 6,
							autoFocus: true
						})] }),
						/* @__PURE__ */ jsxs(Field, { children: [/* @__PURE__ */ jsx(Button, {
							type: "submit",
							name: "intent",
							value: step === "email" ? "send-code" : "login",
							className: "w-full",
							children: step === "email" ? "Zaslat kód" : "Přihlásit se"
						}), /* @__PURE__ */ jsxs(FieldDescription, {
							className: "text-center",
							children: ["Nemáte účet? ", /* @__PURE__ */ jsx("a", {
								href: "#",
								children: "Registrovat"
							})]
						})] })
					] })
				}) })] })
			})
		})
	});
});
//#endregion
//#region app/components/ui/navigation-menu.tsx
function NavigationMenu$1({ className, children, viewport = true, ...props }) {
	return /* @__PURE__ */ jsxs(NavigationMenu.Root, {
		"data-slot": "navigation-menu",
		"data-viewport": viewport,
		className: cn("group/navigation-menu relative flex max-w-max flex-1 items-center justify-center", className),
		...props,
		children: [children, viewport && /* @__PURE__ */ jsx(NavigationMenuViewport, {})]
	});
}
function NavigationMenuList({ className, ...props }) {
	return /* @__PURE__ */ jsx(NavigationMenu.List, {
		"data-slot": "navigation-menu-list",
		className: cn("group flex flex-1 list-none items-center justify-center gap-0", className),
		...props
	});
}
function NavigationMenuItem({ className, ...props }) {
	return /* @__PURE__ */ jsx(NavigationMenu.Item, {
		"data-slot": "navigation-menu-item",
		className: cn("relative", className),
		...props
	});
}
var navigationMenuTriggerStyle = cva("group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-popup-open:bg-muted/50 data-popup-open:hover:bg-muted data-open:bg-muted/50 data-open:hover:bg-muted data-open:focus:bg-muted");
function NavigationMenuViewport({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn("absolute top-full left-0 isolate z-50 flex justify-center"),
		children: /* @__PURE__ */ jsx(NavigationMenu.Viewport, {
			"data-slot": "navigation-menu-viewport",
			className: cn("origin-top-center relative mt-1.5 h-(--radix-navigation-menu-viewport-height) w-full overflow-hidden rounded-lg bg-popover text-popover-foreground shadow ring-1 ring-foreground/10 duration-100 md:w-(--radix-navigation-menu-viewport-width) data-open:animate-in data-open:zoom-in-90 data-closed:animate-out data-closed:zoom-out-90", className),
			...props
		})
	});
}
function NavigationMenuLink({ className, ...props }) {
	return /* @__PURE__ */ jsx(NavigationMenu.Link, {
		"data-slot": "navigation-menu-link",
		className: cn("flex items-center gap-2 rounded-lg p-2 text-sm transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 in-data-[slot=navigation-menu-content]:rounded-md data-active:bg-muted/50 data-active:hover:bg-muted data-active:focus:bg-muted [&_svg:not([class*='size-'])]:size-4", className),
		...props
	});
}
//#endregion
//#region app/components/menu.tsx
function Menu({ user = "Můj Profil" }) {
	return /* @__PURE__ */ jsxs(NavigationMenu$1, {
		viewport: false,
		className: "w-full max-w-none flex items-center justify-between px-4 border-b h-16 bg-background",
		children: [/* @__PURE__ */ jsxs(NavigationMenuList, {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ jsx(NavigationMenuItem, { children: /* @__PURE__ */ jsx(NavigationMenuLink, {
				asChild: true,
				className: navigationMenuTriggerStyle(),
				children: /* @__PURE__ */ jsx(Link, {
					to: "/calendar",
					children: "Kalendář"
				})
			}) }), /* @__PURE__ */ jsx(NavigationMenuItem, { children: /* @__PURE__ */ jsx(NavigationMenuLink, {
				asChild: true,
				className: navigationMenuTriggerStyle(),
				children: /* @__PURE__ */ jsx(Link, {
					to: "/myappts",
					children: "Mé termíny"
				})
			}) })]
		}), /* @__PURE__ */ jsx(NavigationMenuList, {
			className: "flex items-center gap-2",
			children: /* @__PURE__ */ jsx(NavigationMenuItem, { children: /* @__PURE__ */ jsx(NavigationMenuLink, {
				asChild: true,
				className: navigationMenuTriggerStyle(),
				children: /* @__PURE__ */ jsx(Link, {
					to: "/profil",
					children: user
				})
			}) })
		})]
	});
}
//#endregion
//#region app/components/ui/calendar.tsx
function Calendar({ className, classNames, showOutsideDays = true, captionLayout = "label", buttonVariant = "ghost", locale, formatters, components, dataAppts = {}, maxAppts = 6, title, ...props }) {
	const defaultClassNames = getDefaultClassNames();
	return /* @__PURE__ */ jsx(DayPicker, {
		showOutsideDays,
		className: cn("group/calendar bg-background p-2 [--cell-radius:var(--radius-md)] [--cell-size:--spacing(30)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent", String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`, String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`, className),
		captionLayout,
		locale,
		formatters: {
			formatMonthDropdown: (date) => date.toLocaleString(locale?.code, { month: "short" }),
			...formatters
		},
		classNames: {
			root: cn("w-fit", defaultClassNames.root),
			months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
			month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
			nav: cn("size-(--cell-size) absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1 mt-[-5%]", defaultClassNames.nav),
			button_previous: cn(buttonVariants({ variant: buttonVariant }), "size-[calc(var(--cell-size)-40%)] w-[33%] p-0 select-none aria-disabled:opacity-50", defaultClassNames.button_previous),
			button_next: cn(buttonVariants({ variant: buttonVariant }), "size-[calc(var(--cell-size)-40%)] w-[33%] p-0 select-none aria-disabled:opacity-50", defaultClassNames.button_next),
			month_caption: cn("flex h-full w-full items-center justify-center px-(--cell-size)", defaultClassNames.month_caption),
			dropdowns: cn("flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium", defaultClassNames.dropdowns),
			dropdown_root: cn("relative rounded-(--cell-radius)", defaultClassNames.dropdown_root),
			dropdown: cn("absolute inset-0 bg-popover opacity-0", defaultClassNames.dropdown),
			caption_label: cn("font-medium select-none", captionLayout === "label" ? "text-3xl" : "flex items-center gap-1 rounded-(--cell-radius) text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground", defaultClassNames.caption_label),
			month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
			weekdays: cn("flex", defaultClassNames.weekdays),
			weekday: cn("flex-1 rounded-(--cell-radius) text-[1.2rem] font-normal text-muted-foreground select-none", defaultClassNames.weekday),
			week: cn("mt-2 flex w-full", defaultClassNames.week),
			week_number_header: cn("w-(--cell-size) select-none", defaultClassNames.week_number_header),
			week_number: cn("text-[0.8rem] text-muted-foreground select-none", defaultClassNames.week_number),
			day: cn("group/day relative aspect-square h-full w-full border border-border rounded-(--cell-radius) p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)", props.showWeekNumber ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)" : "[&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)", defaultClassNames.day),
			range_start: cn("relative isolate z-0 rounded-l-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-muted", defaultClassNames.range_start),
			range_middle: cn("rounded-none", defaultClassNames.range_middle),
			range_end: cn("relative isolate z-0 rounded-r-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:left-0 after:w-4 after:bg-muted", defaultClassNames.range_end),
			today: cn("rounded-(--cell-radius) bg-muted text-foreground data-[selected=true]:rounded-none", defaultClassNames.today),
			outside: cn("text-muted-foreground aria-selected:text-muted-foreground", defaultClassNames.outside),
			disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
			hidden: cn("invisible", defaultClassNames.hidden),
			...classNames
		},
		components: {
			Root: ({ className, rootRef, children, ...props }) => {
				return /* @__PURE__ */ jsxs("div", {
					"data-slot": "calendar",
					ref: rootRef,
					className: cn(className),
					...props,
					children: [title && /* @__PURE__ */ jsx("p", {
						className: "text-lg font-semibold text-muted-foreground text-center",
						children: title
					}), children]
				});
			},
			Chevron: ({ className, orientation, ...props }) => {
				if (orientation === "left") return /* @__PURE__ */ jsx(ChevronLeftIcon, {
					className: cn("size-10", className),
					...props
				});
				if (orientation === "right") return /* @__PURE__ */ jsx(ChevronRightIcon, {
					className: cn("size-10", className),
					...props
				});
				return /* @__PURE__ */ jsx(ChevronDownIcon, {
					className: cn("size-10", className),
					...props
				});
			},
			DayButton: ({ ...props }) => /* @__PURE__ */ jsx(CalendarDayButton, {
				locale,
				dataAppts,
				maxAppts,
				...props
			}),
			WeekNumber: ({ children, ...props }) => {
				return /* @__PURE__ */ jsx("td", {
					...props,
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex size-(--cell-size) items-center justify-center text-center text-lg",
						children: ["v ", parseInt(children) % 2 === 0 ? "místě B" : "místě A"]
					})
				});
			},
			...components
		},
		...props
	});
}
function CalendarDayButton({ className, day, modifiers, locale, dataAppts = {}, maxAppts = 6, ...props }) {
	const defaultClassNames = getDefaultClassNames();
	const ref = React.useRef(null);
	React.useEffect(() => {
		if (modifiers.focused) ref.current?.focus();
	}, [modifiers.focused]);
	const numAppts = (dataAppts[day.isoDate] || []).filter((status) => status === 1 || status === 2).length;
	return /* @__PURE__ */ jsxs(Button, {
		ref,
		variant: "ghost",
		size: "icon",
		"data-day": day.date.toLocaleDateString(locale?.code),
		"data-selected-single": modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle,
		"data-range-start": modifiers.range_start,
		"data-range-end": modifiers.range_end,
		"data-range-middle": modifiers.range_middle,
		className: cn("relative isolate z-10 flex justify-around text-lg aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border-0 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 data-[range-end=true]:rounded-(--cell-radius) data-[range-end=true]:rounded-r-(--cell-radius) data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-muted data-[range-middle=true]:text-foreground data-[range-start=true]:rounded-(--cell-radius) data-[range-start=true]:rounded-l-(--cell-radius) data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground dark:hover:text-foreground [&>span]:text-xs [&>span]:opacity-70", defaultClassNames.day, className),
		...props,
		children: [/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("span", { children: [
			day.date.getDate(),
			".",
			day.date.getMonth() + 1,
			"."
		] }) }), /* @__PURE__ */ jsxs("div", {
			className: "h-16 flex flex-col justify-around",
			children: [/* @__PURE__ */ jsx("span", { children: numAppts === maxAppts ? "PLNO" : /* @__PURE__ */ jsx("br", {}) }), /* @__PURE__ */ jsx("span", { children: numAppts + "/" + maxAppts })]
		})]
	});
}
//#endregion
//#region app/routes/calendar.tsx
var calendar_exports = /* @__PURE__ */ __exportAll({ default: () => calendar_default });
var appts = {
	"2026-07-01": [
		1,
		1,
		1,
		1,
		1,
		1
	],
	"2026-07-02": [
		1,
		1,
		1,
		1,
		1,
		1
	],
	"2026-07-03": [
		1,
		1,
		0,
		0,
		1,
		1
	],
	"2026-07-04": [
		1,
		0,
		0,
		0,
		1,
		1
	],
	"2026-07-05": [
		1,
		0,
		1,
		0,
		1,
		0
	],
	"2026-07-06": [
		1,
		1,
		1,
		1,
		1,
		1
	],
	"2026-07-07": [
		1,
		1,
		1,
		1,
		2,
		2
	],
	"2026-07-08": [
		1,
		1,
		0,
		0,
		1,
		1
	],
	"2026-07-09": [
		1,
		0,
		0,
		0,
		1,
		1
	],
	"2026-07-10": [
		1,
		0,
		1,
		0,
		1,
		0
	],
	"2026-07-11": [
		1,
		1,
		1,
		1,
		1,
		1
	],
	"2026-07-12": [
		1,
		1,
		1,
		1,
		1,
		1
	],
	"2026-07-13": [
		1,
		1,
		0,
		0,
		1,
		1
	],
	"2026-07-14": [
		1,
		0,
		0,
		0,
		1,
		1
	],
	"2026-07-15": [
		1,
		0,
		1,
		0,
		1,
		0
	],
	"2026-07-16": [
		2,
		2,
		1,
		1,
		1,
		1
	],
	"2026-07-17": [
		1,
		1,
		1,
		1,
		2,
		2
	],
	"2026-07-18": [
		1,
		1,
		0,
		2,
		2,
		2
	],
	"2026-07-19": [
		1,
		0,
		0,
		0,
		1,
		1
	],
	"2026-07-20": [
		1,
		0,
		1,
		0,
		1,
		0
	],
	"2026-07-21": [
		1,
		1,
		1,
		1,
		1,
		1
	],
	"2026-07-22": [
		1,
		1,
		1,
		1,
		1,
		1
	],
	"2026-07-23": [
		1,
		1,
		0,
		0,
		1,
		1
	],
	"2026-07-24": [
		1,
		0,
		0,
		0,
		1,
		1
	],
	"2026-07-25": [
		1,
		0,
		1,
		0,
		1,
		0
	],
	"2026-07-26": [
		2,
		2,
		1,
		1,
		1,
		1
	],
	"2026-07-27": [
		1,
		1,
		1,
		1,
		2,
		2
	],
	"2026-07-28": [
		1,
		1,
		0,
		2,
		2,
		2
	],
	"2026-07-29": [
		1,
		0,
		0,
		0,
		1,
		1
	],
	"2026-07-30": [
		1,
		0,
		1,
		0,
		1,
		0
	]
};
var POSSIBLE_TIMES = [
	"10:00 - 10:30",
	"10:30 - 11:00",
	"11:00 - 11:30",
	"11:30 - 12:00",
	"12:00 - 12:30",
	"12:30 - 13:00"
];
var calendar_default = UNSAFE_withComponentProps(function CalendarPage() {
	const [user, setUser] = useState("Můj Profil");
	const [date, setDate] = useState(void 0);
	const timeRef = useRef(null);
	useEffect(() => {
		const savedEmail = localStorage.getItem("userEmail");
		if (savedEmail) setUser(savedEmail);
	}, []);
	useEffect(() => {
		if (date && timeRef.current) setTimeout(() => {
			timeRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "nearest"
			});
		}, 50);
	}, [date]);
	const times = appts[date ? format(date, "yyyy-MM-dd") : ""] || [
		0,
		0,
		0,
		0,
		0,
		0
	];
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Menu, { user }), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col w-full items-center justify-center text-lg mt-[4vh] mb-[4vh] gap-10",
		children: [
			/* @__PURE__ */ jsxs("h2", {
				className: "text-xl font-bold tracking-tight text-foreground sm:text-2xl",
				children: [user, " - Rezervace termínu"]
			}),
			/* @__PURE__ */ jsx(Calendar, {
				mode: "single",
				onSelect: setDate,
				showWeekNumber: true,
				className: "rounded-lg border",
				locale: cs,
				weekStartsOn: 1,
				dataAppts: appts,
				maxAppts: 6,
				title: "Vyberte den"
			}),
			date && /* @__PURE__ */ jsxs("div", {
				ref: timeRef,
				className: "space-y-2 scroll-mt-24 pb-12 animate-in fade-in duration-200",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "text-lg font-semibold text-muted-foreground text-center",
					children: ["Vyberte dostupný čas pro: ", format(date, "d. M. yyyy")]
				}), /* @__PURE__ */ jsx("div", {
					className: "flex flex-row justify-evenly items-center gap-1 w-full bg-card border p-2 rounded-xl shadow-sm",
					children: POSSIBLE_TIMES.map((time, index) => {
						return /* @__PURE__ */ jsx(Button, {
							variant: times[index] === 0 ? "default" : "outline",
							className: "h-20 font-medium flex-1 font-extrabold",
							disabled: !(times[index] === 0),
							onClick: () => alert(`Vybrali jste čas ${time} dne ${format(date, "d. M.")}`),
							children: /* @__PURE__ */ jsxs("div", {
								className: "h-16 flex flex-col justify-around",
								children: [/* @__PURE__ */ jsx("span", {
									className: "font-bold",
									children: time
								}), {
									0: /* @__PURE__ */ jsx("span", {
										className: "text-green-600",
										children: "VOLNO"
									}),
									1: /* @__PURE__ */ jsx("span", {
										className: "text-red-500",
										children: "OBSAZENO"
									})
								}[times[index]] || /* @__PURE__ */ jsx("span", {
									className: "text-red-500",
									children: "ZRUŠENO"
								})]
							})
						}, index);
					})
				})]
			})
		]
	})] });
});
//#endregion
//#region app/routes/myappts.tsx
var myappts_exports = /* @__PURE__ */ __exportAll({ default: () => myappts_default });
var myappts_default = UNSAFE_withComponentProps(function Main() {
	return /* @__PURE__ */ jsx(Menu, {});
});
//#endregion
//#region \0virtual:react-router/server-manifest
var server_manifest_default = {
	"entry": {
		"module": "/pages/assets/entry.client-DLsPDx6k.js",
		"imports": ["/pages/assets/jsx-runtime-DBl4P4LO.js", "/pages/assets/react-dom-Cp_rA9bF.js"],
		"css": []
	},
	"routes": {
		"root": {
			"id": "root",
			"parentId": void 0,
			"path": "",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": true,
			"module": "/pages/assets/root-MqM-MSHm.js",
			"imports": ["/pages/assets/jsx-runtime-DBl4P4LO.js", "/pages/assets/react-dom-Cp_rA9bF.js"],
			"css": ["/pages/assets/root-BvQthz5H.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/login": {
			"id": "routes/login",
			"parentId": "root",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": true,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/pages/assets/login-Bw18tEAR.js",
			"imports": [
				"/pages/assets/jsx-runtime-DBl4P4LO.js",
				"/pages/assets/utils-DYuRag0l.js",
				"/pages/assets/button-C_TAGg6i.js",
				"/pages/assets/react-dom-Cp_rA9bF.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/calendar": {
			"id": "routes/calendar",
			"parentId": "root",
			"path": "calendar",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/pages/assets/calendar-BvqhtkK1.js",
			"imports": [
				"/pages/assets/jsx-runtime-DBl4P4LO.js",
				"/pages/assets/utils-DYuRag0l.js",
				"/pages/assets/menu-D7QNR34q.js",
				"/pages/assets/button-C_TAGg6i.js",
				"/pages/assets/react-dom-Cp_rA9bF.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/myappts": {
			"id": "routes/myappts",
			"parentId": "root",
			"path": "myappts",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/pages/assets/myappts-4W2IYeAN.js",
			"imports": [
				"/pages/assets/jsx-runtime-DBl4P4LO.js",
				"/pages/assets/menu-D7QNR34q.js",
				"/pages/assets/react-dom-Cp_rA9bF.js",
				"/pages/assets/utils-DYuRag0l.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		}
	},
	"url": "/pages/assets/manifest-e6210146.js",
	"version": "e6210146",
	"sri": void 0
};
//#endregion
//#region \0virtual:react-router/server-build
var assetsBuildDirectory = "build\\client";
var basename = "/";
var future = {
	"unstable_optimizeDeps": false,
	"v8_passThroughRequests": false,
	"unstable_trailingSlashAwareDataRequests": false,
	"unstable_previewServerPrerendering": false,
	"v8_middleware": false,
	"v8_splitRouteModules": false,
	"v8_viteEnvironmentApi": false
};
var ssr = true;
var isSpaMode = false;
var prerender = [];
var routeDiscovery = {
	"mode": "lazy",
	"manifestPath": "/__manifest"
};
var publicPath = "/pages/";
var entry = { module: entry_server_node_exports };
var routes = {
	"root": {
		id: "root",
		parentId: void 0,
		path: "",
		index: void 0,
		caseSensitive: void 0,
		module: root_exports
	},
	"routes/login": {
		id: "routes/login",
		parentId: "root",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: login_exports
	},
	"routes/calendar": {
		id: "routes/calendar",
		parentId: "root",
		path: "calendar",
		index: void 0,
		caseSensitive: void 0,
		module: calendar_exports
	},
	"routes/myappts": {
		id: "routes/myappts",
		parentId: "root",
		path: "myappts",
		index: void 0,
		caseSensitive: void 0,
		module: myappts_exports
	}
};
var allowedActionOrigins = false;
//#endregion
export { allowedActionOrigins, server_manifest_default as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };
