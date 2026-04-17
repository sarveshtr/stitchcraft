import { u as useNavigate, i as useAuth, r as reactExports, j as jsxRuntimeExports, m as motion, U as Users } from "./index-8S2Cru2x.js";
import { I as Input } from "./input-D6xFgmLn.js";
import { S as Skeleton } from "./skeleton-CVoRLpDg.js";
import { u as useQuery } from "./useQuery-C35CS9u-.js";
import { S as Search } from "./search-R7E3-zDi.js";
const MOCK_CUSTOMERS = [
  {
    id: "u1",
    principal: "abc12-defgh-ijklm-nopqr-stuv5",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43210",
    role: "customer",
    createdAt: "2026-01-15T08:00:00Z"
  },
  {
    id: "u2",
    principal: "xyz99-aaaab-ccccd-eeeef-ghhi7",
    name: "Meera Patel",
    email: "meera.patel@example.com",
    phone: "+91 87654 32109",
    role: "customer",
    createdAt: "2026-02-03T10:30:00Z"
  },
  {
    id: "u3",
    principal: "lmn34-opqrs-tuvwx-yzabc-defg2",
    name: "Anita Verma",
    email: "anita.verma@example.com",
    phone: "+91 76543 21098",
    role: "customer",
    createdAt: "2026-02-18T14:00:00Z"
  },
  {
    id: "u4",
    principal: "pqr56-stuvw-xyzab-cdefg-hijk8",
    name: "Sunita Rao",
    email: "sunita.rao@example.com",
    phone: "+91 65432 10987",
    role: "customer",
    createdAt: "2026-03-05T09:15:00Z"
  },
  {
    id: "u5",
    principal: "stu78-vwxyz-abcde-fghij-klmn3",
    name: "Kavitha Nair",
    email: "kavitha.nair@example.com",
    phone: "+91 54321 09876",
    role: "customer",
    createdAt: "2026-03-22T11:45:00Z"
  },
  {
    id: "u6",
    principal: "vwx90-yzabc-defgh-ijklm-nopq1",
    name: "Deepa Krishnan",
    email: "deepa.krishnan@example.com",
    phone: "+91 43210 98765",
    role: "customer",
    createdAt: "2026-04-01T16:20:00Z"
  }
];
const ORDER_COUNTS = {
  u1: 5,
  u2: 3,
  u3: 7,
  u4: 2,
  u5: 4,
  u6: 1
};
function useCustomers() {
  return useQuery({
    queryKey: ["admin-customers"],
    queryFn: async () => MOCK_CUSTOMERS
  });
}
function AdminCustomers() {
  const navigate = useNavigate();
  const { isAdmin, isLoading } = useAuth();
  const { data: customers, isLoading: customersLoading } = useCustomers();
  const [search, setSearch] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (!isLoading && !isAdmin) navigate({ to: "/account" });
  }, [isAdmin, isLoading, navigate]);
  const filtered = reactExports.useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return customers ?? [];
    return (customers ?? []).filter(
      (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q)
    );
  }, [customers, search]);
  if (isLoading || !isAdmin) return null;
  function truncatePrincipal(p) {
    if (p.length <= 20) return p;
    return `${p.slice(0, 10)}…${p.slice(-6)}`;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "admin.customers.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35 },
        className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Customer Management" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
            (customers ?? []).length,
            " registered customers"
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.1, duration: 0.35 },
        className: "relative max-w-sm",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: search,
              onChange: (e) => setSearch(e.target.value),
              placeholder: "Search by name, email or phone…",
              "data-ocid": "admin.customers.search.search_input",
              className: "pl-9"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.15, duration: 0.4 },
        className: "bg-card rounded-2xl border border-border shadow-sm overflow-hidden",
        "data-ocid": "admin.customers.table",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: customersLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-3", children: Array.from({ length: 6 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg" }, i)
        )) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-20 text-center",
            "data-ocid": "admin.customers.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-6 h-6 text-muted-foreground/50" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "No customers found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: search ? `No results for "${search}"` : "No customers yet" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-medium text-muted-foreground", children: "Principal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-medium text-muted-foreground", children: "Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-medium text-muted-foreground", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-medium text-muted-foreground", children: "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-5 py-3 font-medium text-muted-foreground", children: "Orders" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-5 py-3 font-medium text-muted-foreground whitespace-nowrap", children: "Joined" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((customer, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              "data-ocid": `admin.customers.item.${i + 1}`,
              className: "border-b border-border/50 hover:bg-muted/20 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-mono text-xs bg-muted px-2 py-1 rounded text-muted-foreground",
                    title: customer.principal,
                    children: truncatePrincipal(customer.principal)
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5 font-medium text-foreground", children: customer.name || "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5 text-muted-foreground", children: customer.email || "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5 text-muted-foreground", children: customer.phone || "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: ORDER_COUNTS[customer.id] ?? 0 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5 text-muted-foreground whitespace-nowrap", children: new Date(customer.createdAt).toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  }
                ) })
              ]
            },
            customer.id
          )) })
        ] }) })
      }
    )
  ] });
}
export {
  AdminCustomers as default
};
