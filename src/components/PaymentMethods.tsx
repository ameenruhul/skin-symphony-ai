import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

export const PaymentMethods = () => {
  const { toast } = useToast();
  const [showAddCard, setShowAddCard] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: "1", brand: "Visa", last4: "4242", expiryMonth: 12, expiryYear: 2025, isDefault: true },
    { id: "2", brand: "Mastercard", last4: "5555", expiryMonth: 8, expiryYear: 2024, isDefault: false },
  ]);

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Payment method added successfully" });
    setShowAddCard(false);
  };

  const handleDelete = (id: string) => {
    setPaymentMethods(paymentMethods.filter(pm => pm.id !== id));
    toast({ title: "Payment method removed" });
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(paymentMethods.map(pm => ({ ...pm, isDefault: pm.id === id })));
    toast({ title: "Default payment method updated" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Payment Methods</h2>
          <p className="text-sm text-muted-foreground">Manage your saved payment methods</p>
        </div>
        <Button onClick={() => setShowAddCard(!showAddCard)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Card
        </Button>
      </div>

      {showAddCard && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Card</CardTitle>
            <CardDescription>Enter your card details below</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddCard} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit">Add Card</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddCard(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <Card key={method.id}>
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {method.brand} •••• {method.last4}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Expires {method.expiryMonth}/{method.expiryYear}
                  </div>
                  {method.isDefault && (
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full mt-1 inline-block">
                      Default
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {!method.isDefault && (
                  <Button variant="outline" size="sm" onClick={() => handleSetDefault(method.id)}>
                    Set Default
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(method.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
