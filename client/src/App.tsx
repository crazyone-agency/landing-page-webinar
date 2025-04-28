import {Switch, Route, useLocation} from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import FloatingCta from "@/components/FloatingCta";
import LandingPage from "@/pages/LandingPage";
import CoursePage from "@/pages/CoursePage";
import OtoPage from "@/pages/OtoPage";
import CheckoutPage from "@/pages/CheckoutPage";
import SubscribePage from "@/pages/SubscribePage";
import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();

  return (
    <>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/corso-sviluppo-personale" component={CoursePage} />
        <Route path="/offerta-speciale" component={OtoPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/subscribe" component={SubscribePage} />
        <Route component={NotFound} />
      </Switch>
      {location == '/' && <FloatingCta />}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
