import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  description: string;
  invoiceUrl: string;
}

const invoices: Invoice[] = [
  {
    id: "INV-2024-001",
    date: "2024-01-01",
    amount: 9.99,
    status: "paid",
    description: "Pro Plan - Monthly",
    invoiceUrl: "#",
  },
  {
    id: "INV-2023-012",
    date: "2023-12-01",
    amount: 9.99,
    status: "paid",
    description: "Pro Plan - Monthly",
    invoiceUrl: "#",
  },
  {
    id: "INV-2023-011",
    date: "2023-11-01",
    amount: 9.99,
    status: "paid",
    description: "Pro Plan - Monthly",
    invoiceUrl: "#",
  },
  {
    id: "INV-2023-010",
    date: "2023-10-01",
    amount: 9.99,
    status: "failed",
    description: "Pro Plan - Monthly",
    invoiceUrl: "#",
  },
];

export const BillingHistory = () => {
  const { toast } = useToast();

  const handleDownload = (invoiceId: string) => {
    toast({ title: "Downloading invoice", description: `Invoice ${invoiceId} is being downloaded` });
  };

  const getStatusBadge = (status: Invoice["status"]) => {
    const variants = {
      paid: "default",
      pending: "secondary",
      failed: "destructive",
    } as const;
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Billing History</h2>
        <p className="text-sm text-muted-foreground">View and download your invoices</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>All your payment history and invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {invoice.id}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                  <TableCell>{invoice.description}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell className="text-right font-semibold">${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDownload(invoice.id)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Paid:</span>
            <span className="font-semibold text-foreground">
              ${invoices.filter(i => i.status === "paid").reduce((sum, i) => sum + i.amount, 0).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Invoices:</span>
            <span className="font-semibold text-foreground">{invoices.length}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
