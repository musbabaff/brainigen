import { Button } from "@/components/ui/button";
import { FileQuestion, Home, Search } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full text-center space-y-6 relative z-10">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-20" />
          <div className="relative w-full h-full bg-secondary border border-border rounded-full flex items-center justify-center shadow-xl">
            <FileQuestion className="h-12 w-12 text-primary" />
          </div>
          {/* Badge 404 */}
          <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg border-2 border-background">
            404
          </div>
        </div>
        
        <h1 className="text-4xl font-extrabold tracking-tight">Page not found</h1>
        
        <p className="text-lg text-muted-foreground">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6">
          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full gap-2 h-11 px-8">
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/blog" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full gap-2 h-11 px-8">
              <Search className="h-4 w-4" />
              Search Blog
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
