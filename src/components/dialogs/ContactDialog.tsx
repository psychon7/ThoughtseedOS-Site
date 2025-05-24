import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { X } from "lucide-react";

interface ContactDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactDialog({ isOpen, onOpenChange }: ContactDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the form data to a server
    console.log("Form submitted:", { name, email, message });
    setSubmitted(true);
    
    // Reset form after 2 seconds and close the dialog
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setSubmitted(false);
      onOpenChange(false);
    }, 2000);
  };

  // This effect ensures the dialog is brought to the front when opened
  useEffect(() => {
    if (isOpen) {
      // Force dialog to the foreground with highest z-index
      const dialogElement = document.querySelector('.contact-dialog-content');
      if (dialogElement) {
        dialogElement.parentElement?.style.setProperty('z-index', '9999');
      }
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="contact-dialog-content fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-system7-window-bg border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] max-w-md z-[5000]">
        <DialogHeader className="flex justify-between items-center p-2 border-b border-gray-300">
          <DialogTitle className="font-chicago text-center w-full">Contact ThoughtSeed</DialogTitle>
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="absolute right-2 top-2">
            <X className="h-4 w-4" />
          </Button>
          <DialogDescription className="sr-only">Contact form for ThoughtSeed</DialogDescription>
        </DialogHeader>
        
        <div className="p-4">
          {submitted ? (
            <div className="text-center py-8">
              <p className="font-chicago text-lg mb-4">Thank you!</p>
              <p className="font-geneva-12">Your message has been sent. We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="name" className="block font-chicago text-sm mb-1">Name:</Label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-400 bg-white p-2 text-sm font-geneva-12"
                  required
                />
              </div>
              
              <div className="mb-4">
                <Label htmlFor="email" className="block font-chicago text-sm mb-1">Email:</Label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-400 bg-white p-2 text-sm font-geneva-12"
                  required
                />
              </div>
              
              <div className="mb-4">
                <Label htmlFor="message" className="block font-chicago text-sm mb-1">Message:</Label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-gray-400 bg-white p-2 text-sm font-geneva-12 min-h-[100px]"
                  required
                />
              </div>
              
              <div className="flex justify-center">
                <Button 
                  type="submit"
                  className="bg-[#3B3B3B] text-white font-chicago hover:bg-black text-sm px-4"
                >
                  Submit
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
