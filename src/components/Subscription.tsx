import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Crown, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: "month" | "year";
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    interval: "month",
    icon: <Star className="h-6 w-6" />,
    features: ["Basic scanning", "5 products per month", "Community support"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 9.99,
    interval: "month",
    icon: <Zap className="h-6 w-6" />,
    popular: true,
    features: ["Unlimited scanning", "AI recommendations", "Priority support", "Advanced analytics"],
  },
  {
    id: "premium",
    name: "Premium",
    price: 19.99,
    interval: "month",
    icon: <Crown className="h-6 w-6" />,
    features: ["Everything in Pro", "Personal skincare coach", "Custom routines", "Early access to features"],
  },
];

export const Subscription = () => {
  const { toast } = useToast();
  const [currentPlan, setCurrentPlan] = useState("pro");

  const handleSubscribe = (planId: string) => {
    setCurrentPlan(planId);
    toast({ title: `Subscribed to ${plans.find(p => p.id === planId)?.name} plan` });
  };

  const handleCancelSubscription = () => {
    toast({ title: "Subscription cancelled", description: "Your subscription will end at the end of the billing period" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Subscription</h2>
        <p className="text-sm text-muted-foreground">Manage your subscription plan</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>You are currently on the {plans.find(p => p.id === currentPlan)?.name} plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-foreground">
                ${plans.find(p => p.id === currentPlan)?.price}
                <span className="text-sm text-muted-foreground font-normal">/month</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Next billing date: January 15, 2024</p>
            </div>
            <Button variant="outline" onClick={handleCancelSubscription}>
              Cancel Subscription
            </Button>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Available Plans</h3>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.id} className={plan.popular ? "border-primary shadow-lg" : ""}>
              <CardHeader>
                {plan.popular && (
                  <Badge className="w-fit mb-2">Most Popular</Badge>
                )}
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {plan.icon}
                  </div>
                  <div>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>
                      <span className="text-2xl font-bold text-foreground">${plan.price}</span>
                      <span className="text-muted-foreground">/{plan.interval}</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={currentPlan === plan.id ? "outline" : "default"}
                  disabled={currentPlan === plan.id}
                  onClick={() => handleSubscribe(plan.id)}
                >
                  {currentPlan === plan.id ? "Current Plan" : "Subscribe"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
