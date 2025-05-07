import { Bell, ChevronDown, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  return (
    <header className="w-full border-b border-gray-200">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">Nomad</span>
              <span className="text-2xl font-bold text-primary">Health</span>
            </a>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-nomad-darkGray hover:text-nomad-black text-sm font-medium">Clin Details</a>
              <a href="#" className="text-nomad-darkGray hover:text-nomad-black text-sm font-medium">PN Queue</a>
              <a href="#" className="text-nomad-darkGray hover:text-nomad-black text-sm font-medium">Placement Prioritization Dashboard</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="rounded-full p-2 text-nomad-darkGray hover:bg-gray-100">
              <Search className="h-5 w-5" />
            </button>
            <button className="rounded-full p-2 text-nomad-darkGray hover:bg-gray-100">
              <Bell className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-white">RH</AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 text-nomad-darkGray" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
