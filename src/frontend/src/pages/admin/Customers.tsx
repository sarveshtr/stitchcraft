import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Search, Users } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import type { User } from "../../types";

const MOCK_CUSTOMERS: User[] = [
  {
    id: "u1",
    principal: "abc12-defgh-ijklm-nopqr-stuv5",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43210",
    role: "customer",
    createdAt: "2026-01-15T08:00:00Z",
  },
  {
    id: "u2",
    principal: "xyz99-aaaab-ccccd-eeeef-ghhi7",
    name: "Meera Patel",
    email: "meera.patel@example.com",
    phone: "+91 87654 32109",
    role: "customer",
    createdAt: "2026-02-03T10:30:00Z",
  },
  {
    id: "u3",
    principal: "lmn34-opqrs-tuvwx-yzabc-defg2",
    name: "Anita Verma",
    email: "anita.verma@example.com",
    phone: "+91 76543 21098",
    role: "customer",
    createdAt: "2026-02-18T14:00:00Z",
  },
  {
    id: "u4",
    principal: "pqr56-stuvw-xyzab-cdefg-hijk8",
    name: "Sunita Rao",
    email: "sunita.rao@example.com",
    phone: "+91 65432 10987",
    role: "customer",
    createdAt: "2026-03-05T09:15:00Z",
  },
  {
    id: "u5",
    principal: "stu78-vwxyz-abcde-fghij-klmn3",
    name: "Kavitha Nair",
    email: "kavitha.nair@example.com",
    phone: "+91 54321 09876",
    role: "customer",
    createdAt: "2026-03-22T11:45:00Z",
  },
  {
    id: "u6",
    principal: "vwx90-yzabc-defgh-ijklm-nopq1",
    name: "Deepa Krishnan",
    email: "deepa.krishnan@example.com",
    phone: "+91 43210 98765",
    role: "customer",
    createdAt: "2026-04-01T16:20:00Z",
  },
];

const ORDER_COUNTS: Record<string, number> = {
  u1: 5,
  u2: 3,
  u3: 7,
  u4: 2,
  u5: 4,
  u6: 1,
};

function useCustomers() {
  return useQuery<User[]>({
    queryKey: ["admin-customers"],
    queryFn: async () => MOCK_CUSTOMERS,
  });
}

export default function AdminCustomers() {
  const navigate = useNavigate();
  const { isAdmin, isLoading } = useAuth();
  const { data: customers, isLoading: customersLoading } = useCustomers();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isLoading && !isAdmin) navigate({ to: "/account" });
  }, [isAdmin, isLoading, navigate]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return customers ?? [];
    return (customers ?? []).filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q),
    );
  }, [customers, search]);

  if (isLoading || !isAdmin) return null;

  function truncatePrincipal(p: string) {
    if (p.length <= 20) return p;
    return `${p.slice(0, 10)}…${p.slice(-6)}`;
  }

  return (
    <div className="space-y-6" data-ocid="admin.customers.page">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Customer Management
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {(customers ?? []).length} registered customers
          </p>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.35 }}
        className="relative max-w-sm"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email or phone…"
          data-ocid="admin.customers.search.search_input"
          className="pl-9"
        />
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden"
        data-ocid="admin.customers.table"
      >
        <div className="overflow-x-auto">
          {customersLoading ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                <Skeleton key={i} className="h-12 w-full rounded-lg" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-20 text-center"
              data-ocid="admin.customers.empty_state"
            >
              <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-muted-foreground/50" />
              </div>
              <p className="font-medium text-foreground">No customers found</p>
              <p className="text-sm text-muted-foreground mt-1">
                {search ? `No results for "${search}"` : "No customers yet"}
              </p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">
                    Principal
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">
                    Name
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">
                    Email
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">
                    Phone
                  </th>
                  <th className="text-right px-5 py-3 font-medium text-muted-foreground">
                    Orders
                  </th>
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground whitespace-nowrap">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((customer, i) => (
                  <tr
                    key={customer.id}
                    data-ocid={`admin.customers.item.${i + 1}`}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <span
                        className="font-mono text-xs bg-muted px-2 py-1 rounded text-muted-foreground"
                        title={customer.principal}
                      >
                        {truncatePrincipal(customer.principal)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-foreground">
                      {customer.name || "—"}
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      {customer.email || "—"}
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      {customer.phone || "—"}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="font-semibold text-foreground">
                        {ORDER_COUNTS[customer.id] ?? 0}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">
                      {new Date(customer.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
    </div>
  );
}
