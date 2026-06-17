import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ThankYou from "./pages/ThankYou";
import AdminLeads from "@/pages/AdminLeads";
import CalculatorPage from "@/pages/CalculatorPage";
import ExitIntentPopup from "./components/ExitIntentPopup";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/cam-on"} component={ThankYou} />
      <Route path={"/admin/leads"} component={AdminLeads} />
      <Route path={"/calculator"} component={CalculatorPage} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <ExitIntentPopup />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
