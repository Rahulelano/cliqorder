import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import ProductListing from "./pages/ProductListing.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import StaticPage from "./pages/StaticPage.tsx";
import Admin from "./pages/Admin.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/about-us" element={<StaticPage />} />
          <Route path="/careers" element={<StaticPage />} />
          <Route path="/press" element={<StaticPage />} />
          <Route path="/sustainability" element={<StaticPage />} />
          <Route path="/track-order" element={<StaticPage />} />
          <Route path="/returns" element={<StaticPage />} />
          <Route path="/faqs" element={<StaticPage />} />
          <Route path="/contact-us" element={<StaticPage />} />
          <Route path="/privacy-policy" element={<StaticPage />} />
          <Route path="/terms-of-use" element={<StaticPage />} />
          <Route path="/cookie-policy" element={<StaticPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
