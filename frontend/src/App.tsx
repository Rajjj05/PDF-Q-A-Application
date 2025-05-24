import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () =>
<QueryClientProvider client={queryClient} data-id="xone2rx1j" data-path="src/App.tsx">
    <TooltipProvider data-id="ja368a6ja" data-path="src/App.tsx">
      <Toaster data-id="ailzuzzpq" data-path="src/App.tsx" />
      <BrowserRouter data-id="bry5lzl7x" data-path="src/App.tsx">
        <Routes data-id="dsvg6v0oc" data-path="src/App.tsx">
          <Route path="/" element={<HomePage data-id="jhqfatmum" data-path="src/App.tsx" />} data-id="vm0t8rh6g" data-path="src/App.tsx" />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound data-id="zvgy3ny1l" data-path="src/App.tsx" />} data-id="wrx5pfmlu" data-path="src/App.tsx" />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>;


export default App;