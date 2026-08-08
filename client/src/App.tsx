// Smilish Group — App Router
// All public routes registered here
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";

// Fashion
import Fashion from "./pages/Fashion";
import FashionProducts from "./pages/FashionProducts";
import FashionProduct from "./pages/FashionProduct";
import FashionCustom from "./pages/FashionCustom";

// AI Automation
import Automation from "./pages/Automation";
import AutomationAudit from "./pages/AutomationAudit";
import AutomationService from "./pages/AutomationService";

// Real Estate
import RealEstate from "./pages/RealEstate";
import RealEstateProperties from "./pages/RealEstateProperties";
import RealEstateProperty from "./pages/RealEstateProperty";
import RealEstateInspection from "./pages/RealEstateInspection";

function Router() {
  return (
    <Switch>
      {/* Main */}
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/projects" component={Projects} />

      {/* Fashion */}
      <Route path="/fashion" component={Fashion} />
      <Route path="/fashion/products" component={FashionProducts} />
      <Route path="/fashion/product/:slug" component={FashionProduct} />
      <Route path="/fashion/custom" component={FashionCustom} />

      {/* AI Automation */}
      <Route path="/automation" component={Automation} />
      <Route path="/automation/services" component={Automation} />
      <Route path="/automation/service/:slug" component={AutomationService} />
      <Route path="/automation/audit" component={AutomationAudit} />

      {/* Real Estate */}
      <Route path="/real-estate" component={RealEstate} />
      <Route path="/real-estate/properties" component={RealEstateProperties} />
      <Route path="/real-estate/property/:slug" component={RealEstateProperty} />
      <Route path="/real-estate/inspection" component={RealEstateInspection} />

      {/* 404 */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

